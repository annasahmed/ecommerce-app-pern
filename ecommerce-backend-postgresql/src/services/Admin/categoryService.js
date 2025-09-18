const db = require('../../db/models');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');
const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError.js');

const validations = async (data) => {
	if (data.parentCategoryId) {
		const exist = await db.parent_category
			.scope(['onlyId', 'activeEntity'])
			.findOne({
				where: { id: data.parentCategoryId },
			});
		if (!exist)
			throw new ApiError(
				httpStatus.NOT_FOUND,
				`Parent category does not exists`
			);
	}
};

const categoryService = createBaseService(db.category, {
	name: 'Category',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({
		icon: data.icon,
		status: data.status,
		parent_category_id: data.parentCategoryId,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.icon) toUpdate.icon = data.icon;
		if (data.status !== undefined) toUpdate.status = data.status;
		if (data.parentCategoryId)
			toUpdate.parent_category_id = data.parentCategoryId;
		return toUpdate;
	},
	validations,
	// isPagination: false,
	includes: [
		{
			model: db.media,
			required: false,
		},
	],
	translationModel: db.category_translation,
	translationForeignKey: 'category_id',
});

// Using userId logic from request
async function createCategory(req) {
	const userId = commonUtils.getUserId(req);
	return categoryService.create(req.body, userId);
}

async function updateCategory(req) {
	const userId = commonUtils.getUserId(req);
	return categoryService.update(req.params.categoryId, req.body, userId);
}

async function softDeleteCategoryById(req) {
	const userId = commonUtils.getUserId(req);
	return categoryService.softDelete(req.params.categoryId, userId);
}

module.exports = {
	getCategoryById: categoryService.getById,
	createCategory,
	updateCategory,
	getCategories: (req) =>
		categoryService.list(req, [], [], [['created_at', 'ASC']]),
	permanentDeleteCategoryById: categoryService.permanentDelete,
	softDeleteCategoryById,
};
