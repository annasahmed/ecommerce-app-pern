const express = require('express');
const { apiHomepageSectionsController } = require('../../../controllers/Api');

const router = express.Router();

router.route('/').get(apiHomepageSectionsController.getHomepageSections);

module.exports = router;
