const catchAsync = require('../../utils/catchAsync');
const { adminMediaService } = require('../../services/Admin');
const ApiError = require('../../utils/ApiError');
const httpStatus = require('http-status');

const getMedias = catchAsync(async (req, res) => {
	const medias = await adminMediaService.getMedias(req);
	res.send(medias);
});
const createMedia = catchAsync(async (req, res) => {
	if (!req.file) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Image not found');
	}
	const medias = await adminMediaService.createMedia(req);
	res.send(medias);
});

const softDeleteMedia = catchAsync(async (req, res) => {
	await adminMediaService.softDeleteMediaById(req);
	res.send({ success: true });
});
const permanentDeleteMedia = catchAsync(async (req, res) => {
	await adminMediaService.permanentDeleteMediaById(req);
	res.send({ success: true });
});

module.exports = {
	getMedias,
	createMedia,
	softDeleteMedia,
	permanentDeleteMedia,
};
