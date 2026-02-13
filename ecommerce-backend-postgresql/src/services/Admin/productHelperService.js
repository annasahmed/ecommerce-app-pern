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
