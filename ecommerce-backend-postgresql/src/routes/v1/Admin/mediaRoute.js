const express = require('express');
const validate = require('../../../middlewares/validate');
const { adminMediaController } = require('../../../controllers/Admin');
const { adminMediaValidation } = require('../../../validations/Admin');
const checkPermission = require('../../../middlewares/checkPermission');
const upload = require('../../../middlewares/multerUpload');

const router = express.Router();

router
	.route('/')
	.get(
		checkPermission('view_media'),
		validate(adminMediaValidation.getMedias),
		adminMediaController.getMedias
	)
	.post(
		checkPermission('create_media'),
		upload.single('file'),
		validate(adminMediaValidation.createMedia),
		adminMediaController.createMedia
	);

router
	.route('/:mediaId')
	.delete(
		checkPermission('delete_media'),
		validate(adminMediaValidation.deleteMedia),
		adminMediaController.softDeleteMedia
	);

router
	.route('/permanent/:mediaId')
	.delete(
		checkPermission('delete_media'),
		validate(adminMediaValidation.deleteMedia),
		adminMediaController.permanentDeleteMedia
	);

module.exports = router;
