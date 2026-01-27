const express = require('express');
const { adminOrderController } = require('../../../controllers/Admin');

const router = express.Router();

router.route('/').get(adminOrderController.getOrders);

router
	.route('/:orderId')
	.get(adminOrderController.getOrderById)
	.patch(adminOrderController.updateOrderId);
router.route('/status/:orderId').patch(adminOrderController.updateOrderStatus);

module.exports = router;
