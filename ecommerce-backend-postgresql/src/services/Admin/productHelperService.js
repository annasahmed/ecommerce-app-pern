// used this service only once, no further required
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

		updated.push(sku);

		await transaction.commit();
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
			updated.push(sku);
		}

		await transaction.commit();
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

async function updateAllInventories() {
	const transaction = await db.sequelize.transaction();

	try {
		const [updatedCount] = await db.product_variant_to_branch.update(
			{
				stock: 100,
				low_stock: 10,
				reorder_quantity: 100,
			},
			{
				where: {}, // ⚠ updates ALL rows
				transaction,
			}
		);

		await transaction.commit();

		return {
			success: true,
			message: `${updatedCount} inventory records updated successfully`,
		};
	} catch (error) {
		await transaction.rollback();
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			error.message || 'Error updating inventories'
		);
	}
}

async function removeInvalidAttributesValues() {
	const deletedCount = await db.product_variant_to_attribute.destroy({
		where: literal(`value->>'en' = '-'`),
	});

	return deletedCount;
}
async function deleteAllProductsPermanently(req) {
	const transaction = await db.sequelize.transaction();

	try {
		await db.product_translation.destroy({
			where: {},
			truncate: true,
			cascade: true,
			restartIdentity: true,
			transaction,
		});

		await db.product_variant.destroy({
			where: {},
			truncate: true,
			cascade: true,
			restartIdentity: true,
			transaction,
		});

		await db.product.destroy({
			where: {},
			truncate: true,
			cascade: true,
			restartIdentity: true,
			transaction,
		});

		await transaction.commit();
		return { success: true };
	} catch (error) {
		await transaction.rollback();
		throw error;
	}
}

async function removeSoftDeletedItemsPermanently(req) {
	// List of model names to clean
	const modelsToClean = [
		'media',
		'category',
		'product',
		'product_variant_to_branch',
		'attribute',
	];

	for (const modelName of modelsToClean) {
		const model = db[modelName];
		if (!model) {
			console.log(`Model not found: ${modelName}`);
			continue;
		}

		const deletedCount = await model.destroy({
			where: {
				deleted_at: {
					[Op.ne]: null, // deleted_at is not null
				},
			},
			force: true, // permanently delete
		});

		console.log(`Removed ${deletedCount} items from ${modelName}`);
	}
}

// Helper functions
function cleanSlug(slug) {
	if (!slug) return null;

	const cleaned = slug
		.toString()
		.trim()
		.replace(/[\s_]+/g, '-') // spaces → dash
		.replace(/[^\w\-]+/g, '') // remove special chars
		.replace(/\-\-+/g, '-') // remove double dashes
		.replace(/^-+/, '') // trim leading dash
		.replace(/-+$/, '') // trim trailing dash
		.toLowerCase();

	return cleaned || null;
}

function generateSlugFromTitle(title) {
	if (!title) return null;
	return slugify(title, { lower: true, strict: true, trim: true });
}

async function fixSlugsProductTranslationAndReport(req, res) {
	const report = [];

	try {
		const products = await db.product_translation.findAll({
			attributes: ['id', 'slug', 'title', 'language_id'],
		});

		for (const product of products) {
			if (!product.slug) continue;

			const oldSlug = product.slug;
			let newSlug = generateSlugFromTitle(product.title);
			// let newSlug = cleanSlug(oldSlug);
			if (!newSlug) continue;

			let updated = false;
			let attempt = 0;

			while (!updated) {
				const t = await db.sequelize.transaction();
				try {
					await db.product_translation.update(
						{ slug: newSlug },
						{ where: { id: product.id }, transaction: t }
					);
					await t.commit();
					updated = true;

					// Add to report only if changed
					if (oldSlug !== newSlug) {
						report.push({
							id: product.id,
							language_id: product.language_id,
							title: product.title,
							oldSlug,
							newSlug,
						});
					}
				} catch (error) {
					await t.rollback();

					if (error.name === 'SequelizeUniqueConstraintError') {
						attempt++;
						if (attempt === 1) {
							newSlug = generateSlugFromTitle(product.title);
						} else {
							const randomSuffix = Math.floor(
								Math.random() * 10000
							);
							newSlug = `${generateSlugFromTitle(
								product.title
							)}-${randomSuffix}`;
						}
					} else {
						console.error(
							`Failed to update slug for ID ${product.id}:`,
							error.message
						);
						break; // skip this row
					}
				}
			}
		}

		// Generate Excel
		const workbook = new ExcelJS.Workbook();
		const sheet = workbook.addWorksheet('Product Slug Report');

		// Header
		sheet.columns = [
			{ header: 'Product ID', key: 'id', width: 15 },
			{ header: 'Language ID', key: 'language_id', width: 15 },
			{ header: 'Title', key: 'title', width: 30 },
			{ header: 'Old Slug', key: 'oldSlug', width: 30 },
			{ header: 'New Slug', key: 'newSlug', width: 30 },
		];

		// Add rows
		report.forEach((r) => sheet.addRow(r));

		// Write Excel to buffer
		const buffer = await workbook.xlsx.writeBuffer();

		// Send as download
		res.setHeader(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		);
		res.setHeader(
			'Content-Disposition',
			`attachment; filename="product_slug_report_${Date.now()}.xlsx"`
		);

		return res.send(buffer);
	} catch (error) {
		console.error('Error fixing product slugs:', error);
		return res.status(500).json({
			message: 'Failed to clean product slugs',
			error: error.message,
		});
	}
}
