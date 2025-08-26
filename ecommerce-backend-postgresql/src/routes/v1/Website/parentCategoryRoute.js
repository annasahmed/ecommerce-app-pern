const express = require('express');
const { apiParentCategoryController } = require('../../../controllers/Api');

const router = express.Router();

router.route('/').get(apiParentCategoryController.getParentCategories);

module.exports = router;
