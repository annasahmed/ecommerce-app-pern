const catchAsync = require('../../utils/catchAsync');
const { adminProductService } = require('../../services/Admin');
const httpStatus = require('http-status');

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
	res.status(httpStatus.CREATED).send(products);
});
const fixThumbnailsProducts = catchAsync(async (req, res) => {
	const products = await adminProductService.fixThumbnailsProducts(req);
	res.status(httpStatus.ACCEPTED).send(products);
});
const createBulkProducts = catchAsync(async (req, res) => {
	// for (const data of bulkProductData) {
	// 	req.body = data;
	// 	await adminProductService.createProduct(req);
	// 	console.log(req.body.sku, 'added');
	// }
	res.send({ message: 'sucessfull' });
});
const updateProductBySlug = catchAsync(async (req, res) => {
	const updatedProducts = [];
	const updateProducts = require('../../data/update_product_categories.json');
	for (const data of updateProducts) {
		req.body = data;
		const updatedProduct =
			await adminProductService.updateProductCategoriesBySku(req);
		if (updatedProduct) {
			updatedProducts.push(updatedProduct);
		}
	}
	res.send({ message: `updated these products`, updatedProducts });
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
const importProductsFromSheet = catchAsync(async (req, res) => {
	const results = await adminProductService.importProductsFromSheet(req);
	res.send(results);
});
const exportProducts = catchAsync(async (req, res) => {
	await adminProductService.exportProducts(req, res);
	// res.send(results);
});

module.exports = {
	getProductById,
	getProducts,
	createProduct,
	softDeleteProduct,
	permanentDeleteProduct,
	updateProduct,
	createBulkProducts,
	updateProductBySlug,
	importProductsFromSheet,
	exportProducts,
	fixThumbnailsProducts,
};
