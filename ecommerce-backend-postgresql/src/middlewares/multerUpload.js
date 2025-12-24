// const multer = require('multer');
// // const upload = multer({});
// const upload = multer({
// 	storage: multer.memoryStorage(),
// 	limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
// });

// module.exports = upload;

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const MAIN_FOLDER = path.join(__dirname, '../uploads');

if (!fs.existsSync(MAIN_FOLDER)) {
	fs.mkdirSync(MAIN_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let folderPath = MAIN_FOLDER;
		if (req.body.subFolder) {
			folderPath = path.join(MAIN_FOLDER, req.body.subFolder);
			if (!fs.existsSync(folderPath)) {
				fs.mkdirSync(folderPath, { recursive: true });
			}
		}
		cb(null, folderPath);
	},
	filename: (req, file, cb) => {
		const nameWithoutExt = file.originalname
			.replace(/\.[^/.]+$/, '')
			.replace(/\s+/g, '_');
		const uniqueName = `${nameWithoutExt}_${Date.now()}${path.extname(
			file.originalname
		)}`;
		cb(null, uniqueName);
	},
});

const upload = multer({ storage });

module.exports = upload;
