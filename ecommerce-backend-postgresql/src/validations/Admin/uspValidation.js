const Joi = require('@hapi/joi');
const { validateSlug } = require('../customValidation');

const createUsp = {
	body: Joi.object().keys({
		translations: Joi.array()
			.items(
				Joi.object({
					title: Joi.string().required(),
					description: Joi.string().allow(null),
					slug: Joi.string().custom(validateSlug).required(),
					language_id: Joi.number().integer().required(),
				})
			)
			.min(1)
			.required(),
		status: Joi.boolean(),
	}),
};

const updateUsp = {
	params: Joi.object().keys({
		uspId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		translations: Joi.array()
			.items(
				Joi.object({
					title: Joi.string().required(),
					description: Joi.string().allow(null),
					slug: Joi.string().custom(validateSlug).required(),
					language_id: Joi.number().integer().required(),
				})
			)
			// .min(1)
			.optional(),
		status: Joi.boolean(),
	}),
};

const getUsps = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getUsp = {
	params: Joi.object().keys({
		uspId: Joi.number().required(),
	}),
};

const deleteUsp = {
	params: Joi.object().keys({
		uspId: Joi.number().required(),
	}),
};

module.exports = {
	createUsp,
	updateUsp,
	getUsps,
	getUsp,
	deleteUsp,
};
