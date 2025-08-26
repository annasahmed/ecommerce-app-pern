const express = require('express');
const { apiLanguageController } = require('../../../controllers/Api');

const router = express.Router();

router.route('/').get(apiLanguageController.getLanguages);

module.exports = router;
