const catchAsync = require('../../utils/catchAsync');
const { apiOrderService } = require('../../services/Api');

const confirmOrder = catchAsync(async (req, res) => {
	await apiOrderService.confirmOrder(req);
	res.send({
		message: 'Order confirmed successfully',
	});
});

module.exports = {
	confirmOrder,
};
