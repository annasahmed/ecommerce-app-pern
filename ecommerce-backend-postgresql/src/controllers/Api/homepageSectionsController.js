const { apiHomepageSectionsService } = require('../../services/Api');
const { homepageSectionTransformer } = require('../../transformers/Api');
const catchAsync = require('../../utils/catchAsync');
const { getLang } = require('../../utils/commonUtils');

const getHomepageSections = catchAsync(async (req, res) => {
	const homepageSections =
		await apiHomepageSectionsService.getHomepageSections(req);
	res.send(
		homepageSectionTransformer.transformHomepageSectionsResponse(
			homepageSections,
			getLang(req)
		)
	);
});

module.exports = {
	getHomepageSections,
};
