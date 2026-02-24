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
const importCategories = catchAsync(async (req, res) => {
	const categoriesData = require('../../data/update_categories.json');
	for (const data of categoriesData) {
		req.body = data;
		await adminCategoryService.importCategoriesTitles(req);
	}
	// const categories = await adminCategoryService.createCategory(req);
	res.send({ message: 'Categories imported successfully' });
});

// const importCategories = catchAsync(async (req, res) => {
// 	adminCategoryService.importCategories(req);
// 	res.send({ message: 'successfull' });
// });

const softDeleteCategory = catchAsync(async (req, res) => {
	await adminCategoryService.softDeleteCategoryById(req);
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

const findSimilarCategories = catchAsync(async (req, res) => {
	const categories = await adminCategoryService.findSimilarCategories(req);
	res.send(categories);
});
const restoreSoftDeleteCategories = catchAsync(async (req, res) => {
	const categories = await adminCategoryService.restoreSoftDeleteCategories(
		req
	);
	res.send(categories);
});
const getCategoriesForOptions = catchAsync(async (req, res) => {
	const categories = await adminCategoryService.getCategoriesForOptions(req);
	res.send(categories);
});
const fixSlugsCategories = catchAsync(async (req, res) => {
	const categories = await adminCategoryService.fixSlugsCategories(req);
	res.send(categories);
});

module.exports = {
	getCategoryById,
	getCategories,
	createCategory,
	softDeleteCategory,
	permanentDeleteCategory,
	updateCategory,
	getCategoriesForOptions,
	importCategories,
	findSimilarCategories,
	fixSlugsCategories,
	restoreSoftDeleteCategories,
};

const level1Categories = [
	{
		parentId: null,
		icon: null,
		translations: [
			{
				title: 'Fashion',
				description: null,
				slug: 'fashion',
				language_id: 1,
			},
		],
		status: true,
	},
	{
		parentId: null,
		icon: null,
		translations: [
			{
				title: 'Gear',
				description: null,
				slug: 'gear',
				language_id: 1,
			},
		],
		status: true,
	},
	{
		parentId: null,
		icon: null,
		translations: [
			{
				title: 'Feeding',
				description: null,
				slug: 'feeding',
				language_id: 1,
			},
		],
		status: true,
	},
	{
		parentId: null,
		icon: null,
		translations: [
			{
				title: 'Bath & Shower',
				description: null,
				slug: 'bath-shower',
				language_id: 1,
			},
		],
		status: true,
	},
	{
		parentId: null,
		icon: null,
		translations: [
			{
				title: 'Safety',
				description: null,
				slug: 'safety',
				language_id: 1,
			},
		],
		status: true,
	},
	{
		parentId: null,
		icon: null,
		translations: [
			{
				title: 'Toys',
				description: null,
				slug: 'toys',
				language_id: 1,
			},
		],
		status: true,
	},
	{
		parentId: null,
		icon: null,
		translations: [
			{
				title: 'Diapering',
				description: null,
				slug: 'diapering',
				language_id: 1,
			},
		],
		status: true,
	},
	{
		parentId: null,
		icon: null,
		translations: [
			{
				title: 'Nursery',
				description: null,
				slug: 'nursery',
				language_id: 1,
			},
		],
		status: true,
	},
	{
		parentId: null,
		icon: null,
		translations: [
			{
				title: 'Moms',
				description: null,
				slug: 'moms',
				language_id: 1,
			},
		],
		status: true,
	},
];
