const express = require('express');
const validate = require('../../../middlewares/validate');
const { adminAuthValidation } = require('../../../validations/Admin');
const { adminAuthController } = require('../../../controllers/Admin');

const router = express.Router();

router.post(
	'/login',
	validate(adminAuthValidation.login),
	adminAuthController.login
);

module.exports = router;
