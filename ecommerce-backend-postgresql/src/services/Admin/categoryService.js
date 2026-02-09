const db = require('../../db/models');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');
const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError.js');
const { Op, where, fn, col } = require('sequelize');
const { level } = require('winston');

// const validations = async (data) => {
// 	if (data.parentId) {
// 		const exist = await db.category
// 			.scope(['onlyId', 'activeEntity'])
// 			.findOne({
// 				where: { id: data.parentId },
// 			});
// 		if (!exist)
// 			throw new ApiError(
// 				httpStatus.NOT_FOUND,
// 				`Parent category does not exists`
// 			);
// 	}
// };

const categoryService = createBaseService(db.category, {
	name: 'Category',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({
		level: data.level,
		icon: data.icon,
		status: data.status,
		parent_id: data.parentId,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.icon) toUpdate.icon = data.icon;
		if (data.status !== undefined) toUpdate.status = data.status;
		if (data.parentId) toUpdate.parent_id = data.parentId;
		return toUpdate;
	},
	// validations,
	// isPagination: false,
	includes: [
		{
			model: db.media,
			as: 'cat_icon',
			// field: 'icon',
			required: false,
			attributes: ['url', 'title'],
		},
		{
			model: db.category,
			as: 'parent',
			attributes: ['id'],
			required: false,
			include: [
				{
					model: db.category_translation,
					attribute: ['title'],
					as: 'translations',
					required: false,
				},
			],
		},
	],
	translationModel: db.category_translation,
	translationForeignKey: 'category_id',
});

// Using userId logic from request
async function createCategory(req) {
	const userId = commonUtils.getUserId(req);
	const { parentId } = req.body;

	if (parentId) {
		const exist = await db.category
			.scope(['activeEntity'])
			.findByPk(parentId, { attributes: ['id', 'level'] });
		if (!exist)
			throw new ApiError(
				httpStatus.NOT_FOUND,
				`Parent category does not exists`
			);
		req.body.level = exist.level + 1;
	}
	return categoryService.create(req.body, userId);
}

async function updateCategory(req) {
	const userId = commonUtils.getUserId(req);
	const { categoryId } = req.params;
	const { parentId: newParentId } = req.body;
	const category = await db.category.findByPk(categoryId);
	if (!category)
		throw new ApiError(httpStatus.NOT_FOUND, `Category does not exists`);
	let newLevel = category.level;
	const transaction = await db.sequelize.transaction();
	if (newParentId !== undefined && newParentId !== category.parent_id) {
		// 1️⃣ Parent cannot be self
		if (newParentId === categoryId) {
			throw new ApiError(
				httpStatus.BAD_REQUEST,
				'Category cannot be its own parent'
			);
		}

		// 2️⃣ Validate new parent
		let parentCategory = null;
		if (newParentId) {
			const exist = await db.category
				.scope(['activeEntity'])
				.findByPk(newParentId);
			if (!exist)
				throw new ApiError(
					httpStatus.NOT_FOUND,
					`Parent category does not exists`
				);

			// 3️⃣ Prevent circular hierarchy
			const isDescendant = await isCategoryDescendant(
				categoryId,
				newParentId,
				transaction
			);

			if (isDescendant) {
				throw new ApiError(
					httpStatus.BAD_REQUEST,
					'Cannot move category under its own descendant'
				);
			}

			parentCategory = exist;
			newLevel = (parentCategory?.level || 0) + 1;
		} else {
			// Moved to root
			newLevel = 1;
		}
	}
	req.body.parentId = newParentId;
	req.body.level = newLevel;

	if (newLevel !== category.level) {
		const levelDiff = newLevel - category.level;
		await updateChildrenLevels(categoryId, levelDiff, transaction);
	}

	return categoryService.update(
		req.params.categoryId,
		req.body,
		userId,
		transaction
	);
}

async function softDeleteCategoryById(req) {
	const userId = commonUtils.getUserId(req);
	return categoryService.softDelete(req.params.categoryId, userId);
}

async function getCategoriesForOptions(req) {
	const { excludeId } = req.params;
	return await db.category.scope(['onlyId', 'activeEntity']).findAll({
		attributes: ['id', 'level'],
		where: excludeId ? { [Op.ne]: { id: excludeId } } : {},
		include: [
			{
				model: db.category_translation,
				required: false,
				as: 'translations',
				attributes: ['title'],
			},
		],
		order: [
			[
				{ model: db.category_translation, as: 'translations' },
				'title',
				'ASC',
			],
			['id', 'ASC'],
		],
	});
}

