const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const branchService = createBaseService(db.branch, {
	name: 'Branch',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({
		name: data.name,
		code: data.code,
		address: data.address,
		country: data.country,
		phone: data.phone,
		email: data.email,
		latitude: data.latitude,
		longitude: data.longitude,
		is_main_branch: data.isMainBranch,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.name) toUpdate.name = data.name;
		if (data.code) toUpdate.code = data.code;
		if (data.address) toUpdate.address = data.address;
		if (data.country) toUpdate.country = data.country;
		if (data.phone) toUpdate.phone = data.phone;
		if (data.email) toUpdate.email = data.email;
		if (data.latitude) toUpdate.latitude = data.latitude;
		if (data.longitude) toUpdate.longitude = data.longitude;
		if (data.isMainBranch !== undefined || data.isMainBranch !== null)
			toUpdate.is_main_branch = data.isMainBranch;

		return toUpdate;
	},
});

// Using userId logic from request
async function createBranch(req) {
	const userId = commonUtils.getUserId(req);
	return branchService.create(req.body, userId);
}

async function updateBranch(req) {
	const userId = commonUtils.getUserId(req);
	return branchService.update(req.params.branchId, req.body, userId);
}

async function softDeleteBranchById(req) {
	const userId = commonUtils.getUserId(req);
	return branchService.softDelete(req.params.branchId, userId);
}

module.exports = {
	getBranchById: branchService.getById,
	createBranch,
	updateBranch,
	getBranches: (req) =>
		branchService.list(req, [], [], [['created_at', 'ASC']]),
	permanentDeleteBranchById: branchService.permanentDelete,
	softDeleteBranchById,
};
