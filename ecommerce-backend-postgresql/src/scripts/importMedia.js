const fs = require('fs');
const path = require('path');
const db = require('../db/models');
const { Op } = require('sequelize');

const UPLOADS_DIR = path.join(__dirname, '../uploads');
const BASE_URL = '/uploads';

async function importMedia() {
	try {
		const files = fs.readdirSync(UPLOADS_DIR);

		for (const file of files) {
			const filePath = path.join(UPLOADS_DIR, file);
			const stat = fs.statSync(filePath);

			// skip folders
			if (!stat.isFile()) continue;

			const url = `${BASE_URL}/${file}`;

			// prevent duplicates
			const exists = await db.media.findOne({ where: { url } });
			if (exists) {
				console.log(`Skipping existing: ${file}`);
				continue;
			}

			await db.media.create({
				url,
				title: file,
				size: stat.size,
				user_id: 1, // admin/system user
			});

			console.log(`Imported: ${file}`);
		}

		console.log('✅ Media import completed');
		process.exit();
	} catch (err) {
		console.error('❌ Import failed:', err);
		process.exit(1);
	}
}

// connect media to products
async function linkMediaToProducts() {
	const noImagesProducts = [];
	try {
		// 1️⃣ Get all products with slug
		const products = await db.product.findAll({
			include: [
				{
					model: db.product_translation,
					attributes: ['slug'],
				},
			],
		});

		for (const product of products) {
			if (
				!product.product_translations ||
				product.product_translations.length === 0
			)
				continue;
			const slug = product.product_translations[0].slug;
			if (!slug) continue;

			// 2️⃣ Find all media with title similar to slug
			const mediaList = await db.media.findAll({
				where: {
					title: { [Op.iLike]: `${slug}%` }, // PostgreSQL iLike for case-insensitive
				},
				raw: true,
			});

			if (mediaList.length === 0) {
				noImagesProducts.push({
					slug,
					images: mediaList,
				});
				continue;
			}

			// console.log(slug, mediaList);

			// 3️⃣ Set thumbnail = first media
			const firstMedia = mediaList[0];
			await product.update({ thumbnail: firstMedia.id });

			// 4️⃣ Link remaining media in product_to_media
			for (const media of mediaList) {
				// Check if already linked
				const exists = await db.product_to_media.findOne({
					where: { product_id: product.id, media_id: media.id },
				});

				if (!exists) {
					await db.product_to_media.create({
						product_id: product.id,
						media_id: media.id,
					});
				}
			}

			console.log(
				`Linked ${mediaList.length} media to product ${product.id}`
			);
		}

		console.log(
			noImagesProducts,
			noImagesProducts.length,
			'✅ Media linking completed'
		);
	} catch (err) {
		console.error('❌ Failed to link media:', err);
	}
}

module.exports = {
	importMedia,
	linkMediaToProducts,
};
