const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');
const { Op, where, fn, col } = require('sequelize');

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

	includes: [
		{
			model: db.vendor_translation,
			attribute: ['title'],
			as: 'translations',
			required: false,
		},
	],
	translationModel: db.vendor_translation,
	translationForeignKey: 'vendor_id',
});

// Using userId logic from request
async function createVendor(req) {
	const userId = commonUtils.getUserId(req);
	return vendorService.create(req.body, userId);
}

async function importVendors(req) {
	const vendorsData = require('../../data/vendors.json');
	for (const vendor of vendorsData) {
		req.body = vendor;
		await createVendor(req);
	}
}

async function updateVendor(req) {
	const userId = commonUtils.getUserId(req);
	return vendorService.update(req.params.vendorId, req.body, userId);
}

async function softDeleteVendorById(req) {
	const userId = commonUtils.getUserId(req);
	return vendorService.softDelete(req.params.vendorId, userId);
}

async function verifyVendorsExist(vendorNames = vendorNameList, lang = 'en') {
	if (!Array.isArray(vendorNames) || vendorNames.length === 0) {
		return {
			existing: [],
			missing: [],
		};
	}

	// Normalize input (trim + lowercase)
	const normalizedNames = vendorNames.map((v) => v.trim().toLowerCase());

	const vendors = await db.vendor.findAll({
		attributes: ['id', 'name'],
		where: {
			[Op.or]: normalizedNames.map((name) =>
				db.Sequelize.where(
					db.Sequelize.fn(
						'LOWER',
						db.Sequelize.literal(`name ->> '${lang}'`)
					),
					name
				)
			),
		},
	});

	const existingNames = vendors.map((v) => v.name?.[lang]?.toLowerCase());

	const missing = normalizedNames.filter(
		(name) => !existingNames.includes(name)
	);

	return {
		existing: vendors,
		missing,
	};
}

module.exports = {
	getVendorById: vendorService.getById,
	createVendor,
	updateVendor,
	getVendors: (req) => vendorService.list(req, [], [], [['id', 'DESC']]),
	permanentDeleteVendorById: vendorService.permanentDelete,
	softDeleteVendorById,
	importVendors,
	verifyVendorsExist,
};

const vendorNameList = [
	'Kidzo',
	'Kidzo',
	'Kidzo',
	'Kidzo',
	'Kidzo',
	'Kidzo',
	'Kidzo',
	'Kidzo',
	'Kidzo',
	'Montaly',
	'Montaly',
	'Montaly',
	'Mami Baby',
	'Mami Baby',
	'Mami Baby',
	'Mami Baby',
	'Mami Baby',
	'Winnie Care',
	'Little Home',
	'Little Home',
	'Little Home',
	'Little Home',
	'Little Home',
	'Winnie Care',
	'Winnie Care',
	'Winnie Care',
	'Winnie Care',
	'Little Home',
	'Little Home',
	'Little Home',
	'Little Home',
	'Mums World',
	'Mums World',
	'Mums World',
	'Mums World',
	'Mums World',
	'Mums World',
	'kidzo',
	'Nannanqin',
	'Nannanqin',
	'Kidzo',
	'Kidzo',
	'Kidzo',
	'Kidzo',
	'Nexton',
	'Nexton',
	'Nexton',
	'Nexton',
	'Nexton',
	'Nexton',
	'Nexton',
	'Nexton',
	'Nexton',
	'Nexton',
	'Nexton',
	'Nexton',
	'Nexton',
	'Nexton',
	'Pampars',
	'Nexton',
	'Nexton',
	'Nexton',
	'Johnson',
	'Johnson',
	'Johnson',
	'Pigeon',
	'Nexton',
	'Nexton',
	'Nexton',
	'Dr.Rasheel',
	'Dr.Rasheel',
	'Dr.Rasheel',
	'Dr.Rasheel',
	'Nexton',
	'Nexton',
	'Farlin',
	'Farlin',
	'Hercules Bear',
	'Hercules Bear',
	'Flower Baby',
	'Flower Baby',
	'Flower Baby',
	'Hercules Bear',
	'Flower Baby',
	'Flower Baby',
	'Only Baby',
	'Only Baby',
	'Only Baby',
	'Only Baby',
	'Smart Baby',
	'Smart Baby',
	'Minitree',
	'Minitree',
	'Minitree',
	'Maq',
	'Maq',
	'Smart Baby',
	'Maq',
];
