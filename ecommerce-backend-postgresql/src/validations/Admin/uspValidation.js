const Joi = require('@hapi/joi');
const { validateSlug } = require('../customValidation');

const createUsp = {
	body: Joi.object().keys({
		title: Joi.object().required(),
		description: Joi.object(),
		slug: Joi.string().custom(validateSlug).required(),
		status: Joi.boolean(),
	}),
};

const updateUsp = {
	params: Joi.object().keys({
		uspId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		title: Joi.object(),
		description: Joi.object(),
		slug: Joi.string().custom(validateSlug),
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
