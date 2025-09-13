const httpStatus = require('http-status');
const ApiError = require('./ApiError');
const { literal } = require('sequelize');
const db = require('../db/models');

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

const appIncludes = (includes, req) => {
	return includes.map((item) => {
		return {
			model: item.model,
			attributes: (item.attributes || item.translationAttributes) && [
				...(item.translationAttributes
					? localizeAttributes(
							item.translationAttributes,
							getLang(req),
							item.name
					  )
					: []),
				...(item.attributes || undefined),
			],
			required: item.required,
			through:
				item.through === true
					? { attributes: [] }
					: item.through || undefined,
			as: item.as,
			include: item.include ? appIncludes(item.include, req) : [],
			where:
				item.where === 'lang'
					? { language_id: getLang(req) } // 👈 special flag for language filter
					: item.where || undefined,
		};
	});
};

const commonUtils = {
	getUserId,
	softDelete,
	localizeAttributes,
	getLang,
	appIncludes,
};

module.exports = commonUtils;
