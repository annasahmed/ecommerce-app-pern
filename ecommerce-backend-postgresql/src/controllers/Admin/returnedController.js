const catchAsync = require('../../utils/catchAsync');
const { adminReturnedService } = require('../../services/Admin');

const getReturnRequestById = catchAsync(async (req, res) => {
	const returned = await adminReturnedService.getReturnRequestById(req);
	res.send(returned);
});
const getReturnRequests = catchAsync(async (req, res) => {
	const returned = await adminReturnedService.getReturnRequests(req);
	res.send(returned);
});

// process requests
const approveReturn = catchAsync(async (req, res) => {
	const returned = await adminReturnedService.approveReturn(req);
	res.send(returned);
});
const rejectReturn = catchAsync(async (req, res) => {
	const returned = await adminReturnedService.rejectReturn(req);
	res.send(returned);
});
const markReturnReceived = catchAsync(async (req, res) => {
	const returned = await adminReturnedService.markReturnReceived(req);
	res.send(returned);
});
const processRefund = catchAsync(async (req, res) => {
	const returned = await adminReturnedService.processRefund(req);
	res.send(returned);
});

module.exports = {
	getReturnRequestById,
	getReturnRequests,
	approveReturn,
	rejectReturn,
	markReturnReceived,
	processRefund,
};
