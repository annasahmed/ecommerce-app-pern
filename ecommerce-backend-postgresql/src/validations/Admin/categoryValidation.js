const Joi = require('@hapi/joi');
const { validateSlug } = require('../customValidation');

const createCategory = {
	body: Joi.object().keys({
		parentCategoryId: Joi.number().required(),
		icon: Joi.number().allow(null),
		status: Joi.boolean(),
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
	}),
};

const updateCategory = {
	params: Joi.object().keys({
		categoryId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		parentCategoryId: Joi.number().optional(),
		icon: Joi.number().allow(null).optional(),
		status: Joi.boolean(),
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
