const Joi = require('@hapi/joi');
const { validateSlug } = require('../customValidation');

const createParentCategory = {
	body: Joi.object().keys({
		title: Joi.object().required(),
		description: Joi.object(),
		slug: Joi.string().custom(validateSlug).required(),
		icon: Joi.string(),
	}),
};

const updateParentCategory = {
	params: Joi.object().keys({
		parentCategoryId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		title: Joi.object(),
		description: Joi.object(),
		slug: Joi.string().custom(validateSlug),
		icon: Joi.string(),
	}),
};

const getParentCategories = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getParentCategory = {
	params: Joi.object().keys({
		parentCategoryId: Joi.number().required(),
	}),
};

const deleteParentCategory = {
	params: Joi.object().keys({
		parentCategoryId: Joi.number().required(),
	}),
};

module.exports = {
	createParentCategory,
	updateParentCategory,
	getParentCategories,
	getParentCategory,
	deleteParentCategory,
};
