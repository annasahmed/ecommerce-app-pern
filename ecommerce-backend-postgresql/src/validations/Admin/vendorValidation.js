const Joi = require('@hapi/joi');
const { validatePhoneNumber } = require('../customValidation');

const createVendor = {
	body: Joi.object().keys({
		name: Joi.object().required(),
		address: Joi.object().required(),
		country: Joi.object().optional(),
		phone: Joi.string().optional().custom(validatePhoneNumber),
		email: Joi.string().email().required(),
		status: Joi.boolean(),
	}),
};

const updateVendor = {
	params: Joi.object().keys({
		vendorId: Joi.number().required(),
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

const getVendors = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getVendor = {
	params: Joi.object().keys({
		vendorId: Joi.number().required(),
	}),
};

const deleteVendor = {
	params: Joi.object().keys({
		vendorId: Joi.number().required(),
	}),
};

module.exports = {
	createVendor,
	updateVendor,
	getVendors,
	getVendor,
	deleteVendor,
};
