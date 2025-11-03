const catchAsync = require('../../utils/catchAsync');
const { apiProductService } = require('../../services/Api');
const {
	transformProductsResponse,
	transformProduct,
} = require('../../transformers/Api/productTransformer');
const { getLang } = require('../../utils/commonUtils');

const getProducts = catchAsync(async (req, res) => {
	const products = await apiProductService.getProducts(req);
	res.send(transformProductsResponse(products, getLang(req)));
});
const getProductBySlug = catchAsync(async (req, res) => {
	const products = await apiProductService.getProductBySlug(req);
	res.send(transformProduct(products, getLang(req)));
});

module.exports = {
	getProducts,
	getProductBySlug,
};
