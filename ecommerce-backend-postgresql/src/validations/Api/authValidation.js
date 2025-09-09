const Joi = require('@hapi/joi');
const { validatePhoneNumber } = require('../customValidation');

const login = {
	body: Joi.object().keys({
		email: Joi.string().required(),
		password: Joi.string().required(),
	}),
};
const register = {
	body: Joi.object().keys({
		email: Joi.string().required(),
		password: Joi.string().required(),
		name: Joi.string().required(),
		phone: Joi.string().allow(null).optional().custom(validatePhoneNumber),
	}),
};

module.exports = {
	login,
	register,
};
