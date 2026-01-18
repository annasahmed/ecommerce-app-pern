const express = require('express');
const { apiFiltersController } = require('../../../controllers/Api');

const router = express.Router();

router.route('/').get(apiFiltersController.getFiltersData);

module.exports = router;
