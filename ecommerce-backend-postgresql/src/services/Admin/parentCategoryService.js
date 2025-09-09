const db = require('../../db/models');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const parentCategoryService = createBaseService(db.parent_category, {
	name: 'Parent Category',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({
		title: data.title,
		description: data.description,
		slug: data.slug,
		icon: data.icon,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.title) toUpdate.title = data.title;
		if (data.description) toUpdate.description = data.description;
		if (data.slug) toUpdate.slug = data.slug;
		if (data.icon) toUpdate.icon = data.icon;
		return toUpdate;
	},
	includes: [
		{
			model: db.media,
			required: false,
		},
	],
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
		parentCategoryService.list(req, [], [], [['created_at', 'ASC']]),
	permanentDeleteParentCategoryById: parentCategoryService.permanentDelete,
	softDeleteParentCategoryById,
};
