const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const vendorService = createBaseService(db.vendor, {
	name: 'Vendor',
	checkDuplicateSlug: false,
	formatCreateData: (data) => ({
		name: data.name,
		address: data.address,
		country: data.country,
		phone: data.phone,
		contact_person: data.contact_person,
		email: data.email,
		status: data.status,
	}),
	formatUpdateData: (data) => {
		const toUpdate = {};
		if (data.name) toUpdate.name = data.name;
		if (data.address) toUpdate.address = data.address;
		if (data.country) toUpdate.country = data.country;
		if (data.contact_person) toUpdate.contact_person = data.contact_person;
		if (data.phone) toUpdate.phone = data.phone;
		if (data.email) toUpdate.email = data.email;
		if (data.status !== undefined) toUpdate.status = data.status;

		return toUpdate;
	},
});

// Using userId logic from request
async function createVendor(req) {
	const userId = commonUtils.getUserId(req);
	return vendorService.create(req.body, userId);
}

async function updateVendor(req) {
	const userId = commonUtils.getUserId(req);
	return vendorService.update(req.params.vendorId, req.body, userId);
}

async function softDeleteVendorById(req) {
	const userId = commonUtils.getUserId(req);
	return vendorService.softDelete(req.params.vendorId, userId);
}

module.exports = {
	getVendorById: vendorService.getById,
	createVendor,
	updateVendor,
	getVendors: (req) =>
		vendorService.list(req, [], [], [['created_at', 'ASC']]),
	permanentDeleteVendorById: vendorService.permanentDelete,
	softDeleteVendorById,
};
