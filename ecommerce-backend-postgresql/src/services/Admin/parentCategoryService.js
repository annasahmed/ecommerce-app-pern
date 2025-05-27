const httpStatus = require('http-status');
const { getOffset } = require('../../utils/query');
const ApiError = require('../../utils/ApiError');
const { encryptData } = require('../../utils/auth');
const config = require('../../config/config.js');
const db = require('../../db/models');
const commonUtils = require('../../utils/commonUtils.js');

async function getParentCategoryById(id, scope = 'defaultScope') {
	const parnetCategory = await db.parent_category.scope(scope).findOne({
		where: { id },
	});

	return parnetCategory;
}

async function createCategory(req) {
	const { title, description, slug, icon, parentCategoryId } = req.body;
	const userId = commonUtils.getUserId(req);

	// const parentCategory=
	const category = await getCategoryByEmail(email);

	if (category) {
		throw new ApiError(httpStatus.CONFLICT, 'This email already exits');
	}

	const role = await roleService.getRoleById(roleId);

	if (!role) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
	}

	const createdCategory = await db.category
		.create({
			name,
			email,
			role_id: roleId,
			password: hashedPassword,
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
	getParentCategoryById,
	createCategory,
	updateCategory,
	getCategorys,
	deleteCategoryById,
};
