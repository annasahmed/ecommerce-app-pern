const Joi = require('@hapi/joi');
const { validateSlug } = require('../customValidation');

const createParentCategory = {
	body: Joi.object().keys({
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

const updateParentCategory = {
	params: Joi.object().keys({
		parentCategoryId: Joi.number().required(),
	}),
	body: Joi.object().keys({
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
			// .min(1)
			.optional(),
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
