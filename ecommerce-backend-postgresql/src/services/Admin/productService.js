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

// duplicate slug validation missing

// Using userId logic from request
async function createProduct(req) {
	const {
		categories = [],
		branches = [],
		usps = [],
		vendors = [],
		translations = [],
		variants = [],
		...productData
	} = req.body;

	const transaction = await db.sequelize.transaction();

	try {
		// Create main product
		const newProduct = await db.product.create(productData, {
			transaction,
		});

		// Create translations
		if (translations.length > 0) {
			const translationsWithProductId = translations.map((t) => ({
				...t,
				product_id: newProduct.id,
			}));
			await db.product_translation.bulkCreate(translationsWithProductId, {
				transaction,
			});
		}

		// Product associations
		if (categories.length > 0)
			await newProduct.setCategories(categories, { transaction });
		if (branches.length > 0)
			await newProduct.setBranches(branches, { transaction });
		if (usps.length > 0) await newProduct.setUsps(usps, { transaction });
		if (vendors.length > 0 && newProduct.setVendors)
			await newProduct.setVendors(vendors, { transaction });

		// Product variants with branch data
		for (const variant of variants) {
			const { branch_data = [], ...variantData } = variant;

			const newVariant = await db.product_variant.create(
				{
					...variantData,
					product_id: newProduct.id,
				},
				{ transaction }
			);

			// Insert into product_variant_to_branch for each branch entry
			for (const entry of branch_data) {
				await db.product_variant_to_branch.create(
					{
						...entry,
						product_variant_id: newVariant.id,
					},
					{ transaction }
				);
			}
		}

		await transaction.commit();
		return newProduct;
	} catch (error) {
		await transaction.rollback();
		throw error;
	}
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
