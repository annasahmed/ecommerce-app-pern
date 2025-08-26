const express = require('express');
const validate = require('../../../middlewares/validate');
const { apiAuthController } = require('../../../controllers/Api');
const { apiAuthValidation } = require('../../../validations/Api');

const router = express.Router();

router.post(
	'/login',
	validate(apiAuthValidation.login),
	apiAuthController.login
);
router.post(
	'/register',
	validate(apiAuthValidation.register),
	apiAuthController.register
);

module.exports = router;
