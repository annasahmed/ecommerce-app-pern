const httpStatus = require('http-status');
const ApiError = require('./ApiError');
const { getOffset } = require('./query');
const config = require('../config/config');
const { pickLanguageFields } = require('./languageUtils');
const { Op } = require('sequelize');
const db = require('../db/models');

function createAppBaseService(model, options = {}) {
	const {
		name = 'Entity',
		formatCreateData = (data) => data,
		formatUpdateData = (data) => data,
		validations = () => {},
		isPagination = true,
	} = options;

	const getLang = (req) =>
		req?.query?.lang || req?.headers?.['accept-language'] || 'en';

	return {
		async create(data) {
			await validations(data);
			const formattedData = formatCreateData(data);
			const entity = await model.create(formattedData);
			return entity.get({ plain: true });
		},
		async update(id, data) {
			const toUpdate = formatUpdateData(data);
			await validations(data);
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

		async getById(id, include = [], attributes = [], scope = {}) {
			const result = await model
				.scope(
					{ method: ['active'] }, // active scope with params
					{ ...scope }
				)
				.findOne({
					where: { id },
					include: [
						{
							model: db.address,
							required: false,
						},
						...include,
					],
					attributes: attributes?.length > 0 ? attributes : {},
				});
			if (!result)
				throw new ApiError(httpStatus.NOT_FOUND, `${name} not found`);
			return result;
		},

		async getBySlug(
			slug,
			include = [],
			attributes = [],
			scope = {},
			isTranslation,
			lang
		) {
			if (!slug) {
				throw new ApiError(httpStatus.BAD_REQUEST, 'Slug is required');
			}
			let whereCondition = { slug };
			if (isTranslation && lang) {
				whereCondition = {};
			}
			const result = await model
				.scope(
					{ method: ['active'] }, // active scope with params
					{ ...scope }
				)
				.findOne({
					// where: { slug },
					include,
					attributes: attributes?.length > 0 ? attributes : {},
				});
			if (!result)
				throw new ApiError(httpStatus.NOT_FOUND, `${name} not found`);
			return result;
		},

		async getByAttribute(
			attribute,
			attributeValues,
			scope = 'active',
			showError = true
		) {
			const result = await model
				.scope(scope)
				.findOne({ where: { [attribute]: attributeValues } });
			if (!result && showError)
				throw new ApiError(httpStatus.NOT_FOUND, `${name} not found`);
			return result;
		},

		async list(
			req,
			include = [],
			attributes = [],
			scope = {},
			sort = [['id', 'DESC']]
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
			// const lang = getLang(req);
			const data = await model
				.scope(
					{ method: ['active'] }, // active scope with params
					{ ...scope }
				)
				.findAndCountAll({
					offset,
					limit,
					order: finalSort,
					include,
					attributes: attributes?.length > 0 ? attributes : undefined,
					// raw: true,
					unique: true,
					distinct: true, // to fix count
					col: 'id', // to fix count
				});
			// const parsedRows = pickLanguageFields(data.rows, lang);
			if (isPagination) {
				return {
					total: data.count,
					records: data.rows,
					limit: limit,
					page: page,
				};
			}
			return data.rows;
		},
	};
}

module.exports = createAppBaseService;
