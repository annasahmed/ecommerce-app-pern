const express = require('express');
const validate = require('../../../middlewares/validate');
const { adminCategoryController } = require('../../../controllers/Admin');
const { adminCategoryValidation } = require('../../../validations/Admin');
const checkPermission = require('../../../middlewares/checkPermission');

const router = express.Router();

router
	.route('/')
	.get(
		checkPermission('view_category'),
		validate(adminCategoryValidation.getCategories),
		adminCategoryController.getCategories
	)
	.post(
		checkPermission('create_category'),
		validate(adminCategoryValidation.createCategory),
		adminCategoryController.createCategory
	);

router
	.route('/:categoryId')
	.get(
		checkPermission('view_category'),
		validate(adminCategoryValidation.getCategory),
		adminCategoryController.getCategoryById
	)
	.patch(
		checkPermission('update_category'),
		validate(adminCategoryValidation.updateCategory),
		adminCategoryController.updateCategory
	)
	.delete(
		checkPermission('delete_category'),
		validate(adminCategoryValidation.deleteCategory),
		adminCategoryController.softDeleteCategory
	);
router
	.route('/permanent/:category')
	.delete(
		checkPermission('delete_category'),
		validate(adminCategoryValidation.deleteCategory),
		adminCategoryController.permanentDeleteCategory
	);

module.exports = router;
