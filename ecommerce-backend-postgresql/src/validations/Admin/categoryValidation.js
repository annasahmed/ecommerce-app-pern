const Joi = require('@hapi/joi');
const { validateSlug } = require('../customValidation');

const createCategory = {
	body: Joi.object().keys({
		parentCategoryId: Joi.number().required(),
		title: Joi.object().required(),
		description: Joi.object().allow(null),
		slug: Joi.string().custom(validateSlug).required(),
		icon: Joi.number().allow(null),
		status: Joi.boolean(),
	}),
};

const updateCategory = {
	params: Joi.object().keys({
		categoryId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		parentCategoryId: Joi.number().optional(),
		title: Joi.object().optional(),
		description: Joi.object().allow(null).optional(),
		slug: Joi.string().custom(validateSlug).optional(),
		icon: Joi.number().allow(null).optional(),
		status: Joi.boolean(),
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
