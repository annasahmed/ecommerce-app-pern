const Joi = require('@hapi/joi');
const { validateSlug, validatePhoneNumber } = require('../customValidation');

const createProduct = {
	body: Joi.object().keys({
		name: Joi.object().required(),
		address: Joi.object().required(),
		country: Joi.object().optional(),
		phone: Joi.string().optional().custom(validatePhoneNumber),
		email: Joi.string().email().required(),
		status: Joi.boolean(),
	}),
};

const updateProduct = {
	params: Joi.object().keys({
		productId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		name: Joi.object().optional(),
		address: Joi.object().optional(),
		country: Joi.object().allow(null).optional(),
		phone: Joi.string().allow(null).optional().custom(validatePhoneNumber),
		email: Joi.string().email().optional(),
		status: Joi.boolean().optional(),
	}),
};

const getProducts = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getProduct = {
	params: Joi.object().keys({
		productId: Joi.number().required(),
	}),
};

const deleteProduct = {
	params: Joi.object().keys({
		productId: Joi.number().required(),
	}),
};

module.exports = {
	createProduct,
	updateProduct,
	getProducts,
	getProduct,
	deleteProduct,
};
