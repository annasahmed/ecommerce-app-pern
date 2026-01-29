const express = require('express');
const { apiSubscriberController } = require('../../../controllers/Api');

const router = express.Router();

router.route('/').post(apiSubscriberController.createSubscriber);

module.exports = router;
