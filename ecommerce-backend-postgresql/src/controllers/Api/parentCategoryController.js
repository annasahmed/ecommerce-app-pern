const catchAsync = require('../../utils/catchAsync');
const { apiParentCategoryService } = require('../../services/Api');

const getParentCategories = catchAsync(async (req, res) => {
	const parentCategories = await apiParentCategoryService.getParentCategories(
		req
	);
	res.send(parentCategories);
});

module.exports = {
	getParentCategories,
};
