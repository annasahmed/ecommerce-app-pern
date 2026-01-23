const Joi = require('@hapi/joi');
const { validateSlug } = require('../customValidation');

const createBrand = {
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

const updateBrand = {
	params: Joi.object().keys({
		brandId: Joi.number().required(),
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

const getBrands = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getBrand = {
	params: Joi.object().keys({
		brandId: Joi.number().required(),
	}),
};

const deleteBrand = {
	params: Joi.object().keys({
		brandId: Joi.number().required(),
	}),
};

module.exports = {
	createBrand,
	updateBrand,
	getBrands,
	getBrand,
	deleteBrand,
};
