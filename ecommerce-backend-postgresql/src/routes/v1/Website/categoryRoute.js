const express = require('express');
const { apiCategoryController } = require('../../../controllers/Api');

const router = express.Router();

router.route('/').get(apiCategoryController.getCategories);

module.exports = router;
