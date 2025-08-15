const catchAsync = require('../../utils/catchAsync');
const { adminUspService } = require('../../services/Admin');

const getUspById = catchAsync(async (req, res) => {
	const usp = await adminUspService.getUspById(req.params.uspId);
	res.send(usp);
});
const getUsps = catchAsync(async (req, res) => {
	const usps = await adminUspService.getUsps(req);
	res.send(usps);
});
const createUsp = catchAsync(async (req, res) => {
	const usps = await adminUspService.createUsp(req);
	res.send(usps);
});

const softDeleteUsp = catchAsync(async (req, res) => {
	await adminUspService.softDeleteUspById(req);
	res.send({ success: true });
});
const permanentDeleteUsp = catchAsync(async (req, res) => {
	await adminUspService.permanentDeleteUspById(req.params.uspId);
	res.send({ success: true });
});

const updateUsp = catchAsync(async (req, res) => {
	const usp = await adminUspService.updateUsp(req);

	res.send(usp);
});

module.exports = {
	getUspById,
	getUsps,
	createUsp,
	softDeleteUsp,
	permanentDeleteUsp,
	updateUsp,
};
