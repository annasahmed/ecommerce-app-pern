const catchAsync = require('../../utils/catchAsync');
const { apiOrderService } = require('../../services/Api');

const confirmOrder = catchAsync(async (req, res) => {
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

module.exports = {
	confirmOrder,
	trackOrder,
};
