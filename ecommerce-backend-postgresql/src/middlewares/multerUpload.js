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

		// optional subfolder
		if (req.body.subFolder) {
			folderPath = path.join(MAIN_FOLDER, req.body.subFolder);
			if (!fs.existsSync(folderPath)) {
				fs.mkdirSync(folderPath, { recursive: true });
			}
		}

		cb(null, folderPath);
	},

	filename: (req, file, cb) => {
		// keep the original filename as is
		cb(null, file.originalname);
	},
});

// optional file size limit (5 MB per file)
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

module.exports = upload;
