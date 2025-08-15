const db = require('../../db/models/index.js');
const commonUtils = require('../../utils/commonUtils.js');
const createBaseService = require('../../utils/baseService.js');
const { cloudinaryService } = require('../index.js');
const ApiError = require('../../utils/ApiError.js');
const httpStatus = require('http-status');

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
async function createMedia(req, folder) {
	const image = await cloudinaryService.mediaUpload(
		req.file.buffer,
		req.file.originalname,
		folder
	);
	const userId = commonUtils.getUserId(req);
	return mediaService.create(
		{
			url: `${image.public_id}.${image.format}`,
			title: req.file.originalname || null,
			size: image.bytes || null,
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

module.exports = {
	createMedia,
	getMedias: (req) => mediaService.list(req, [], [], [['created_at', 'ASC']]),
	permanentDeleteMediaById,
	softDeleteMediaById,
};
