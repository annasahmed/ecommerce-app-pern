const catchAsync = require('../../utils/catchAsync');
const { apiParentCategoryService } = require('../../services/Api');
const { parentCategoryTransformer } = require('../../transformers/Api');
const { getLang } = require('../../utils/commonUtils');

const getParentCategories = catchAsync(async (req, res) => {
	const parentCategories = await apiParentCategoryService.getParentCategories(
		req
	);
	// res.send(parentCategories);
	res.send(
		parentCategoryTransformer.transformParentCategoriesResponse(
			parentCategories,
			getLang(req)
		)
	);
});

module.exports = {
	getParentCategories,
};
