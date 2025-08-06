const Joi = require('@hapi/joi');
const { validateSlug, validatePhoneNumber } = require('../customValidation');

const createBranch = {
	body: Joi.object().keys({
		name: Joi.object().required(),
		code: Joi.string().optional(),
		address: Joi.object().required(),
		country: Joi.object().optional(),
		phone: Joi.string().optional().custom(validatePhoneNumber),
		email: Joi.string().email().required(),
		latitude: Joi.number().required(),
		longitude: Joi.number().required(),
		isMainBranch: Joi.boolean(),
		status: Joi.boolean(),
	}),
};

const updateBranch = {
	params: Joi.object().keys({
		branchId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		name: Joi.object().optional(),
		code: Joi.string().allow(null).optional(),
		address: Joi.object().optional(),
		country: Joi.object().allow(null).optional(),
		phone: Joi.string().allow(null).optional().custom(validatePhoneNumber),
		email: Joi.string().email().optional(),
		latitude: Joi.number().optional(),
		longitude: Joi.number().optional(),
		isMainBranch: Joi.boolean().optional(),
		status: Joi.boolean().optional(),
	}),
};

const getBranches = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getBranch = {
	params: Joi.object().keys({
		branchId: Joi.number().required(),
	}),
};

const deleteBranch = {
	params: Joi.object().keys({
		branchId: Joi.number().required(),
	}),
};

module.exports = {
	createBranch,
	updateBranch,
	getBranches,
	getBranch,
	deleteBranch,
};
