const Joi = require('@hapi/joi');
const { validateSlug, validatePhoneNumber } = require('../customValidation');

const createBranch = {
	body: Joi.object().keys({
		name: Joi.object().required(),
		code: Joi.string(),
		address: Joi.object().required(),
		country: Joi.object(),
		phone: Joi.string().custom(validatePhoneNumber),
		email: Joi.string().email().required(),
		latitude: Joi.number().required(),
		longitude: Joi.number().required(),
		isMainBranch: Joi.boolean(),
	}),
};

const updateBranch = {
	params: Joi.object().keys({
		branchId: Joi.number().required(),
	}),
	body: Joi.object().keys({
		name: Joi.object(),
		code: Joi.string(),
		address: Joi.object(),
		country: Joi.object(),
		phone: Joi.string().custom(validatePhoneNumber),
		email: Joi.string().email(),
		latitude: Joi.number(),
		longitude: Joi.number(),
		isMainBranch: Joi.boolean(),
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
