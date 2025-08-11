const Joi = require('@hapi/joi');

const createMedia = {
	file: Joi.object({
		originalname: Joi.string().required(),
		// mimetype: Joi.string()
		// 	.valid('image/jpeg', 'image/png', 'image/svg+xml')
		// 	.required(),
		// size: Joi.number()
		// 	.max(2 * 1024 * 1024) // 2 MB limit
		// 	.required(),
	}).required(),
};

const getMedias = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const deleteMedia = {
	params: Joi.object().keys({
		mediaId: Joi.number().required(),
	}),
};

module.exports = {
	createMedia,
	getMedias,
	deleteMedia,
};
