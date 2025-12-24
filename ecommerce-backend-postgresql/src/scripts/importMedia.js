const fs = require('fs');
const path = require('path');
const db = require('../db/models');

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

importMedia();
