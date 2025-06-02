const Joi = require('@hapi/joi');

const createLanguage = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		country: Joi.string().required(),
		flag: Joi.string(),
	}),
};

const updateLanguage = {
	params: Joi.object().keys({
		languageId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		name: Joi.string(),
		country: Joi.string(),
		flag: Joi.string(),
	}),
};

const getLanguages = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getLanguage = {
	params: Joi.object().keys({
		languageId: Joi.number().required(),
	}),
};

const deleteLanguage = {
	params: Joi.object().keys({
		languageId: Joi.number().required(),
	}),
};

module.exports = {
	createLanguage,
	updateLanguage,
	getLanguages,
	getLanguage,
	deleteLanguage,
};
