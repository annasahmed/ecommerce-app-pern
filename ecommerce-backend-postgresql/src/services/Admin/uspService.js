const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const uspService = createBaseService(db.usp, {
	name: 'Usp',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({
		icon: data.icon,
		status: data.status,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.icon) toUpdate.icon = data.icon;
		if (data.status !== undefined) toUpdate.status = data.status;
		return toUpdate;
	},
	translationModel: db.usp_translation,
	translationForeignKey: 'usp_id',
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
