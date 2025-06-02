const Joi = require('@hapi/joi');
const { validateSlug } = require('../customValidation');

const createCategory = {
	body: Joi.object().keys({
		parentCategoryId: Joi.number().required(),
		title: Joi.object().required(),
		description: Joi.object(),
		slug: Joi.string().custom(validateSlug).required(),
		icon: Joi.string(),
	}),
};

const updateCategory = {
	params: Joi.object().keys({
		categoryId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		parentCategoryId: Joi.number().optional(),
		title: Joi.object(),
		description: Joi.object(),
		slug: Joi.string().custom(validateSlug),
		icon: Joi.string(),
	}),
};

const getCategories = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getCategory = {
	params: Joi.object().keys({
		categoryId: Joi.number().required(),
	}),
};

const deleteCategory = {
	params: Joi.object().keys({
		categoryId: Joi.number().required(),
	}),
};

module.exports = {
	createCategory,
	updateCategory,
	getCategories,
	getCategory,
	deleteCategory,
};
