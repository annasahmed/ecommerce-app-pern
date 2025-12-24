const express = require('express');
const { adminScriptController } = require('../../../controllers/Admin');

const router = express.Router();

router.route('/import-media').get(adminScriptController.importMediaController);
router.route('/link-media').get(adminScriptController.linkMediaToProductsController);

module.exports = router;
