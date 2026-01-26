const express = require('express');
const { apiAppUserController } = require('../../../controllers/Api');

const router = express.Router();

router.route('/').patch(apiAppUserController.updateAppUser);

module.exports = router;
