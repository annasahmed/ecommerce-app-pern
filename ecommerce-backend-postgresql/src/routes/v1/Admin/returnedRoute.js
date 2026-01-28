const express = require('express');
const { adminReturnedController } = require('../../../controllers/Admin');
const checkPermission = require('../../../middlewares/checkPermission');

const router = express.Router();

router
	.route('/')
	.get(
		checkPermission('view_returned'),
		adminReturnedController.getReturnRequests
	);

router
	.route('/:id')
	.get(
		checkPermission('view_returned'),
		adminReturnedController.getReturnRequestById
	);

router
	.route('/:id/refund')
	.patch(
		checkPermission('process_returned'),
		adminReturnedController.processRefund
	);
router
	.route('/:id/received')
	.patch(
		checkPermission('process_returned'),
		adminReturnedController.markReturnReceived
	);
router
	.route('/:id/reject')
	.patch(
		checkPermission('process_returned'),
		adminReturnedController.rejectReturn
	);
router
	.route('/:id/approve')
	.patch(
		checkPermission('process_returned'),
		adminReturnedController.approveReturn
	);

module.exports = router;
