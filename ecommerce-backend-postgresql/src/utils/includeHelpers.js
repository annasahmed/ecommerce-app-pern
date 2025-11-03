const db = require('../db/models');
const { getLang } = require('./commonUtils');

exports.translationInclude = (req, alias = 'language') => ({
	model: db.language,
	as: alias,
	attributes: [],
	where: { code: getLang(req) },
	required: true,
});
