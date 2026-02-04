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

async function importAttributes(req) {
	const attributesData = require('../../data/attributes.json');
	for (const attr of attributesData) {
		req.body = attr;
		// console.log(attr);
		await createAttribute(req);
	}
}

async function updateAttribute(req) {
	const userId = commonUtils.getUserId(req);
	return attributeService.update(req.params.attributeId, req.body, userId);
}

async function softDeleteAttributeById(req) {
	const userId = commonUtils.getUserId(req);
	return attributeService.softDelete(req.params.attributeId, userId);
}

async function verifyAttributeValues({
	attributeId = 9,
	values = [
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Mommys',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
		'Unisex',
	],
	lang = 'en',
} = {}) {
	if (!attributeId) {
		throw new Error('attributeId is required');
	}

	if (!Array.isArray(values) || values.length === 0) {
		return { existing: [], missing: [] };
	}

	// normalize input (dedupe + lowercase)
	const normalized = [...new Set(values.map((v) => v.trim().toLowerCase()))];

	const attr = await db.attribute.findByPk(attributeId, {
		attributes: ['id', 'values'],
		raw: true,
	});

	if (!attr) {
		return {
			existing: [],
			missing: normalized,
		};
	}

	// Extract existing values from JSONB[]
	const existingValues = (attr.values || [])
		.map((v) => v?.[lang]?.toLowerCase())
		.filter(Boolean);

	const missing = normalized.filter((v) => !existingValues.includes(v));

	return {
		existing: existingValues,
		missing,
	};
}

module.exports = {
	getAttributeById: attributeService.getById,
	createAttribute,
	updateAttribute,
	getAttributes: (req) =>
		attributeService.list(req, [], [], [['id', 'DESC']]),
	permanentDeleteAttributeById: attributeService.permanentDelete,
	softDeleteAttributeById,
	importAttributes,
	verifyAttributeValues,
};
