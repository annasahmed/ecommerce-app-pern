const catchAsync = require('../../utils/catchAsync');
const { adminProductService } = require('../../services/Admin');

const getProductById = catchAsync(async (req, res) => {
	const product = await adminProductService.getProductById(
		req.params.productId
	);
	res.send(product);
});
const getProducts = catchAsync(async (req, res) => {
	const products = await adminProductService.getProducts(req);
	res.send(products);
});
const createProduct = catchAsync(async (req, res) => {
	const products = await adminProductService.createProduct(req);
	res.send(products);
});

const softDeleteProduct = catchAsync(async (req, res) => {
	await adminProductService.softDeleteProductById(req);
	res.send({ success: true });
});
const permanentDeleteProduct = catchAsync(async (req, res) => {
	await adminProductService.permanentDeleteProductById(req.params.productId);
	res.send({ success: true });
});

const updateProduct = catchAsync(async (req, res) => {
	const product = await adminProductService.updateProduct(req);

	res.send(product);
});

module.exports = {
	getProductById,
	getProducts,
	createProduct,
	softDeleteProduct,
	permanentDeleteProduct,
	updateProduct,
};
