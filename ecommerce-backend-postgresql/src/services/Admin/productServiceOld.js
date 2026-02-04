const httpStatus = require('http-status');
const db = require('../../db/models/index.js');
const ApiError = require('../../utils/ApiError.js');
const commonUtils = require('../../utils/commonUtils.js');
const { pickLanguageFields } = require('../../utils/languageUtils.js');
const { getOffset } = require('../../utils/query.js');
const config = require('../../config/config.js');
const model = db.product;

// {
// 	titles: [
// 		{ id: 1, value: 'Home' },
// 		{ id: 2, value: 'ہجم' },
// 	],
// 	excerpts: [
// 		{ id: 1, value: 'Short summary' },
// 		// id 2 has no excerpt
// 	],
// 	descriptions: [
// 		{ id: 2, value: 'یہ ایک تفصیل ہے' },
// 		// id 1 has no description
// 	],
// },

function prepareProductTranslations(
	{ titles = [], excerpts = [], descriptions = [] },
	productId
) {
	const mapByLangId = {};

	// Helper to fill map
	const fillMap = (array, field) => {
		array.forEach(({ id, value }) => {
			if (!mapByLangId[id]) {
				mapByLangId[id] = {
					product_id: productId,
					language_id: id,
					title: null,
					excerpt: null,
					description: null,
				};
			}
			mapByLangId[id][field] = value || null;
		});
	};

	fillMap(titles, 'title');
	fillMap(excerpts, 'excerpt');
	fillMap(descriptions, 'description');

	return Object.values(mapByLangId);
}

async function getProducts(
	req,
	include = [],
	attributes = [],
	sort = [['id', 'DESC']]
) {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const {
		page = defaultPage,
		limit = defaultLimit,
		sortBy,
		sortOrder = 'DESC',
	} = req.query;
	const getLang = (req) =>
		req?.query?.lang || req?.headers?.['accept-language'] || 'en';

	const offset = getOffset(page, limit);
	const finalSort = sortBy ? [[sortBy, sortOrder.toUpperCase()]] : sort;
	const lang = getLang(req);
	const data = await model.findAndCountAll({
		offset,
		limit,
		order: finalSort,
		include,
		attributes: attributes?.length > 0 ? attributes : {},
	});
	const parsedRows = pickLanguageFields(data.rows, lang);

	return parsedRows;
	// return {
	// 	total: data.count,
	// 	records: parsedRows,
	// 	limit: limit,
	// 	page: page,
	// };
}

// Using userId logic from request
async function createProduct(req) {
	const {
		title,
		excerpt,
		description,

		usps,
		categories,

		productVariants,

		sku,
		slug,
		costPrice,
		stock,
		salePrice,
		discountPercentage,
		metaTitle,
		metaDescription,
		thumbnail,
		images,
		isFeatured,
	} = req.body;
	const userId = commonUtils.getUserId(req);
	const transaction = await db.sequelize.transaction();
	try {
		const entity = await model
			.create(
				{
					sku,
					slug,
					cost_price: costPrice,
					stock,
					sale_price: salePrice,
					discount_percentage: discountPercentage,
					meta_title: metaTitle,
					meta_description: metaDescription,
					thumbnail,
					images,
					is_featured: isFeatured,
					user_id: userId,
				},
				transaction
			)
			.then((resultEntity) => resultEntity.get({ plain: true }));

		const productId = entity.id;

		const dataToInsert = prepareProductTranslations(
			{ title, excerpt, description },
			productId
		);
		await db.product_translation.bulkCreate(dataToInsert, { transaction });

		await db.product_to_usp.bulkCreate(
			usps.map((usp) => {
				return { usp_id: usp, product_id: productId };
			}),
			{ transaction }
		);

		await db.product_to_category.bulkCreate(
			categories.map((category) => {
				return { category_id: category, product_id: productId };
			}),
			{ transaction }
		);

		await db.product_variant.bulkCreate(
			productVariants.map((variant) => {
				return { ...variant, product_id: productId };
			}),
			{ transaction }
		);

		transaction.commit();
	} catch (error) {
		transaction.rollback();
		console.log(e);
		throw new ApiError(
			httpStatus.INTERNAL_SERVER_ERROR,
			error.message || error
		);
	}
}

async function updateUsp(req) {
	const userId = commonUtils.getUserId(req);
	return uspService.update(req.params.uspId, req.body, userId);
}

async function softDeleteUspById(req) {
	const userId = commonUtils.getUserId(req);
	return uspService.softDelete(req.params.uspId, userId);
}

module.exports = {
	createProduct,
	getProducts,
};
