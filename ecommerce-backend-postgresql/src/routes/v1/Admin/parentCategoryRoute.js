const express = require('express');
const validate = require('../../../middlewares/validate');
const { adminParentCategoryController } = require('../../../controllers/Admin');
const { adminParentCategoryValidation } = require('../../../validations/Admin');
const checkPermission = require('../../../middlewares/checkPermission');

const router = express.Router();

router
	.route('/')
	.get(
		// checkPermission('get_parentCategory'),
		validate(adminParentCategoryValidation.getParentCategories),
		adminParentCategoryController.getParentCategories
	)
	.post(
		validate(adminParentCategoryValidation.createParentCategory),
		adminParentCategoryController.createParentCategory
	);

router
	.route('/:parentCategoryId')
	.get(
		validate(adminParentCategoryValidation.getParentCategory),
		adminParentCategoryController.getParentCategoryById
	)
	.post(
		validate(adminParentCategoryValidation.updateParentCategory),
		adminParentCategoryController.updateParentCategory
	)
	.delete(
		validate(adminParentCategoryValidation.deleteParentCategory),
		adminParentCategoryController.softDeleteParentCategory
	);
router
	.route('/permanent/:parentCategory')
	.delete(
		validate(adminParentCategoryValidation.deleteParentCategory),
		adminParentCategoryController.permanentDeleteParentCategory
	);

module.exports = router;
