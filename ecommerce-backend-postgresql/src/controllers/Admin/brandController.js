const catchAsync = require('../../utils/catchAsync');
const { adminBrandService } = require('../../services/Admin');

const getBrandById = catchAsync(async (req, res) => {
	const brand = await adminBrandService.getBrandById(req.params.brandId);
	res.send(brand);
});
const getBrands = catchAsync(async (req, res) => {
	const brands = await adminBrandService.getBrands(req);
	res.send(brands);
});
const createBrand = catchAsync(async (req, res) => {
	const brands = await adminBrandService.createBrand(req);
	res.send(brands);
});

const softDeleteBrand = catchAsync(async (req, res) => {
	await adminBrandService.softDeleteBrandById(req);
	res.send({ success: true });
});
const permanentDeleteBrand = catchAsync(async (req, res) => {
	await adminBrandService.permanentDeleteBrandById(req.params.brandId);
	res.send({ success: true });
});

const updateBrand = catchAsync(async (req, res) => {
	const brand = await adminBrandService.updateBrand(req);

	res.send(brand);
});

module.exports = {
	getBrandById,
	getBrands,
	createBrand,
	softDeleteBrand,
	permanentDeleteBrand,
	updateBrand,
};
