const express = require('express');
const { apiMetadataController } = require('../../../controllers/Api');

const router = express.Router();

router.route('/filters').get(apiMetadataController.getFiltersData);
router.route('/navCategories').get(apiMetadataController.getNavCategories);
router.route('/brands').get(apiMetadataController.getBrands);

module.exports = router;
