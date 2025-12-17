const catchAsync = require('../../utils/catchAsync');
const { apiCategoryService } = require('../../services/Api');
const { categoryTransformer } = require('../../transformers/Api');
const { getLang } = require('../../utils/commonUtils');

const getCategories = catchAsync(async (req, res) => {
	const categories = await apiCategoryService.getCategories(req);
	res.send(
		categoryTransformer.transformCategoriesResponse(
			categories,
			getLang(req)
		)
	);
});

module.exports = {
	getCategories,
};
