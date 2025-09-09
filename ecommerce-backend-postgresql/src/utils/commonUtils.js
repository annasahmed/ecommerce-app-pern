const httpStatus = require('http-status');
const ApiError = require('./ApiError');
const { literal } = require('sequelize');

const getUserId = (req) => {
	return 1;
	const userId = req?.user?.id;
	if (!userId) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User Id is required');
	}
};
const softDelete = async (model, id, deletedByUserId) => {
	return await model.update(
		{ deleted_at: new Date(), deleted_by: deletedByUserId },
		{ where: { id } }
	);
};

const localizeAttributes = (fields, lang, alias = null) => {
	return fields.map((field) => [
		literal(`${alias ? `"${alias}".` : ''}${field}->>'${lang}'`),
		field,
	]);
};

const getLang = (req) =>
	req?.query?.lang || req?.headers?.['accept-language'] || 'en';

const commonUtils = {
	getUserId,
	softDelete,
	localizeAttributes,
	getLang,
};

module.exports = commonUtils;
