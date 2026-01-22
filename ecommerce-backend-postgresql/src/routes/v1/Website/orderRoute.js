const express = require('express');
const { apiOrderController } = require('../../../controllers/Api');

const router = express.Router();

router.route('/confirm-order').post(apiOrderController.confirmOrder);
router.route('/track/:trackingId').get(apiOrderController.trackOrder);
router.route('/my-orders').get(apiOrderController.myOrders);

module.exports = router;
