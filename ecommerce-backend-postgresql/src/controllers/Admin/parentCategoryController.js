const catchAsync = require('../../utils/catchAsync');
const { adminParentCategoryService } = require('../../services/Admin');

const getParentCategoryById = catchAsync(async (req, res) => {
	const parentCategory =
		await adminParentCategoryService.getParentCategoryById(
			req.params.parentCategoryId
		);
	res.send(parentCategory);
});
const getParentCategories = catchAsync(async (req, res) => {
	const parentCategories =
		await adminParentCategoryService.getParentCategories(req);
	res.send(parentCategories);
});
const createParentCategory = catchAsync(async (req, res) => {
	const parentCategories =
		await adminParentCategoryService.createParentCategory(req);
	res.send(parentCategories);
});

const softDeleteParentCategory = catchAsync(async (req, res) => {
	await adminParentCategoryService.softDeleteParentCategoryById(
		req.params.parentCategoryId
	);
	res.send({ success: true });
});
const permanentDeleteParentCategory = catchAsync(async (req, res) => {
	await adminParentCategoryService.permanentDeleteParentCategoryById(
		req.params.parentCategoryId
	);
	res.send({ success: true });
});

const updateParentCategory = catchAsync(async (req, res) => {
	const parentCategory =
		await adminParentCategoryService.updateParentCategory(req);

	res.send(parentCategory);
});

module.exports = {
	getParentCategoryById,
	getParentCategories,
	createParentCategory,
	softDeleteParentCategory,
	permanentDeleteParentCategory,
	updateParentCategory,
};
