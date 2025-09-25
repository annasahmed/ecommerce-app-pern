const Joi = require('@hapi/joi');

const createAttribute = {
	body: Joi.object().keys({
		name: Joi.object().required(),
		values: Joi.array().items(Joi.object()).min(1).required(),
		status: Joi.boolean(),
	}),
};

const updateAttribute = {
	params: Joi.object().keys({
		attributeId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		name: Joi.object().optional(),
		values: Joi.array().items(Joi.object()).optional(),
		status: Joi.boolean().optional(),
	}),
};

const getAttributes = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getAttribute = {
	params: Joi.object().keys({
		attributeId: Joi.number().required(),
	}),
};

const deleteAttribute = {
	params: Joi.object().keys({
		attributeId: Joi.number().required(),
	}),
};

module.exports = {
	createAttribute,
	updateAttribute,
	getAttributes,
	getAttribute,
	deleteAttribute,
};
