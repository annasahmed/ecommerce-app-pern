const httpStatus = require('http-status');
const ApiError = require('./ApiError');
const { getOffset } = require('./query');
const config = require('../config/config');

function createBaseService(model, options = {}) {
	const {
		name = 'Entity',
		formatCreateData = (data) => data,
		formatUpdateData = (data) => data,
		checkDuplicateSlug = false,
		useSoftDelete = true,
		validations = () => {},
	} = options;

	const getLang = (req) =>
		req?.query?.lang || req?.headers?.['accept-language'] || 'ur';

	return {
		async getById(id, scope = 'defaultScope') {
			const result = await model.scope(scope).findOne({ where: { id } });
			if (!result)
				throw new ApiError(httpStatus.NOT_FOUND, `${name} not found`);
			return result;
		},

		async getBySlug(slug, scope = 'defaultScope') {
			const result = await model
				.scope(scope)
				.findOne({ where: { slug } });
			if (!result)
				throw new ApiError(httpStatus.NOT_FOUND, `${name} not found`);
			return result;
		},

		async create(data, userId) {
			await validations(data);
			if (checkDuplicateSlug && data.slug) {
				const exists = await model.findOne({
					where: { slug: data.slug },
				});
				if (exists)
					throw new ApiError(
						httpStatus.CONFLICT,
						`${name} with this slug already exists`
					);
			}

			const formattedData = formatCreateData(data);
			formattedData.user_id = userId;

			const entity = await model.create(formattedData);
			return entity.get({ plain: true });
		},

		async update(id, data, userId) {
			const toUpdate = formatUpdateData(data);
			toUpdate.user_id = userId;
			await validations(data);

			if (checkDuplicateSlug && data.slug) {
				const exists = await model.findOne({
					where: { slug: data.slug },
				});
				if (exists)
					throw new ApiError(
						httpStatus.CONFLICT,
						`${name} with this slug already exists`
					);
			}

			const [_, updated] = await model.update(toUpdate, {
				where: { id },
				returning: true,
				plain: true,
				raw: true,
			});
			if (!updated)
				throw new ApiError(httpStatus.NOT_FOUND, `${name} not found`);
			return updated;
		},

		async softDelete(id, deletedByUserId) {
			if (!useSoftDelete) {
				throw new ApiError(
					httpStatus.BAD_REQUEST,
					`${name} does not support soft delete`
				);
			}

			const [count] = await model.update(
				{
					deleted_at: new Date(),
					deleted_by: deletedByUserId,
				},
				{ where: { id } }
			);

			if (count === 0)
				throw new ApiError(httpStatus.NOT_FOUND, `${name} not found`);
			return true;
		},

		async permanentDelete(id) {
			const deleted = await model.destroy({ where: { id } });
			if (!deleted)
				throw new ApiError(httpStatus.NOT_FOUND, `${name} not found`);
			return deleted;
		},

		async list(
			req,
			include = [],
			attributes = [],
			sort = [['created_at', 'DESC']]
		) {
			const { page: defaultPage, limit: defaultLimit } =
				config.pagination;
			const {
				page = defaultPage,
				limit = defaultLimit,
				sortBy,
				sortOrder = 'DESC',
			} = req.query;
			const offset = getOffset(page, limit);
			const finalSort = sortBy
				? [[sortBy, sortOrder.toUpperCase()]]
				: sort;
			const lang = getLang(req);
			const data = await model.findAndCountAll({
				offset,
				limit,
				order: finalSort,
				// order: [[...sort, sortBy, sortOrder.toUpperCase()]],
				include,
				attributes: attributes?.length > 0 ? attributes : {},
				raw: true,
			});
			const parsedRows = pickLanguageFields(data.rows, lang);

			return parsedRows;
			// return {
			// 	total: data.count,
			// 	records: parsedRows,
			// 	limit: limit,
			// 	page: page,
			// };
		},
	};
}

module.exports = createBaseService;
function pickLanguageFields(data, lang = 'en', fallbackLang = 'en') {
	if (Array.isArray(data)) {
		return data.map((item) => pickLanguageFields(item, lang, fallbackLang));
	}

	if (typeof data !== 'object' || data === null) return data;

	const result = {};
	for (const key in data) {
		const value = data[key];
		if (
			value &&
			typeof value === 'object' &&
			(value.hasOwnProperty(lang) || value.hasOwnProperty(fallbackLang))
		) {
			result[key] = value[lang] || value[fallbackLang];
		} else {
			result[key] = value;
		}
	}
	return result;
}