async function createCategoryTree({ categoryData, parentId = null, userId }) {
	const category = await db.category.create({
		parent_id: parentId,
		level: categoryData.level,
		user_id: userId,
		status: true,
	});

	// let category = {
	// 	id: 1,
	// };

	// console.log(
	// 	{
	// 		parent_id: parentId,
	// 		level: categoryData.level,
	// 		user_id: userId,
	// 		status: true,
	// 	},
	// 	'chkking category data'
	// );

	await db.category_translation.create({
		title: categoryData.title,
		slug: categoryData.slug,
		language_id: 1,
		category_id: category.id,
	});

	// console.log(
	// 	{
	// 		title: categoryData.title,
	// 		slug: categoryData.slug,
	// 		language_id: 1,
	// 		category_id: category.id,
	// 	},
	// 	'chkking category_translation data'
	// );

	if (categoryData.children?.length) {
		for (const child of categoryData.children) {
			await createCategoryTree({
				categoryData: child,
				parentId: category.id,
				userId,
			});
		}
	}
}

// complete category tree import
async function importCategoriesTree(req) {
	const userId = commonUtils.getUserId(req);

	for (const category of nestedCategoriesData) {
		await createCategoryTree({
			categoryData: category,
			userId,
		});
	}
}

// to create categouries with only titles from json
async function importCategoriesTitles(req) {
	const updated = [];
	const userId = commonUtils.getUserId(req);
	const { title, slug } = req.body;
	console.log('importing categorie', title);
	if (!title || !slug) {
		return null;
		// throw new ApiError(httpStatus.BAD_REQUEST, `Title is required`);
	}
	const existedCategory = await db.category_translation.findOne({
		where: { title: title, language_id: 1 },
	});
	if (!existedCategory) {
		const transaction = await db.sequelize.transaction();
		try {
			const createdCategory = await db.category.create(
				{
					parent_id: null,
					level: 1,
					user_id: userId,
					status: true,
				},
				{ transaction }
			);
			await db.category_translation.create(
				{
					title,
					slug,
					language_id: 1,
					category_id: createdCategory.id,
				},
				{ transaction }
			);
			updated.push(title);
			console.log(updated, 'updatedCat');

			transaction.commit();
			return createdCategory;
		} catch (error) {
			transaction.rollback();
			return null;
			// throw error;
		}
	}
}

async function verifyCategoriesExist(
	categoryNames = categoryNameList,
	languageId = 1
) {
	if (!Array.isArray(categoryNames) || categoryNames.length === 0) {
		return { existing: [], missing: [] };
	}

	// normalize + dedupe
	const normalizedNames = [
		...new Set(categoryNames.map((v) => v.trim().toLowerCase())),
	];

	// fetch existing category titles
	const rows = await db.category_translation.findAll({
		attributes: ['category_id', 'title'],
		where: {
			language_id: languageId,
			[Op.and]: [
				where(fn('LOWER', col('title')), { [Op.in]: normalizedNames }),
			],
		},
		raw: true,
	});

	const existingNames = rows.map((r) => r.title.toLowerCase());

	const missing = normalizedNames.filter(
		(name) => !existingNames.includes(name)
	);

	return {
		existing: rows, // contains category_id + title
		missing,
	};
}

const stringSimilarity = require('string-similarity');

