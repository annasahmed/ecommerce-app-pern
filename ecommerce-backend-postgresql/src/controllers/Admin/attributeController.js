const catchAsync = require('../../utils/catchAsync');
const { adminAttributeService } = require('../../services/Admin');

const getAttributeById = catchAsync(async (req, res) => {
	const attribute = await adminAttributeService.getAttributeById(
		req.params.attributeId
	);
	res.send(attribute);
});
const getAttributes = catchAsync(async (req, res) => {
	// const attributes = await adminAttributeService.verifyAttributeValues();
	const attributes = await adminAttributeService.getAttributes(req);
	res.send(attributes);
});
const createAttribute = catchAsync(async (req, res) => {
	const attributes = await adminAttributeService.createAttribute(req);
	res.send(attributes);
});
const importAttributes = catchAsync(async (req, res) => {
	adminAttributeService.importAttributes(req);
	res.send({ message: 'importing in progress' });
});

const softDeleteAttribute = catchAsync(async (req, res) => {
	await adminAttributeService.softDeleteAttributeById(req);
	res.send({ success: true });
});
const permanentDeleteAttribute = catchAsync(async (req, res) => {
	await adminAttributeService.permanentDeleteAttributeById(
		req.params.attributeId
	);
	res.send({ success: true });
});

const updateAttribute = catchAsync(async (req, res) => {
	const attribute = await adminAttributeService.updateAttribute(req);

	res.send(attribute);
});

module.exports = {
	getAttributeById,
	getAttributes,
	createAttribute,
	softDeleteAttribute,
	permanentDeleteAttribute,
	updateAttribute,
	importAttributes,
};
