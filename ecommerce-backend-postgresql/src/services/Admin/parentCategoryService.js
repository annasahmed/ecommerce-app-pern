const db = require('../../db/models');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const parentCategoryService = createBaseService(db.parent_category, {
	name: 'Parent Category',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({
		icon: data.icon,
		status: data.status,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.icon) toUpdate.icon = data.icon;
		if (data.status !== undefined) toUpdate.status = data.status;
		return toUpdate;
	},
	includes: [
		{
			model: db.media,
			required: false,
		},
	],
	translationModel: db.parent_category_translation,
	translationForeignKey: 'parent_category_id',
	// isPagination: false,
});

// Using userId logic from request
async function createParentCategory(req) {
	const userId = commonUtils.getUserId(req);
	return parentCategoryService.create(req.body, userId);
}

async function updateParentCategory(req) {
	const userId = commonUtils.getUserId(req);
	return parentCategoryService.update(
		req.params.parentCategoryId,
		req.body,
		userId
	);
}

async function softDeleteParentCategoryById(req) {
	const userId = commonUtils.getUserId(req);
	return parentCategoryService.softDelete(
		req.params.parentCategoryId,
		userId
	);
}

module.exports = {
	getParentCategoryById: parentCategoryService.getById,
	createParentCategory,
	updateParentCategory,
	getParentCategories: (req) =>
		parentCategoryService.list(req, [], [], [['id', 'DESC']]),
	permanentDeleteParentCategoryById: parentCategoryService.permanentDelete,
	softDeleteParentCategoryById,
};
