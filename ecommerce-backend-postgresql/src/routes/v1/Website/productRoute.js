const express = require('express');
const { apiProductController } = require('../../../controllers/Api');

const router = express.Router();

router.route('/').get(apiProductController.getProducts);

module.exports = router;
