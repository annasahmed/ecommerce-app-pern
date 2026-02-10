const express = require('express');
const validate = require('../../../middlewares/validate');
const { adminBrandController } = require('../../../controllers/Admin');
const { adminBrandValidation } = require('../../../validations/Admin');
const checkPermission = require('../../../middlewares/checkPermission');

const router = express.Router();

router
	.route('/')
	.get(
		checkPermission('view_brand'),
		// validate(adminBrandValidation.getBrands),
		adminBrandController.getBrands
	)
	.post(
		checkPermission('create_brand'),
		// validate(adminBrandValidation.createBrand),
		adminBrandController.createBrand
	);

router
	.route('/:brandId')
	.get(
		checkPermission('view_brand'),
		validate(adminBrandValidation.getBrand),
		adminBrandController.getBrandById
	)
	.patch(
		checkPermission('update_brand'),
		// validate(adminBrandValidation.updateBrand),
		adminBrandController.updateBrand
	)
	.delete(
		checkPermission('delete_brand'),
		validate(adminBrandValidation.deleteBrand),
		adminBrandController.softDeleteBrand
	);
router
	.route('/permanent/:brand')
	.delete(
		checkPermission('delete_brand'),
		validate(adminBrandValidation.deleteBrand),
		adminBrandController.permanentDeleteBrand
	);

module.exports = router;
