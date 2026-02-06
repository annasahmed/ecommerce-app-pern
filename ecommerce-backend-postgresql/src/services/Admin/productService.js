const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');
const { Op, where, fn, col } = require('sequelize');
const { createBrand } = require('./brandService.js');
const { createCategory } = require('./categoryService.js');

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
					attributes: ['id', 'name'],
				},
				// {
				// 	model: db.branch,
				// 	required: false,
				// 	through: {
				// 		as: 'pvb',
				// 	},
				// },
			],
		},
	],
});

// duplicate slug validation missing

// Using userId logic from request
async function createProduct(req, existingTransaction) {
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

	let transactionCreatedHere = false;
	const transaction =
		existingTransaction || (await db.sequelize.transaction());
	if (!existingTransaction) transactionCreatedHere = true;
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
						branch_id: 1,
					},
					{ transaction }
				);
			}
		}

		if (transactionCreatedHere) await transaction.commit();
		return newProduct;
	} catch (error) {
		if (transactionCreatedHere) await transaction.rollback();
		throw error;
	}
}

async function updateProduct(req, existingTransaction) {
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
	let transactionCreatedHere = false;
	const transaction =
		existingTransaction || (await db.sequelize.transaction());
	if (!existingTransaction) transactionCreatedHere = true;
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

		// await transaction.commit();
		if (transactionCreatedHere) await transaction.commit();
		return product;
	} catch (error) {
		// await transaction.rollback();
		if (transactionCreatedHere) await transaction.rollback();
		// throw err;
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
		// throw error;
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

const normalizeName = (str) => {
	if (!str) return '';

	return str
		.toLowerCase()
		.trim()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9\s]/g, '') // remove symbols
		.replace(/\b(s|es)\b$/g, '') // plural handling
		.replace(/\s+/g, ' '); // extra spaces
};

function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}

const resolveCategoryIds = async (
	categoryMap,
	categoryNames = [],
	transaction,
	createdCategories
) => {
	const ids = [];

	for (const name of categoryNames) {
		if (!name) continue;

		const normalized = normalizeName(name);
		let category = categoryMap.get(normalized);

		if (!category) {
			const created = await createCategory(
				{
					body: {
						status: true,
						translations: [
							{
								title: name,
								slug: slugify(name),
								language_id: 1,
							},
						],
					},
				},
				{ transaction }
			);

			const categoryId = created.category?.id || created.id;
			category = { id: categoryId };

			categoryMap.set(normalized, category);
			createdCategories.push(categoryId);
		}

		ids.push(category.id);
	}

	return ids;
};

const resolveBrandId = async (
	brandMap,
	brandName,
	transaction,
	createdBrands
) => {
	if (!brandName) return null;

	const normalized = normalizeName(brandName);
	let brand = brandMap.get(normalized);

	if (!brand) {
		const created = await createBrand(
			{
				body: {
					status: true,
					translations: [
						{
							title: brandName,
							slug: slugify(brandName),
							language_id: 1,
						},
					],
				},
			},
			{ transaction }
		);

		const brandId = created.brand?.id || created.id;
		brand = { id: brandId };

		brandMap.set(normalized, brand);
		createdBrands.push(brandId);
	}

	return brand.id;
};

async function importProductsFromSheet(req) {
	const { products } = req.body;

	const createdCategories = [];
	const createdBrands = [];
	const createdProducts = [];
	const updatedProducts = [];

	const categories = await db.category_translation.findAll({
		attributes: ['category_id', 'title'],
	});

	const brands = await db.brand_translation.findAll({
		attributes: ['brand_id', 'title'],
	});

	const categoryMap = new Map();
	const brandMap = new Map();

	categories.forEach((c) => {
		categoryMap.set(normalizeName(c.title), {
			id: c.category_id,
		});
	});

	brands.forEach((b) => {
		brandMap.set(normalizeName(b.title), {
			id: b.brand_id,
		});
	});
	const existingProducts = await db.product.findAll({
		include: [
			{
				model: db.product_translation,
				// as: 'translations',
				attributes: ['title', 'slug'],
			},
		],
	});

	const skuMap = new Map();
	const titleSlugMap = new Map();

	existingProducts.forEach((p) => {
		skuMap.set(p.sku, p);

		p.product_translations.forEach((t) => {
			titleSlugMap.set(t.title.toLowerCase(), p);
			titleSlugMap.set(t.slug.toLowerCase(), p);
		});
	});
	const transaction = await db.sequelize.transaction();

	try {
		for (const product of products) {
			// 🔹 Resolve categories & brand FIRST
			const categoryNames = product.categories || [];
			const brandName = product.brand_name || null;
			// console.log(product, 'product111');

			continue;

			const categoryIds = await resolveCategoryIds(
				categoryMap,
				categoryNames,
				transaction,
				createdCategories
			);

			const brandId = await resolveBrandId(
				brandMap,
				brandName,
				transaction,
				createdBrands
			);
			product.categories = categoryIds;
			product.brand_id = brandId;

			// 🔹 Find existing product
			let existingProduct =
				skuMap.get(product.sku) ||
				titleSlugMap.get(
					product.translations?.[0]?.title?.toLowerCase()
				) ||
				titleSlugMap.get(
					product.translations?.[0]?.slug?.toLowerCase()
				);

			if (existingProduct) {
				await updateProduct(
					{
						params: { productId: existingProduct.id },
						body: product,
					},
					transaction
				);

				updatedProducts.push(existingProduct.id);
			} else {
				const created = await createProduct(
					{ body: product },
					transaction
				);

				createdProducts.push(created.id);
			}
		}

		await transaction.commit();

		return {
			createdCategories,
			createdBrands,
			createdProducts,
			updatedProducts,
		};
	} catch (error) {
		await transaction.rollback();
		// throw error.message || error;
	}
}

module.exports = {
	getProductById: productService.getById,
	createProduct,
	updateProduct,
	getProducts: (req) => productService.list(req, [], [], [['id', 'DESC']]),
	permanentDeleteProductById: productService.permanentDelete,
	softDeleteProductById,
	updateProductCategoriesBySku,
	importProductsFromSheet,
};
