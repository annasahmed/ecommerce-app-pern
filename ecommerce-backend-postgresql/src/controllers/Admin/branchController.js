const catchAsync = require('../../utils/catchAsync');
const { adminBranchService } = require('../../services/Admin');

const getBranchById = catchAsync(async (req, res) => {
	const branch = await adminBranchService.getBranchById(req.params.branchId);
	res.send(branch);
});
const getBranches = catchAsync(async (req, res) => {
	const branches = await adminBranchService.getBranches(req);
	res.send(branches);
});
const createBranch = catchAsync(async (req, res) => {
	const branches = await adminBranchService.createBranch(req);
	res.send(branches);
});

const softDeleteBranch = catchAsync(async (req, res) => {
	await adminBranchService.softDeleteBranchById(req.params.branchId);
	res.send({ success: true });
});
const permanentDeleteBranch = catchAsync(async (req, res) => {
	await adminBranchService.permanentDeleteBranchById(req.params.branchId);
	res.send({ success: true });
});

const updateBranch = catchAsync(async (req, res) => {
	const branch = await adminBranchService.updateBranch(req);

	res.send(branch);
});

module.exports = {
	getBranchById,
	getBranches,
	createBranch,
	softDeleteBranch,
	permanentDeleteBranch,
	updateBranch,
};
