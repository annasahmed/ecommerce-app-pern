const express = require('express');
const validate = require('../../../middlewares/validate');
const { adminProductController } = require('../../../controllers/Admin');
const { adminProductValidation } = require('../../../validations/Admin');
const checkPermission = require('../../../middlewares/checkPermission');

const router = express.Router();

router
	.route('/')
	.get(
		checkPermission('view_product'),
		validate(adminProductValidation.getProducts),
		adminProductController.getProducts
	)
	.post(
		checkPermission('create_product'),
		// validate(adminProductValidation.createProduct),
		adminProductController.createProduct
	);

router
	.route('/:productId')
	.get(
		checkPermission('view_product'),
		validate(adminProductValidation.getProduct),
		adminProductController.getProductById
	)
	.patch(
		checkPermission('update_product'),
		validate(adminProductValidation.updateProduct),
		adminProductController.updateProduct
	)
	.delete(
		checkPermission('delete_product'),
		validate(adminProductValidation.deleteProduct),
		adminProductController.softDeleteProduct
	);
router
	.route('/permanent/:product')
	.delete(
		checkPermission('delete_product'),
		validate(adminProductValidation.deleteProduct),
		adminProductController.permanentDeleteProduct
	);

module.exports = router;
