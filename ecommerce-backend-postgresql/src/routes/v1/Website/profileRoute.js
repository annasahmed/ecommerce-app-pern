const express = require('express');
const { apiAppUserController } = require('../../../controllers/Api');

const router = express.Router();

router.route('/').patch(apiAppUserController.updateAppUser);
router.route('/address').patch(apiAppUserController.addOrUpdateAddress);

module.exports = router;
