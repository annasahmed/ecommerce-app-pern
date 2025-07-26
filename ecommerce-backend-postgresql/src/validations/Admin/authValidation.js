const Joi = require('@hapi/joi');

const login = {
	body: Joi.object().keys({
		email: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

module.exports = {
	login,
};
