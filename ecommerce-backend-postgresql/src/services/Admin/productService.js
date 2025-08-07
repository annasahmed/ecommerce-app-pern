const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const productService = createBaseService(db.product, {
	name: 'Product',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({
		sku: data.sku,
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
async function createProduct(req) {
	const userId = commonUtils.getUserId(req);
	return productService.create(req.body, userId);
}

async function updateProduct(req) {
	const userId = commonUtils.getUserId(req);
	return productService.update(req.params.productId, req.body, userId);
}

async function softDeleteProductById(req) {
	const userId = commonUtils.getUserId(req);
	return productService.softDelete(req.params.productId, userId);
}

module.exports = {
	getProductById: productService.getById,
	createProduct,
	updateProduct,
	getProducts: (req) =>
		productService.list(req, [], [], [['created_at', 'ASC']]),
	permanentDeleteProductById: productService.permanentDelete,
	softDeleteProductById,
};
