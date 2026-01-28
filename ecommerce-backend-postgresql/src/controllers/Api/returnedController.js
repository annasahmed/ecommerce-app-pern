const catchAsync = require('../../utils/catchAsync');
const { apiReturnedService } = require('../../services/Api');
const ApiError = require('../../utils/ApiError');
const httpStatus = require('http-status');
const { verifyToken } = require('../../utils/auth');
const { mediaUpload } = require('../../services/imageService');

const getReturnEligibleItems = catchAsync(async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
	}

	// Verify access token
	const payload = await verifyToken(accessToken);

	const returned = await apiReturnedService.getReturnEligibleItems(
		req,
		payload.userId
	);
	res.send(returned);
});
const createReturnRequest = catchAsync(async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
	}

	// Verify access token
	const payload = await verifyToken(accessToken);

	console.log(req.files, 'chkking files');

	if (req.files?.video && req.files?.video.length > 0) {
		const uploadedVideo = await mediaUpload(req.files?.video[0]);
		req.body.video = uploadedVideo.url;
	} else {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Video is Required!');
	}
	if (req.files?.images && req.files?.images.length > 0) {
		const images = await Promise.all(
			req.files.images.map(async (image) => {
				return (await mediaUpload(image))?.url;
			})
		);
		req.body.images = images;
	}

	const returned = await apiReturnedService.createReturnRequest(
		req,
		payload.userId
	);
	res.send(returned);
});
const getReturnRequestByUserId = catchAsync(async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
	}

	// Verify access token
	const payload = await verifyToken(accessToken);
	const returned = await apiReturnedService.getReturnRequestByUserId(
		req,
		payload.userId
	);
	res.send(returned);
});
const getReturnRequestById = catchAsync(async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
	}

	// Verify access token
	const payload = await verifyToken(accessToken);
	const returned = await apiReturnedService.getReturnRequestById(
		req,
		payload.userId
	);
	res.send(returned);
});
const cancelReturn = catchAsync(async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
	}

	// Verify access token
	const payload = await verifyToken(accessToken);
	const returned = await apiReturnedService.cancelReturn(req, payload.userId);
	res.send(returned);
});

module.exports = {
	getReturnEligibleItems,
	createReturnRequest,
	getReturnRequestByUserId,
	getReturnRequestById,
	cancelReturn,
};