function normalizeCategoryTitle(title) {
	return title
		.toLowerCase()
		.replace(/[-_]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

async function findSimilarCategories(threshold = 0.35) {
	const categories = await db.category_translation.findAll({
		attributes: ['category_id', 'title'],
		raw: true,
	});

	const results = [];
	const usedPairs = new Set();

	for (let i = 0; i < categories.length; i++) {
		for (let j = i + 1; j < categories.length; j++) {
			const title1 = normalizeCategoryTitle(categories[i].title);
			const title2 = normalizeCategoryTitle(categories[j].title);

			const similarity = stringSimilarity.compareTwoStrings(
				title1,
				title2
			);

			if (similarity >= threshold) {
				console.log(categories[i], 'chking similar111');
				const key = `${categories[i].id}-${categories[j].id}`;
				if (!usedPairs.has(key)) {
					results.push({
						category1: categories[i],
						category2: categories[j],
						similarity: Number(similarity.toFixed(2)),
					});
					usedPairs.add(key);
				}
			}
		}
	}

	return results;
}

module.exports = {
	getCategoryById: categoryService.getById,
	createCategory,
	updateCategory,
	getCategories: (req) =>
		categoryService.list(
			req,
			[],
			// [],
			[
				'id',
				'level',
				'status',
				// 🔹 isLeaf = no children exist
				[
					db.sequelize.literal(`(
					SELECT COUNT(*)
					FROM category AS child
					WHERE child.parent_id = category.id
				) = 0`),
					'is_leaf',
				],
				'created_at',
			],
			[['id', 'DESC']]
		),
	permanentDeleteCategoryById: categoryService.permanentDelete,
	softDeleteCategoryById,
	getCategoriesForOptions,
	importCategoriesTitles,
	verifyCategoriesExist,
	findSimilarCategories,
};

async function isCategoryDescendant(
	categoryId,
	potentialParentId,
	transaction
) {
	const query = `
		WITH RECURSIVE descendants AS (
			SELECT id, parent_id
			FROM category
			WHERE parent_id = :categoryId

			UNION ALL

			SELECT c.id, c.parent_id
			FROM category c
			INNER JOIN descendants d
				ON c.parent_id = d.id
		)
		SELECT 1
		FROM descendants
		WHERE id = :potentialParentId
		LIMIT 1;
	`;

	const result = await db.sequelize.query(query, {
		replacements: { categoryId, potentialParentId },
		type: db.sequelize.QueryTypes.SELECT,
		transaction,
	});

	return result.length > 0;
}

async function updateChildrenLevels(categoryId, levelDiff, transaction) {
	const query = `
		WITH RECURSIVE descendants AS (
			SELECT id
			FROM category
			WHERE parent_id = :categoryId

			UNION ALL

			SELECT c.id
			FROM category c
			INNER JOIN descendants d
				ON c.parent_id = d.id
		)
		UPDATE category
		SET level = level + :levelDiff
		WHERE id IN (SELECT id FROM descendants);
	`;

	await db.sequelize.query(query, {
		replacements: { categoryId, levelDiff },
		transaction,
	});
}

const nestedCategoriesData = require('../../data/categories.json');

const categoryNameList = [
	'swaddles',
	'swaddles',
	'swaddles',
	'swaddles',
	'swaddles',
	'swaddles',
	'swaddles',
	'swaddles',
	'swaddles',
	'wrapping sheets',
	'wrapping sheets',
	'wrapping sheets',
	'wrapping sheets',
	'wrapping sheets',
	'wrapping sheets',
	'wrapping sheets',
	'wrapping sheets',
	'feeder covers',
	'feeder covers',
	'feeder covers',
	'feeder covers',
	'feeder covers',
	'feeder covers',
	'feeder covers',
	'feeder covers',
	'feeder covers',
	'feeder covers',
	'feeder covers',
	'feeders',
	'feeder covers',
	'feeder covers',
	'bath towels',
	'bath towels',
	'bath towels',
	'bath towels',
	'bath towels',
	'bath towels',
	'socks',
	'socks',
	'socks',
	'swaddle blankets',
	'rattles',
	'rattles',
	'rattles',
	'rattles',
	'bibs',
	'bibs',
	'bibs',
	'bibs',
	'bibs',
	'bibs',
	'bibs',
	'bibs',
	'bibs',
	'bibs',
	'bibs',
	'bibs',
	'bibs',
	'casual shoes',
	'casual shoes',
	'casual shoes',
	'casual shoes',
	'casual shoes',
	'casual shoes',
	'casual shoes',
	'lotions',
	'lotions',
	'lotions',
	'lotions',
	'oils',
	'oils',
	'oils',
	'oils',
	'powder',
	'powder',
	'powder',
	'powder',
	'soap',
	'soap',
	'wipes',
	'wipes',
	'wipes',
	'wipes',
	'wipes',
	'wipes',
	'wipes',
	'shampoo',
	'shampoo',
	'diaper',
	'diaper',
	'moisturizers',
	'moisturizers',
	'moisturizers',
	'diaper',
	'cologne',
	'cologne',
	'bottle wash',
	'bottle wash',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'teethers',
	'feeder brush',
	'feeder brush',
	'feeder brush',
	'feeder brush',
	'feeder brush',
	'feeder brush',
	'feeder brush',
	'feeder brush',
	'feeder brush',
	'bottle nipples',
	'bottle nipples',
	'bottle nipples',
	'bottle nipples',
	'feeding syringe',
	'feeding syringe',
	'feeding syringe',
	'pillows',
	'baby care',
	'bedding',
	'pillows',
	'pillows',
	'pillows',
	'baby care',
	'bedding',
	'pillows',
	'pillows',
	'pillows',
	'pillows',
	'pillows',
	'pillows',
	'play gym',
];
