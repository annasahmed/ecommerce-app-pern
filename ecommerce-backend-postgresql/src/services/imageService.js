const path = require('path');

async function mediaUpload(file, subFolder) {
	if (!file) throw new Error('No file provided');

	const folderPath = subFolder ? subFolder.replace(/\\/g, '/') : '';

	const fileUrl = `uploads${folderPath ? `/${folderPath}` : ''}/${
		file.filename
	}`;
	return {
		url: fileUrl,
		title: file.originalname,
		size: file.size,
		filename: file.filename,
	};
}

module.exports = {
	mediaUpload,
};
