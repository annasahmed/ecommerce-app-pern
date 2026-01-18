const catchAsync = require('../../utils/catchAsync');
const { apiFilterService } = require('../../services/Api');
const { filtersDataTransformer } = require('../../transformers/Api');
const { getLang } = require('../../utils/commonUtils');

const getFiltersData = catchAsync(async (req, res) => {
	const filtersData = await apiFilterService.getFiltersData(req);
	res.send(
		filtersDataTransformer.transformFilterDataResponse(
			filtersData,
			getLang(req)
		)
	);
});

module.exports = {
	getFiltersData,
};
