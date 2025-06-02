const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const uspService = createBaseService(db.usp, {
	name: 'Usp',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({
		title: data.title,
		description: data.description,
		slug: data.slug,
		icon: data.icon,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.title) toUpdate.title = data.title;
		if (data.description) toUpdate.description = data.description;
		if (data.slug) toUpdate.slug = data.slug;
		if (data.icon) toUpdate.icon = data.icon;

		return toUpdate;
	},
});

// Using userId logic from request
async function createUsp(req) {
	const userId = commonUtils.getUserId(req);
	return uspService.create(req.body, userId);
}

async function updateUsp(req) {
	const userId = commonUtils.getUserId(req);
	return uspService.update(req.params.uspId, req.body, userId);
}

async function softDeleteUspById(req) {
	const userId = commonUtils.getUserId(req);
	return uspService.softDelete(req.params.uspId, userId);
}

module.exports = {
	getUspById: uspService.getById,
	createUsp,
	updateUsp,
	getUsps: (req) => uspService.list(req, [], [], [['created_at', 'ASC']]),
	permanentDeleteUspById: uspService.permanentDelete,
	softDeleteUspById,
};
