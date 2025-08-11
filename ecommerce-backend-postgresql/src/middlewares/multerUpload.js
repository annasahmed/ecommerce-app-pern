const multer = require('multer');
// const upload = multer({});
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

module.exports = upload;
