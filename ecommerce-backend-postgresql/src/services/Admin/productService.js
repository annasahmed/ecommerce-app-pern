const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');
const { Op, where, fn, col } = require('sequelize');
const { createBrand } = require('./brandService.js');
const { createCategory } = require('./categoryService.js');
const ExcelJS = require('exceljs');
const cheerio = require('cheerio');
const { getFilterAttributes } = require('./attributeService.js');
const ApiError = require('../../utils/ApiError.js');
const httpStatus = require('http-status');

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

async function getProductTitlesOnly(req) {
	return await db.product_translation.findAll({
		attributes: ['product_id', 'title'],
	});
}

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
		similarProducts = [],
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

		if (similarProducts.length > 0) {
			const bulkData = [];

			for (const sim of similarProducts) {
				const similarId = typeof sim === 'object' ? sim.id : sim;
				if (similarId === newProduct.id) continue;

				// Both directions
				bulkData.push({
					product_id: newProduct.id,
					similar_product_id: similarId,
				});
				bulkData.push({
					product_id: similarId,
					similar_product_id: newProduct.id,
				});
			}

			await db.similar_product.bulkCreate(bulkData, {
				ignoreDuplicates: true,
				transaction,
			});
		}

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
		similarProducts = [],
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
		if (images?.length) await product.setImages(images, { transaction });
		if (categories?.length)
			await product.setCategories(categories, { transaction });
		if (branches?.length)
			await product.setBranches(branches, { transaction });
		if (usps?.length) await product.setUsps(usps, { transaction });
		if (vendors?.length) await product.setVendors(vendors, { transaction });

		// handle similar products
		// 2️⃣ Update similar products
		console.log(similarProducts);

		if (similarProducts.length > 0) {
			const bulkData = [];

			for (const sim of similarProducts) {
				const similarId = typeof sim === 'object' ? sim.id : sim;
				if (similarId === productId) continue; // skip self

				// Both directions
				bulkData.push({
					product_id: productId,
					similar_product_id: similarId,
				});
				bulkData.push({
					product_id: similarId,
					similar_product_id: productId,
				});
			}

			// Delete old similar products for this product (both directions)
			await db.similar_product.destroy({
				where: {
					[Op.or]: [
						{ product_id: productId },
						{ similar_product_id: productId },
					],
				},
				transaction,
			});

			console.log(bulkData);

			// Insert new similar products
			if (bulkData.length) {
				await db.similar_product.bulkCreate(bulkData, {
					ignoreDuplicates: true,
					transaction,
				});
			}
		} else {
			// If similarProducts is empty, remove all old similar products
			// await db.similar_product.destroy({
			// 	where: {
			// 		[Op.or]: [
			// 			{ product_id: productId },
			// 			{ similar_product_id: productId },
			// 		],
			// 	},
			// 	transaction,
			// });
		}

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
	const errorProducts = [];

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
			const brandName = product.brand_id || null;
			// console.log(product, 'product111');

			// continue;

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
				skuMap.set(product.sku, product);
				titleSlugMap.set(
					product.translations?.[0]?.title?.toLowerCase(),
					product
				);
				titleSlugMap.set(
					product.translations?.[0]?.slug?.toLowerCase(),
					product
				);
				updatedProducts.push(existingProduct.id);
			} else {
				const created = await createProduct(
					{ body: product },
					transaction
				);
				skuMap.set(product.sku, product);
				titleSlugMap.set(
					product.translations?.[0]?.title?.toLowerCase(),
					product
				);
				titleSlugMap.set(
					product.translations?.[0]?.slug?.toLowerCase(),
					product
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
		if (error.name === 'SequelizeUniqueConstraintError') {
			console.log('UNIQUE CONSTRAINT ERROR');

			console.log(
				error.errors.map((e) => ({
					field: e.path,
					value: e.value,
					message: e.message,
				}))
			);

			console.log('DB fields:', error.fields);
		} else {
			console.log(error);
		}

		await transaction.rollback();
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
}

const excelFeilds = {
	sku: 'SKU',
	title: 'Title',
	excerpt: 'Excerpt',
	description: 'Description',
	slug: 'Slug',
	meta_title: 'Meta Title',
	meta_description: 'Meta_Description',
	categories: 'Categories',
	brand: 'Brand',
	size: 'VariantsSize',
	color: 'Variants Color',
	gender: 'Gender',
	additionalInfo: 'Additional info',
	price: 'Price',
	discount: 'Discount',
};
function splitDescription(html) {
	if (!html) return { description: '', additionalInfo: '' };

	// Decode HTML entities
	const decodedHtml = html
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/\\u003E/g, '>');

	const $ = cheerio.load(decodedHtml);

	// Description: all <p> text before any <ul>
	let descriptionTexts = [];
	$('p').each((i, el) => {
		const pText = $(el).text().trim();
		if (pText) descriptionTexts.push(pText);
	});

	// Additional info: all <li> items
	let additionalInfoTexts = [];
	$('ul li').each((i, el) => {
		const liText = $(el).text().trim();
		if (liText) additionalInfoTexts.push('• ' + liText);
	});

	return {
		description: descriptionTexts.join('\n'),
		additionalInfo: additionalInfoTexts.join('\n'),
	};
}
async function exportProducts(req, res) {
	const filterAttributes = await getFilterAttributes();
	try {
		const products = await db.product.findAll({
			include: [
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
			// limit: 10,
		});
		const workbook = new ExcelJS.Workbook();
		const sheet = workbook.addWorksheet('Products');

		sheet.columns = sheet.columns = [
			{ header: 'S.No', key: 'sno', width: 6 },
			{ header: excelFeilds.sku, key: excelFeilds.sku, width: 20 },
			{ header: excelFeilds.title, key: excelFeilds.title, width: 30 },
			{
				header: excelFeilds.excerpt,
				key: excelFeilds.excerpt,
				width: 30,
			},
			{
				header: excelFeilds.description,
				key: excelFeilds.description,
				width: 50,
			},
			{ header: excelFeilds.slug, key: excelFeilds.slug, width: 25 },
			{
				header: excelFeilds.meta_title,
				key: excelFeilds.meta_title,
				width: 25,
			},
			{
				header: excelFeilds.meta_description,
				key: excelFeilds.meta_description,
				width: 35,
			},
			{
				header: excelFeilds.categories,
				key: excelFeilds.categories,
				width: 25,
			},
			{ header: excelFeilds.brand, key: excelFeilds.brand, width: 20 },
			{ header: excelFeilds.size, key: excelFeilds.size, width: 10 },
			{ header: excelFeilds.color, key: excelFeilds.color, width: 10 },
			{ header: excelFeilds.gender, key: excelFeilds.gender, width: 10 },
			{
				header: excelFeilds.additionalInfo,
				key: excelFeilds.additionalInfo,
				width: 50,
			},
			{ header: excelFeilds.price, key: excelFeilds.price, width: 12 },
			{
				header: excelFeilds.discount,
				key: excelFeilds.discount,
				width: 12,
			},
		];
		// const workbook = new ExcelJS.Workbook();
		// const worksheet = workbook.addWorksheet('Products');

		// Map products to Excel rows using excelFeilds keys
		products.forEach((p, index) => {
			const translation = p.product_translations?.[0] || {};
			const brandName = p.brand?.translations?.[0]?.title || '';
			const categoryNames =
				p.categories
					?.map((c) => c.translations?.[0]?.title || '')
					.filter(Boolean) || [];

			// Attributes from first variant
			const variant = p.product_variants?.[0] || {};
			const color =
				variant.attributes?.find(
					(a) =>
						a.id ===
							filterAttributes.find((v) => v.name?.en === 'color')
								?.id || 7
				)?.pva?.value?.en || '';
			const gender =
				variant.attributes?.find(
					(a) =>
						a.id ===
							filterAttributes.find(
								(v) => v.name?.en === 'gender'
							)?.id || 5
				)?.pva?.value?.en || '';
			const size =
				variant.attributes?.find(
					(a) =>
						a.id ===
							filterAttributes.find((v) => v.name?.en === 'size')
								?.id || 4
				)?.pva?.value?.en || '';

			// Additional info (from USP)
			// const additionalInfo =
			// 	p.usps
			// 		?.map((u) => u.translations?.[0]?.title || '')
			// 		.join('\n') || '';

			const { description, additionalInfo } = splitDescription(
				translation.description
			);

			sheet.addRow({
				sno: index + 1, // Add S.No
				[excelFeilds.sku]: p.sku,
				[excelFeilds.title]: translation.title || '',
				[excelFeilds.excerpt]: translation.excerpt || '',
				[excelFeilds.description]: description,
				[excelFeilds.slug]: translation.slug || '',
				[excelFeilds.meta_title]: p.meta_title || '',
				[excelFeilds.meta_description]: p.meta_description || '',
				[excelFeilds.categories]: categoryNames.join(', '),
				[excelFeilds.brand]: brandName,
				[excelFeilds.size]: size,
				[excelFeilds.color]: color,
				[excelFeilds.gender]: gender,
				[excelFeilds.additionalInfo]: additionalInfo,
				[excelFeilds.price]: p.base_price || 0,
				[excelFeilds.discount]: p.base_discount_percentage || 0,
			});
			// Style headers
			sheet.getRow(1).eachCell((cell) => {
				cell.font = { bold: true, size: 14 };
				cell.alignment = {
					wrapText: true,
					vertical: 'top',
					horizontal: 'left',
				};
				cell.border = {
					top: { style: 'thin' },
					left: { style: 'thin' },
					bottom: { style: 'thin' },
					right: { style: 'thin' },
				};
			});

			// Style all other cells for wrapText
			sheet.eachRow((row, rowNumber) => {
				if (rowNumber === 1) return; // skip header
				row.eachCell((cell) => {
					cell.alignment = {
						wrapText: true,
						vertical: 'top',
						horizontal: 'left',
					};
					cell.border = {
						top: { style: 'thin' },
						left: { style: 'thin' },
						bottom: { style: 'thin' },
						right: { style: 'thin' },
					};
				});
			});
		});

		// // return rows;

		// // Create a new workbook and sheet
		// const wb = XLSX.utils.book_new();
		// const ws = XLSX.utils.json_to_sheet(rows, { origin: 'A2' }); // leave row 1 for headers styling

		// // Add headers manually (for bold)
		// const headers = ['S.No', ...Object.values(excelFeilds)];
		// XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' });

		// // Apply styling: wrap text
		// const range = XLSX.utils.decode_range(ws['!ref']);
		// for (let R = range.s.r; R <= range.e.r; ++R) {
		// 	for (let C = range.s.c; C <= range.e.c; ++C) {
		// 		const cellAddress = { r: R, c: C };
		// 		const cellRef = XLSX.utils.encode_cell(cellAddress);
		// 		if (!ws[cellRef]) continue;

		// 		ws[cellRef].s = {
		// 			alignment: {
		// 				wrapText: true,
		// 				vertical: 'top',
		// 				horizontal: 'left',
		// 			},
		// 			font: R === 0 ? { bold: true } : {}, // Bold headers
		// 		};
		// 	}
		// }

		// XLSX.utils.book_append_sheet(wb, ws, 'Products');

		// Generate buffer
		const buffer = await workbook.xlsx.writeBuffer();
		// return buffer;
		// 📤 SEND FILE
		res.setHeader(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		);
		res.setHeader(
			'Content-Disposition',
			`attachment; filename="products_export_${Date.now()}.xlsx"`
		);

		return res.send(buffer);
		res.end();
	} catch (error) {
		console.error('EXPORT PRODUCTS ERROR:', error);
		// throw new ApiError(
		// 	httpStatus.INTERNAL_SERVER_ERROR,
		// 	error.message || 'Error exporting products'
		// );
	}
}

function getProductIncludes(req) {
	return [
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
		{
			model: db.product_translation,
			required: req.query.search ? true : false,
			where: req.query.search
				? {
						title: {
							[Op.iLike]: `%${req.query.search}%`,
						},
				  }
				: {},
		},
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
	];
}

async function fixThumbnailsProducts(req) {
	const products = await db.product.findAll({
		include: [
			{ model: db.media, required: false, as: 'thumbnailImage' },
			{ model: db.media, required: false, as: 'images' },
		],
	});

	for (const product of products) {
		if (!product.images || product.images.length === 0) continue;

		// skip if thumbnail already exists
		if (product.thumbnail) continue;

		const rawImages = product.images.map((v) => v.get({ plain: true }));
		const firstImage = rawImages[0];

		const transaction = await db.sequelize.transaction();

		try {
			// remove image from gallery
			await db.product_to_media.destroy(
				{
					where: {
						product_id: product.id,
						media_id: firstImage.id,
					},
				},
				{ transaction }
			);

			// set thumbnail
			await db.product.update(
				{ thumbnail: firstImage.id },
				{
					where: { id: product.id },
					transaction,
				}
			);

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			console.error(`Failed for product ${product.id}`, error);
		}
	}
}

module.exports = {
	getProductById: productService.getById,
	createProduct,
	updateProduct,
	getProducts: (req) =>
		productService.list(
			req,
			getProductIncludes(req),
			[],
			[['id', 'DESC']],
			true
		),
	permanentDeleteProductById: productService.permanentDelete,
	softDeleteProductById,
	updateProductCategoriesBySku,
	importProductsFromSheet,
	exportProducts,
	fixThumbnailsProducts,
	getProductTitlesOnly,
};
