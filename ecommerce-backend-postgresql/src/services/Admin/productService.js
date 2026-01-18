const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');
const { Op, where, fn, col } = require('sequelize');

const productService = createBaseService(db.product, {
	name: 'Product',
	checkDuplicateSlug: true,
	formatCreateData: (data) => ({}),
	formatUpdateData: (data) => {},
	includes: [
		{ model: db.media, required: false, as: 'thumbnailImage' },
		{ model: db.media, required: false, as: 'images' },
		{
			model: db.category,
			required: false,
			include: [
				{
					model: db.category_translation,
					as: 'translations',
					required: false,
					attributes: {
						exclude: [
							'created_at',
							'updated_at',
							'category_id',
							'language_id',
							'id',
						],
					},
				},
			],
		},
		{ model: db.product_translation, required: false },
		{
			model: db.usp,
			required: false,
			include: [
				{
					model: db.usp_translation,
					as: 'translations',
					required: false,
					attributes: {
						exclude: [
							'created_at',
							'updated_at',
							'usp_id',
							'language_id',
							'id',
						],
					},
				},
			],
		},
		{
			model: db.brand,
			required: false,
			include: [
				{
					model: db.brand_translation,
					as: 'translations',
					required: false,
					attributes: {
						exclude: [
							'created_at',
							'updated_at',
							'brand_id',
							'language_id',
							'id',
						],
					},
				},
			],
		},
		{ model: db.vendor, required: false },
		{
			model: db.product_variant,
			required: false,
			include: [
				{ model: db.media, required: false },
				{
					model: db.attribute,
					required: false,
					through: {
						as: 'pva',
					},
				},
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
		images = [],
		attribute_data = [],
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
		if (images.length > 0) {
			const createdImages = await newProduct.setImages(images, {
				transaction,
			});
		}

		// attributes
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
		images = [],
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

		if (translations.length > 0) {
			// Update translations: remove old, add new
			await db.product_translation.destroy({
				where: { product_id: product.id },
				transaction,
			});
			const translationsWithProductId = translations.map((t) => ({
				...t,
				product_id: product.id,
			}));
			await db.product_translation.bulkCreate(translationsWithProductId, {
				transaction,
			});
		}

		// Update associations
		console.log(categories, product.setCategories, 'chkking categories');
		if (images?.length) await product.setImages(images, { transaction });
		if (categories?.length)
			await product.setCategories(categories, { transaction });
		if (branches?.length)
			await product.setBranches(branches, { transaction });
		if (usps?.length) await product.setUsps(usps, { transaction });
		if (vendors?.length) await product.setVendors(vendors, { transaction });

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

// for import only

// vendors and variants
async function updateProductBySlugVendorsAndVariants(req) {
	const { sku, vendor, variants = [] } = req.body;

	// if (!sku || !description) {
	// 	throw new Error('sku and description are required');
	// }

	const transaction = await db.sequelize.transaction();

	try {
		const product = await db.product.findOne({
			where: { sku },
			transaction,
		});

		if (!product) {
			missing.push(sku);
			await transaction.rollback();
			return null;
		}

		console.log('updating sku', sku);

		if (vendor && vendor.length > 0) {
			const vendorName = await db.vendor.findOne({
				attributes: ['id', 'name'],
				where: db.Sequelize.where(
					db.Sequelize.fn(
						'LOWER',
						db.Sequelize.literal(`name ->> '${'en'}'`)
					),
					vendor.toLowerCase() // <-- the value you are searching
				),
			});

			if (vendorName) {
				await product.setVendors([vendorName.id], { transaction });
			}
		}
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
					branch_id: 1,
					cost_price: product.base_price,
					stock: 100,
					low_stock: 100,
					reorder_quantity: 100,
					sale_price: product.base_price,
					discount_percentage: product.base_discount_percentage,
					product_variant_id: newVariant.id,
				}));
				await db.product_variant_to_branch.bulkCreate(branchEntries, {
					transaction,
				});
			}
		}

		console.log('updating complete sku', sku);
		updated.push(sku);

		await transaction.commit();
		console.log(
			updated,
			missing,
			updated.length,
			missing.length,
			'final update'
		);

		// return updated;
	} catch (error) {
		await transaction.rollback();
		throw error;
	}
}

// only tranlsations
async function updateProductBySlug(req) {
	const { sku, title, slug, excerpt, description } = req.body;

	// if (!sku || !description) {
	// 	throw new Error('sku and description are required');
	// }

	const transaction = await db.sequelize.transaction();

	try {
		const product = await db.product.findOne({
			where: { sku },
			include: [
				{
					model: db.product_translation,
					required: false,
				},
			],
			transaction,
		});

		if (!product) {
			missing.push(sku);
			await transaction.rollback();
			return null;
		}
		if (product.product_translations.length === 0) {
			console.log('updating sku', sku);
			const translationsWithProductId = [
				{
					title,
					slug,
					excerpt,
					description,
					language_id: 1,
				},
			].map((t) => ({
				...t,
				product_id: product.id,
			}));
			await db.product_translation.bulkCreate(translationsWithProductId, {
				transaction,
			});
			console.log('updating complete sku', sku);
			updated.push(sku);
		}

		await transaction.commit();
		console.log(
			updated,
			missing,
			updated.length,
			missing.length,
			'final update'
		);

		// return updated;
	} catch (error) {
		await transaction.rollback();
		throw error;
	}
}

async function updateProductCategoriesBySku(req) {
	const updated = [];
	const missing = [];

	const { sku, categories = [] } = req.body;

	const transaction = await db.sequelize.transaction();

	try {
		const product = await db.product.findOne({
			where: { sku },
			transaction,
		});

		if (!product) {
			missing.push(sku);
			await transaction.rollback();
			return { updated, missing };
		}
		console.log('updating categories for sku', sku);
		if (Array.isArray(categories) && categories.length > 0) {
			// normalize + dedupe remove duplicates
			const normalizedCategories = [
				...new Set(categories.map((c) => c.trim().toLowerCase())),
			];

			const cats = await db.category_translation.findAll({
				attributes: ['category_id'],
				where: {
					language_id: 1,
					[Op.and]: [
						where(fn('LOWER', col('title')), {
							[Op.in]: normalizedCategories,
						}),
					],
				},
				raw: true,
			});

			const categoryIds = cats.map((c) => c.category_id);

			// IMPORTANT: pass IDs, not translations
			await product.setCategories(categoryIds, { transaction });
			console.log('updated categories for sku', sku);
		}

		await transaction.commit();
		updated.push(sku);

		return {
			updated,
			missing,
		};
	} catch (error) {
		await transaction.rollback();
		throw error;
	}
}

module.exports = {
	getProductById: productService.getById,
	createProduct,
	updateProduct,
	getProducts: (req) =>
		productService.list(req, [], [], [['created_at', 'ASC']]),
	permanentDeleteProductById: productService.permanentDelete,
	softDeleteProductById,
	updateProductCategoriesBySku,
};
