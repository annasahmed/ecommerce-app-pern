const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const cloudinary = require('../config/cloudinary');

const MAIN_FOLDER = 'ecommerce';

/**
 * Upload a file buffer to Cloudinary
 * @param {Buffer} buffer - File buffer from multer memoryStorage
 * * @param {string} originalname - Original filename (e.g., from req.file.originalname)
 * @param {string} subFolder - Optional Cloudinary subfolder name
 * @param {string} resource_type - Resource type ('image', 'video', etc.)
 * @returns {Promise<Object>} - Cloudinary upload response
 */
async function mediaUpload(
	buffer,
	originalname,
	subFolder,
	resource_type = 'image'
) {
	if (!buffer) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'No file buffer provided');
	}

	let folderPath = MAIN_FOLDER;
	if (subFolder && subFolder.trim() !== '') {
		folderPath += `/${subFolder}`;
	}

	// Extract name without extension & file extension
	const nameWithoutExt = originalname
		.replace(/\.[^/.]+$/, '') // remove extension
		.replace(/\s+/g, '_'); // replace spaces with underscores
	// Create a unique but readable name
	const uniqueName = `${nameWithoutExt}_${Date.now()}`;

	try {
		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder: folderPath,
					resource_type,
					public_id: uniqueName, // set our custom name
				},
				(error, result) => {
					if (error) reject(error);
					else resolve(result);
				}
			);
			uploadStream.end(buffer); // send buffer directly
		});
	} catch (err) {
		console.error('Cloudinary Upload Error:', err);
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			'Failed to upload media'
		);
	}
}

// make sure imageKey should be without extension
// like shoe1.png  x not_allowed
// like shoe1  allowed

async function deleteMedia(imageKey) {
	try {
		await cloudinary.uploader.destroy(imageKey); // this will delete file immediately, but cdn url may still alive for around 24 hrs
	} catch (err) {
		console.error('Cloudinary Delete Error:', err);
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			'Failed to delete media'
		);
	}
}

module.exports = {
	// mediaUpload,
	// deleteMedia,
};
