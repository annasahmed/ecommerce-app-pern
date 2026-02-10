const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const brandService = createBaseService(db.brand, {
	name: 'Brand',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({
		icon: data.icon,
		status: data.status,
		show_on_homepage: data.show_on_homepage,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.icon) toUpdate.icon = data.icon;
		if (data.status !== undefined) toUpdate.status = data.status;
		if (data.show_on_homepage !== undefined)
			toUpdate.show_on_homepage = data.show_on_homepage;
		return toUpdate;
	},
	includes: [
		{
			model: db.media,
			as: 'logo',
			// field: 'icon',
			required: false,
			attributes: ['url', 'title'],
		},
	],
	translationModel: db.brand_translation,
	translationForeignKey: 'brand_id',
});

// Using userId logic from request
async function createBrand(req) {
	const userId = commonUtils.getUserId(req);
	return brandService.create(req.body, userId);
}

async function updateBrand(req) {
	const userId = commonUtils.getUserId(req);
	return brandService.update(req.params.brandId, req.body, userId);
}

async function softDeleteBrandById(req) {
	const userId = commonUtils.getUserId(req);
	return brandService.softDelete(req.params.brandId, userId);
}

module.exports = {
	getBrandById: brandService.getById,
	createBrand,
	updateBrand,
	getBrands: (req) => brandService.list(req, [], [], [['id', 'DESC']]),
	permanentDeleteBrandById: brandService.permanentDelete,
	softDeleteBrandById,
};
