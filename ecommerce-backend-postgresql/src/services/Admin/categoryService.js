const db = require('../../db/models');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');
const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError.js');
const { Op } = require('sequelize');
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
				.scope(['onlyId', 'activeEntity'])
				.findByPk(parentId);
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

			newLevel = parentCategory.level + 1;
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

async function importCategories(req) {
	const userId = commonUtils.getUserId(req);

	for (const category of nestedCategoriesData) {
		await createCategoryTree({
			categoryData: category,
			userId,
		});
	}
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
			[['created_at', 'ASC']]
		),
	permanentDeleteCategoryById: categoryService.permanentDelete,
	softDeleteCategoryById,
	getCategoriesForOptions,
	importCategories,
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

	const result = await sequelize.query(query, {
		replacements: { categoryId, potentialParentId },
		type: sequelize.QueryTypes.SELECT,
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

	await sequelize.query(query, {
		replacements: { categoryId, levelDiff },
		transaction,
	});
}

const nestedCategoriesData = [
	{
		title: 'Fashion',
		slug: 'fashion',
		level: 1,
		children: [
			{
				title: 'Baby Accessories',
				slug: 'baby-accessories',
				level: 2,
				children: [
					{ title: 'Swaddles', slug: 'swaddles', level: 3 },
					{ title: 'Blankets', slug: 'blankets', level: 3 },
					{
						title: 'Wrapping Sheets',
						slug: 'wrapping-sheets',
						level: 3,
					},
					{ title: 'Towels', slug: 'towels', level: 3 },
					{ title: 'Bibs', slug: 'bibs', level: 3 },
					{ title: 'Caps & Hats', slug: 'caps-hats', level: 3 },
					{
						title: 'Mittens & Gloves',
						slug: 'mittens-gloves',
						level: 3,
					},
					{
						title: 'Socks & Booties',
						slug: 'socks-booties',
						level: 3,
					},
					{ title: 'Gift Sets', slug: 'gift-sets', level: 3 },
				],
			},
			{
				title: 'Baby',
				slug: 'baby',
				level: 2,
				children: [
					{
						title: 'Bodysuits & Rompers',
						slug: 'bodysuits-rompers',
						level: 3,
					},
					{ title: 'Sleepwear', slug: 'sleepwear', level: 3 },
					{ title: 'Tops', slug: 'tops', level: 3 },
					{ title: 'Bottoms', slug: 'baby-bottoms', level: 3 },
					{ title: 'Dresses', slug: 'dresses', level: 3 },
					{ title: 'Innerwear', slug: 'fashion-innerwear', level: 3 },
					{ title: 'Outerwear', slug: 'outerwear', level: 3 },
					{ title: 'Costumes', slug: 'costumes', level: 3 },
					{ title: 'Accessories', slug: 'accessories', level: 3 },
				],
			},
			{
				title: 'Footwear',
				slug: 'footwear',
				level: 2,
				children: [
					{ title: 'Socks', slug: 'socks', level: 3 },
					{ title: 'Booties', slug: 'booties', level: 3 },
					{ title: 'Casual Wear', slug: 'casual-wear', level: 3 },
					{ title: 'Sandals', slug: 'sandals', level: 3 },
				],
			},
		],
	},
	{
		title: 'Gear',
		slug: 'gear',
		level: 1,
		children: [
			{ title: 'Strollers & Prams', slug: 'strollers-prams', level: 2 },
			{
				title: 'Walkers & Push Along',
				slug: 'walkers-push-along',
				level: 2,
			},
			{
				title: 'Car Seats Carrycots & Carriers',
				slug: 'car-seats-carrycots-carriers',
				level: 2,
			},
			{
				title: 'Bouncers Rockers & Swings',
				slug: 'bouncers-rockers-swings',
				level: 2,
			},
			{
				title: 'Highchair & Booster Seats',
				slug: 'gear-highchair-booster-seats',
				level: 2,
			},
			{
				title: 'Playmats & Playgyms',
				slug: 'gear-playmats-playgyms',
				level: 2,
			},
			{
				title: 'Tricycles & Bicycles',
				slug: 'tricycles-bicycles',
				level: 2,
			},
			{ title: 'Rideons & Scooters', slug: 'rideons-scooters', level: 2 },
			{ title: 'Travel Bags', slug: 'gear-travel-bags', level: 2 },
		],
	},
	{
		title: 'Feeding',
		slug: 'feeding',
		level: 1,
		children: [
			{
				title: 'Breast Feeding',
				slug: 'feeding-breast-feeding',
				level: 2,
			},
			{
				title: 'Feeding Bottles & Teats',
				slug: 'feeding-bottles-teats',
				level: 2,
			},
			{ title: 'Sippers & Cups', slug: 'sippers-cups', level: 2 },
			{ title: 'Dishes & Utensils', slug: 'dishes-utensils', level: 2 },
			{
				title: 'Teethers & Pacifiers',
				slug: 'teethers-pacifiers',
				level: 2,
			},
			{
				title: 'Sterilizers & Warmers',
				slug: 'sterilizers-warmers',
				level: 2,
			},
			{
				title: 'Feeding Accessories',
				slug: 'feeding-accessories',
				level: 2,
			},
			{
				title: 'Food Processors & Containers',
				slug: 'food-processors-containers',
				level: 2,
			},
			{
				title: 'Highchair & Booster Seats',
				slug: 'feeding-highchair-booster-seats',
				level: 2,
			},
			{
				title: 'Baby Food & Infant Formula',
				slug: 'baby-food-infant-formula',
				level: 2,
			},
			{
				title: 'Kids Food & Supplements',
				slug: 'kids-food-supplements',
				level: 2,
			},
			{ title: 'Bibs & Hankies', slug: 'bibs-hankies', level: 2 },
		],
	},
	{
		title: 'Bath & Shower',
		slug: 'bath-shower',
		level: 1,
		children: [
			{
				title: 'Lotions Oils & Powders',
				slug: 'lotions-oils-powders',
				level: 2,
			},
			{
				title: 'Soaps Body Wash & Shampoos',
				slug: 'soaps-body-wash-shampoos',
				level: 2,
			},
			{
				title: 'Baby Creams & Ointments',
				slug: 'baby-creams-ointments',
				level: 2,
			},
			{
				title: 'Bath Tubs & Bathers',
				slug: 'bath-tubs-bathers',
				level: 2,
			},
			{
				title: 'Bath Towels & Robes',
				slug: 'bath-towels-robes',
				level: 2,
			},
			{
				title: 'Grooming Essentials',
				slug: 'grooming-essentials',
				level: 2,
			},
			{ title: 'Bath Toys', slug: 'bath-shower-bath-toys', level: 2 },
			{ title: 'Potty Training', slug: 'potty-training', level: 2 },
			{
				title: 'Changing Tables & Mats',
				slug: 'bath-changing-tables-mats',
				level: 2,
			},
			{
				title: 'Bathing Accessories',
				slug: 'bathing-accessories',
				level: 2,
			},
		],
	},
	{
		title: 'Safety',
		slug: 'safety',
		level: 1,
		children: [
			{
				title: 'Childproofing & Safety',
				slug: 'childproofing-safety',
				level: 2,
			},
			{ title: 'Medical Care', slug: 'medical-care', level: 2 },
			{ title: 'Oral Care', slug: 'oral-care', level: 2 },
			{
				title: 'Cleansers & Detergents',
				slug: 'cleansers-detergents',
				level: 2,
			},
		],
	},
	{
		title: 'Toys',
		slug: 'toys',
		level: 1,
		children: [
			{
				title: 'Infant Toys',
				slug: 'infant-toys',
				level: 2,
				children: [
					{ title: 'Rattles', slug: 'rattles', level: 3 },
					{ title: 'Musical Toys', slug: 'musical-toys', level: 3 },
					{
						title: 'Playmats & Playgyms',
						slug: 'toys-playmats-playgyms',
						level: 3,
					},
					{ title: 'Soft Toys', slug: 'soft-toys', level: 3 },
					{ title: 'Bath Toys', slug: 'toys-bath-toys', level: 3 },
				],
			},
		],
	},
	{
		title: 'Diapering',
		slug: 'diapering',
		level: 1,
		children: [
			{ title: 'Diapers & Nappies', slug: 'diapers-nappies', level: 2 },
			{ title: 'Wipes', slug: 'wipes', level: 2 },
			{ title: 'Rash Creams', slug: 'rash-creams', level: 2 },
			{ title: 'Potty Seats', slug: 'potty-seats', level: 2 },
			{ title: 'Diaper Bags', slug: 'diaper-bags', level: 2 },
			{
				title: 'Changing Tables & Mats',
				slug: 'diapering-changing-tables-mats',
				level: 2,
			},
		],
	},
	{
		title: 'Nursery',
		slug: 'nursery',
		level: 1,
		children: [
			{
				title: 'Cots Cradles & Playpen',
				slug: 'cots-cradles-playpen',
				level: 2,
			},
			{
				title: 'Carry Nests & Carry Cribs',
				slug: 'carry-nests-carry-cribs',
				level: 2,
			},
			{
				title: 'Bedding Sets & Pillows',
				slug: 'bedding-sets-pillows',
				level: 2,
			},
			{ title: 'Sleeping Bags', slug: 'sleeping-bags', level: 2 },
			{ title: 'Blankets & Quilts', slug: 'blankets-quilts', level: 2 },
			{
				title: 'Wrapping Sheets & Swaddles',
				slug: 'wrapping-sheets-swaddles',
				level: 2,
			},
			{
				title: 'Hooded Towels & Wraps',
				slug: 'hooded-towels-wraps',
				level: 2,
			},
			{
				title: 'Wardrobes & Storage',
				slug: 'wardrobes-storage',
				level: 2,
			},
			{ title: 'Travel Bags', slug: 'nursery-travel-bags', level: 2 },
			{ title: 'Kids Room & Study', slug: 'kids-room-study', level: 2 },
		],
	},
	{
		title: 'Moms',
		slug: 'moms',
		level: 1,
		children: [
			{ title: 'Breast Feeding', slug: 'moms-breast-feeding', level: 2 },
			{ title: 'Innerwear', slug: 'moms-innerwear', level: 2 },
			{ title: 'Personal Care', slug: 'personal-care', level: 2 },
			{ title: 'Nursing', slug: 'nursing', level: 2 },
			{ title: 'Bottoms', slug: 'moms-bottoms', level: 2 },
			{ title: 'Diaper Bags', slug: 'moms-diaper-bags', level: 2 },
		],
	},
];
