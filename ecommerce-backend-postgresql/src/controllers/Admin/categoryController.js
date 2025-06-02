const catchAsync = require('../../utils/catchAsync');
const { adminCategoryService } = require('../../services/Admin');

const getCategoryById = catchAsync(async (req, res) => {
	const category = await adminCategoryService.getCategoryById(
		req.params.categoryId
	);
	res.send(category);
});
const getCategories = catchAsync(async (req, res) => {
	const categories = await adminCategoryService.getCategories(req);
	res.send(categories);
});
const createCategory = catchAsync(async (req, res) => {
	const categories = await adminCategoryService.createCategory(req);
	res.send(categories);
});

const softDeleteCategory = catchAsync(async (req, res) => {
	await adminCategoryService.softDeleteCategoryById(req.params.categoryId);
	res.send({ success: true });
});
const permanentDeleteCategory = catchAsync(async (req, res) => {
	await adminCategoryService.permanentDeleteCategoryById(
		req.params.categoryId
	);
	res.send({ success: true });
});

const updateCategory = catchAsync(async (req, res) => {
	const category = await adminCategoryService.updateCategory(req);

	res.send(category);
});

module.exports = {
	getCategoryById,
	getCategories,
	createCategory,
	softDeleteCategory,
	permanentDeleteCategory,
	updateCategory,
};
