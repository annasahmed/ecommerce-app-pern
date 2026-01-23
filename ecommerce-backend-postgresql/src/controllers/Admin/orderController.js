const catchAsync = require('../../utils/catchAsync');
const { adminUspService, adminOrderService } = require('../../services/Admin');

const getOrderById = catchAsync(async (req, res) => {
	const order = await adminOrderService.getOrderById(req);
	res.send(order);
});
const getOrders = catchAsync(async (req, res) => {
	const orders = await adminOrderService.getOrders(req);
	res.send(orders);
});

const updateOrderStatus = catchAsync(async (req, res) => {
	const order = await adminOrderService.updateOrderStatus(req);
	res.send(order);
});

module.exports = {
	getOrderById,
	getOrders,
	updateOrderStatus,
};
