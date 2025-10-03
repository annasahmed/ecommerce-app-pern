const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const attributeService = createBaseService(db.attribute, {
	name: 'Attribute',
	checkDuplicateSlug: false,
	formatCreateData: () => {},
	formatUpdateData: () => {},
	includes: [{ model: db.attribute_value }],
});

// Using userId logic from request
async function createAttribute(req) {
	const userId = commonUtils.getUserId(req);
	return db.sequelize.transaction(async (t) => {
		const { values, ...attributeData } = data;

		const attribute = await db.attribute.create(
			{ ...attributeData, user_id: userId },
			{ transaction: t }
		);

		if (values && values.length) {
			await db.attribute_value.bulkCreate(
				values.map((v) => ({
					...v,
					attribute_id: attribute.id,
				})),
				{ transaction: t }
			);
		}

		return attribute;
	});
}

async function updateAttribute(req) {
	const userId = commonUtils.getUserId(req);
	const id = req.params.attributeId;
	return db.sequelize.transaction(async (t) => {
		const { values, ...attributeData } = req.body;

		const attribute = await db.attribute.findByPk(id, {
			include: { model: db.attribute_value },
			transaction: t,
		});
		if (!attribute) throw new Error('Attribute not found');

		// 1. Update attribute itself
		await attribute.update(
			{ ...attributeData, user_id: userId },
			{ transaction: t }
		);

		if (values) {
			// delete old values
			await db.attribute_value.destroy({
				where: { attribute_id: id },
				transaction: t,
			});

			// insert new ones
			if (values.length) {
				await db.attribute_value.bulkCreate(
					values.map((v) => ({
						attribute_id: id,
						values: v,
					})),
					{ transaction: t }
				);
			}
		}

		return attribute;
	});
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
