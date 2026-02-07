const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');
const { imageService, cloudinaryService } = require('../index.js');
const ApiError = require('../../utils/ApiError.js');
const httpStatus = require('http-status');
const { Op } = require('sequelize');

const mediaService = createBaseService(db.media, {
	name: 'Media',
	checkDuplicateSlug: false,
	formatCreateData: (data) => ({
		url: data.url,
		title: data.title,
		size: data.size,
	}),
});

// Using userId logic from request
async function createMedia(req) {
	console.log(req.file, 'chkking file');

	const media = await imageService.mediaUpload(req.file);
	const userId = commonUtils.getUserId(req);
	return mediaService.create(
		{
			url: media.url,
			title: media.title,
			size: media.size,
		},
		userId
	);
}

async function softDeleteMediaById(req) {
	const userId = commonUtils.getUserId(req);
	return mediaService.softDelete(req.params.mediaId, userId);
}
async function permanentDeleteMediaById(req) {
	const userId = commonUtils.getUserId(req);
	const media = await db.media
		.scope('withDeleted')
		.findByPk(req.params.mediaId);
	if (!media) {
		throw new ApiError(httpStatus.NOT_FOUND, 'media not found');
	}
	const publicIdWithoutExt = media.url.replace(/\.[^/.]+$/, '');
	await cloudinaryService.deleteMedia(publicIdWithoutExt);
	return mediaService.permanentDelete(req.params.mediaId, userId);
}

async function bulkUploadMedia(req) {
	const userId = commonUtils.getUserId(req);
	const results = [];
	const files = req.files;
	let index = 0;
	for (const file of files) {
		console.log(index, file);
		index++;

		// 1️⃣ Upload file (prepare URL, etc.)
		const mediaData = await imageService.mediaUpload(file);

		// 2️⃣ Check if media already exists by title or URL
		let existingMedia = await db.media.findOne({
			where: {
				[Op.or]: [{ title: mediaData.title }, { url: mediaData.url }],
			},
		});

		if (existingMedia) {
			// 3️⃣ Update existing media
			existingMedia = await existingMedia.update({
				url: mediaData.url,
				title: mediaData.title,
				size: mediaData.size,
			});
			results.push({ status: 'updated', media: existingMedia });
		} else {
			// 4️⃣ Create new media
			const newMedia = await createMedia({
				url: mediaData.url,
				title: mediaData.title,
				size: mediaData.size,
				userId,
			});
			results.push({ status: 'added', media: newMedia });
		}
	}
}

module.exports = {
	createMedia,
	getMedias: (req) => mediaService.list(req, [], [], [['id', 'DESC']]),
	permanentDeleteMediaById,
	softDeleteMediaById,
	bulkUploadMedia,
};
