const catchAsync = require('../../utils/catchAsync');
const { apiProductService } = require('../../services/Api');

const getProducts = catchAsync(async (req, res) => {
	const products = await apiProductService.getProducts(req);
	res.send(products);
});

module.exports = {
	getProducts,
};
