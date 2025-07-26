const express = require('express');
const validate = require('../../../middlewares/validate');
const { adminUspController } = require('../../../controllers/Admin');
const { adminUspValidation } = require('../../../validations/Admin');
const checkPermission = require('../../../middlewares/checkPermission');

const router = express.Router();

router
	.route('/')
	.get(
		checkPermission('view_usp'),
		validate(adminUspValidation.getUsps),
		adminUspController.getUsps
	)
	.post(
		checkPermission('create_usp'),
		validate(adminUspValidation.createUsp),
		adminUspController.createUsp
	);

router
	.route('/:uspId')
	.get(
		checkPermission('view_usp'),
		validate(adminUspValidation.getUsp),
		adminUspController.getUspById
	)
	.patch(
		checkPermission('update_usp'),
		validate(adminUspValidation.updateUsp),
		adminUspController.updateUsp
	)
	.delete(
		checkPermission('delete_usp'),
		validate(adminUspValidation.deleteUsp),
		adminUspController.softDeleteUsp
	);
router
	.route('/permanent/:usp')
	.delete(
		checkPermission('delete_usp'),
		validate(adminUspValidation.deleteUsp),
		adminUspController.permanentDeleteUsp
	);

module.exports = router;
