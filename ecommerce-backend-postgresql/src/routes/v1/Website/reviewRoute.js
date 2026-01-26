const express = require('express');
const { apiReviewController } = require('../../../controllers/Api');

const router = express.Router();

router
	.route('/')
	.get(apiReviewController.getReviewsByUser)
	.post(apiReviewController.createReview);

module.exports = router;
