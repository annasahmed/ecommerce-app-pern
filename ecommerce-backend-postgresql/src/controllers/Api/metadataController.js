const catchAsync = require('../../utils/catchAsync');
const { apiMetadataService } = require('../../services/Api');
const { metaDataTransformer } = require('../../transformers/Api');
const { getLang } = require('../../utils/commonUtils');

const getFiltersData = catchAsync(async (req, res) => {
	const filtersData = await apiMetadataService.getFiltersData(req);
	res.send(
		metaDataTransformer.transformFilterDataResponse(
			filtersData,
			getLang(req)
		)
	);
});
const getNavCategories = catchAsync(async (req, res) => {
	const navCategories = await apiMetadataService.getNavCategories(req);
	res.send(
		metaDataTransformer.transformNavCategoriesResponse(
			navCategories,
			getLang(req)
		)
	);
});
const getBrands = catchAsync(async (req, res) => {
	const brands = await apiMetadataService.getBrands(req);
	res.send(metaDataTransformer.transformBrandsResponse(brands, getLang(req)));
});

module.exports = {
	getFiltersData,
	getNavCategories,
	getBrands,
};
