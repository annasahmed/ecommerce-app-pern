const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');

const productService = createBaseService(db.product, {
	name: 'Product',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({}),
	formatUpdateData: (data) => {},
	includes: [
		{ model: db.media, required: false, as: 'thumbnailImage' },
		{ model: db.media, required: false, as: 'images' },
		{ model: db.category, required: false },
		{ model: db.product_translation, required: false },
		{
			model: db.usp,
			required: false,
		},
		{ model: db.vendor, required: false },
		{
			model: db.product_variant,
			required: false,
			include: [
				{ model: db.media, required: false },
				{
					model: db.branch,
					required: false,
					through: {
						as: 'pvb',
					},
				},
			],
		},
	],
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
	const userId = commonUtils.getUserId(req);

	try {
		// Create main product
		const newProduct = await db.product.create(
			{ ...productData, user_id: userId },
			{
				transaction,
			}
		);

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
			const {
				branch_data = [],
				attribute_data = [],
				...variantData
			} = variant;

			const newVariant = await db.product_variant.create(
				{
					...variantData,
					product_id: newProduct.id,
				},
				{ transaction }
			);

			// Insert into product_variant_to_attribute for each attribute entry
			for (const entry of attribute_data) {
				await db.product_variant_to_attribute.create(
					{
						...entry,
						product_variant_id: newVariant.id,
					},
					{ transaction }
				);
			}
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
	const userId = commonUtils.getUserId(req);
	const productId = req.params.productId;

	try {
		// Fetch the product
		const product = await db.product.findByPk(productId, { transaction });
		if (!product) throw new Error('Product not found');

		// Update main product
		await product.update(
			{ ...productData, user_id: userId },
			{ transaction }
		);

		// Update translations: remove old, add new
		await db.product_translation.destroy({
			where: { product_id: product.id },
			transaction,
		});
		if (translations.length > 0) {
			const translationsWithProductId = translations.map((t) => ({
				...t,
				product_id: product.id,
			}));
			await db.product_translation.bulkCreate(translationsWithProductId, {
				transaction,
			});
		}

		// Update associations
		if (product.setCategories)
			await product.setCategories(categories, { transaction });
		if (product.setBranches)
			await product.setBranches(branches, { transaction });
		if (product.setUsps) await product.setUsps(usps, { transaction });
		if (product.setVendors)
			await product.setVendors(vendors, { transaction });

		// Handle variants
		// For simplicity, remove old variants and re-add (you can do smarter diffing later)
		const oldVariants = await db.product_variant.findAll({
			where: { product_id: product.id },
			transaction,
		});
		const oldVariantIds = oldVariants.map((v) => v.id);

		if (oldVariantIds.length > 0) {
			await db.product_variant_to_branch.destroy({
				where: { product_variant_id: oldVariantIds },
				transaction,
			});
			await db.product_variant_to_attribute.destroy({
				where: { product_variant_id: oldVariantIds },
				transaction,
			});
			await db.product_variant.destroy({
				where: { id: oldVariantIds },
				transaction,
			});
		}

		for (const variant of variants) {
			const {
				branch_data = [],
				attribute_data = [],
				...variantData
			} = variant;

			const newVariant = await db.product_variant.create(
				{
					...variantData,
					product_id: product.id,
				},
				{ transaction }
			);

			if (attribute_data.length > 0) {
				const attributeEntries = attribute_data.map((entry) => ({
					...entry,
					product_variant_id: newVariant.id,
				}));
				await db.product_variant_to_attribute.bulkCreate(
					attributeEntries,
					{
						transaction,
					}
				);
			}
			if (branch_data.length > 0) {
				const branchEntries = branch_data.map((entry) => ({
					...entry,
					product_variant_id: newVariant.id,
				}));
				await db.product_variant_to_branch.bulkCreate(branchEntries, {
					transaction,
				});
			}
		}

		await transaction.commit();
		return product;
	} catch (error) {
		await transaction.rollback();
		throw error;
	}
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
