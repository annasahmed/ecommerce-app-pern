const catchAsync = require('../../utils/catchAsync');
const { apiOrderService } = require('../../services/Api');
const { verifyToken } = require('../../utils/auth');
const ApiError = require('../../utils/ApiError');
const httpStatus = require('http-status');

const confirmOrder = catchAsync(async (req, res) => {
	const accessToken = req.cookies.accessToken;
	console.log(accessToken, 'accessToken');
	if (accessToken) {
		// Verify access token
		const payload = await verifyToken(accessToken);
		console.log(payload);
		req.body.userId = payload.userId || null;
	}
	// return;
	const order = await apiOrderService.confirmOrder(req);
	res.send({
		order,
		message: 'Order confirmed successfully',
	});
});
const trackOrder = catchAsync(async (req, res) => {
	const order = await apiOrderService.trackOrderByTrackingId(req);
	res.send({ order });
});
const myOrders = catchAsync(async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
	}

	// Verify access token
	const payload = await verifyToken(accessToken);
	const order = await apiOrderService.myOrders(req, payload.userId);
	res.send({ order });
});

module.exports = {
	confirmOrder,
	trackOrder,
	myOrders,
};
