const httpStatus = require('http-status');
const { getOffset } = require('../../utils/query');
const ApiError = require('../../utils/ApiError');
const { encryptData } = require('../../utils/auth');
const config = require('../../config/config.js');
const db = require('../../db/models');
const commonUtils = require('../../utils/commonUtils.js');
const { adminParentCategoryService } = require('./index.js');

async function getCategoryById(id) {
	const category = await db.category.findOne({
		where: { id },
		include: [
			{
				model: db.parent_category,
				require: true,
				attributes: ['id', 'title', 'description', 'slug', 'icon'],
			},
		],
	});

	return category;
}

async function createCategory(req) {
	const { title, description, slug, icon, parentCategoryId } = req.body;
	const userId = commonUtils.getUserId(req);

	// const parentCategory=
	const parentCategory =
		await adminParentCategoryService.getParentCategoryById(
			parentCategoryId,
			['onlyId', 'active']
		);

	if (!parentCategory) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Parent Category not found');
	}

	const createdCategory = await db.category
		.create({
			title,
			description,
			slug,
			icon,
			parent_category_id: parentCategoryId,
			user_id: userId,
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	return createdCategory;
}

async function getCategorys(req) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

	const categorys = await db.category.findAndCountAll({
		order: [
			['name', 'ASC'],
			['created_date_time', 'DESC'],
			['modified_date_time', 'DESC'],
		],
		include: [
			{
				model: db.role,
				require: true,
				attributes: ['id', 'name'],
			},
		],
		attributes: [
			'id',
			'name',
			'email',
			'created_date_time',
			'modified_date_time',
		],
		offset,
		limit,
		raw: true,
	});

	return categorys;
}

async function deleteCategoryById(categoryId) {
	const deletedCategory = await db.category.destroy({
		where: { id: categoryId },
	});

	if (!deletedCategory) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
	}

	return deletedCategory;
}

async function updateCategory(req) {
	const { password, email } = req.body;

	if (password) {
		const hashedPassword = await encryptData(password);

		if (!hashedPassword) {
			throw new ApiError(
				httpStatus.INTERNAL_SERVER_ERROR,
				'Internal Server Error'
			);
		}

		req.body.password = hashedPassword;
	}

	if (email) {
		const existedCategory = await getCategoryByEmail(email);

		if (existedCategory) {
			throw new ApiError(
				httpStatus.CONFLICT,
				'This email is already exist'
			);
		}
	}

	const updatedCategory = await db.category
		.update(
			{ ...req.body },
			{
				where: { id: req.params.categoryId || req.body.id },
				returning: true,
				plain: true,
				raw: true,
			}
		)
		.then((data) => data[1]);

	return updatedCategory;
}

module.exports = {
	getCategoryById,
	createCategory,
	updateCategory,
	getCategorys,
	deleteCategoryById,
};
