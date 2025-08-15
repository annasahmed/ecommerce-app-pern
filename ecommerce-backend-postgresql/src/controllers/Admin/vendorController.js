const catchAsync = require('../../utils/catchAsync');
const { adminVendorService } = require('../../services/Admin');

const getVendorById = catchAsync(async (req, res) => {
	const vendor = await adminVendorService.getVendorById(req.params.vendorId);
	res.send(vendor);
});
const getVendors = catchAsync(async (req, res) => {
	const vendors = await adminVendorService.getVendors(req);
	res.send(vendors);
});
const createVendor = catchAsync(async (req, res) => {
	const vendors = await adminVendorService.createVendor(req);
	res.send(vendors);
});

const softDeleteVendor = catchAsync(async (req, res) => {
	await adminVendorService.softDeleteVendorById(req);
	res.send({ success: true });
});
const permanentDeleteVendor = catchAsync(async (req, res) => {
	await adminVendorService.permanentDeleteVendorById(req.params.vendorId);
	res.send({ success: true });
});

const updateVendor = catchAsync(async (req, res) => {
	const vendor = await adminVendorService.updateVendor(req);

	res.send(vendor);
});

module.exports = {
	getVendorById,
	getVendors,
	createVendor,
	softDeleteVendor,
	permanentDeleteVendor,
	updateVendor,
};
