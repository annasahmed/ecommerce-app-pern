const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const attributeService = createBaseService(db.attribute, {
	name: 'Attribute',
	checkDuplicateSlug: false,
	formatCreateData: (data) => ({
		name: data.name,
		values: data.values,
		status: data.status,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.name) toUpdate.name = data.name;
		if (data.values) toUpdate.values = data.values;
		if (data.status !== undefined) toUpdate.status = data.status;

		return toUpdate;
	},
});

// Using userId logic from request
async function createAttribute(req) {
	const userId = commonUtils.getUserId(req);
	return attributeService.create(req.body, userId);
}

async function updateAttribute(req) {
	const userId = commonUtils.getUserId(req);
	return attributeService.update(req.params.attributeId, req.body, userId);
}

async function softDeleteAttributeById(req) {
	const userId = commonUtils.getUserId(req);
	return attributeService.softDelete(req.params.attributeId, userId);
}

module.exports = {
	getAttributeById: attributeService.getById,
	createAttribute,
	updateAttribute,
	getAttributes: (req) =>
		attributeService.list(req, [], [], [['created_at', 'ASC']]),
	permanentDeleteAttributeById: attributeService.permanentDelete,
	softDeleteAttributeById,
};
