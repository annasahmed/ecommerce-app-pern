const catchAsync = require('../../utils/catchAsync');
const {
	importMedia,
	linkMediaToProducts,
} = require('../../scripts/importMedia');

const importMediaController = catchAsync(async (req, res) => {
	await importMedia();
	res.send({ message: 'successfull' });
});
const linkMediaToProductsController = catchAsync(async (req, res) => {
	linkMediaToProducts();
	res.send({ message: 'successfull' });
});

module.exports = {
	importMediaController,
	linkMediaToProductsController,
};
