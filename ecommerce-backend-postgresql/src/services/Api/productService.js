const { Op } = require('sequelize');
const config = require('../../config/config.js');
const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/appBaseService.js');
const { getLang } = require('../../utils/commonUtils.js');
const { translationInclude } = require('../../utils/includeHelpers.js');
const { getOffset } = require('../../utils/query.js');
const { getAllDescendantCategoryIds } = require('./categoryService.js');
const ApiError = require('../../utils/ApiError.js');
const httpStatus = require('http-status');

const productService = createAppBaseService(db.product, {
	name: 'Product',
});

const productFilterConditions = async (req) => {
	const { categoryId, vendorId, minPrice, maxPrice } = req.query;
	/* ---------------- CATEGORY FILTER ---------------- */
	let categoryIds = [];

	if (categoryId) {
		const inputCategoryIds = Array.isArray(categoryId)
			? categoryId
			: [categoryId];

		const descendantResults = await Promise.all(
			inputCategoryIds.map((id) => getAllDescendantCategoryIds(id))
		);

		categoryIds = [...new Set(descendantResults.flat().map(Number))];
	}

	/* ---------------- 🔥 VENDOR FILTER ---------------- */
	let vendorCondition = {};
	let vendorRequired = false;

	if (vendorId) {
		const vendorIds = Array.isArray(vendorId)
			? vendorId.map(Number)
			: vendorId.split(',').map(Number);

		vendorCondition.id = {
			[Op.in]: vendorIds,
		};
		vendorRequired = true;
	}

	/* -----------;----- 🔥 PRICE FILTER ---------------- */
	const priceCondition = {};

	if (minPrice || maxPrice) {
		priceCondition.base_price = {};

		if (minPrice) {
			priceCondition.base_price[Op.gte] = Number(minPrice);
		}

		if (maxPrice) {
			if (minPrice && Number(minPrice) > Number(maxPrice)) {
				throw new ApiError(
					httpStatus.BAD_REQUEST,
					'Invalid price range: minPrice cannot be greater than maxPrice'
				);
			}
			priceCondition.base_price[Op.lte] = Number(maxPrice);
		}
	}

	return {
		categoryIds,
		vendorCondition,
		vendorRequired,
		priceCondition,
	};
};

const getProducts = async (req) => {
	const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;
	const offset = getOffset(page, limit);

	const { categoryIds, vendorCondition, vendorRequired, priceCondition } =
		await productFilterConditions(req);

	const products = await db.product
		.scope(
			{ method: ['active'] } // active scope with params
		)
		.findAndCountAll({
			offset,
			limit,
			where: {
				...priceCondition,
			},
			order: [['id', 'DESC']],
			attributes: [
				'id',
				'sku',
				'base_price',
				'base_discount_percentage',
				'is_featured',
			],
			include: [
				{
					model: db.category.scope('active'),
					attributes: ['id'],
					required: Boolean(categoryIds.length),
					where: categoryIds.length
						? { id: { [Op.in]: categoryIds } }
						: undefined,
					include: [
						{
							model: db.category_translation,
							separate: true,
							as: 'translations',
							attributes: ['title'],

							include: [translationInclude(req)],
						},
					],
				},
				{
					model: db.usp.scope('active'),
					attributes: ['id'],
					required: false,
					include: [
						{
							model: db.usp_translation,
							as: 'translations',
							separate: true,
							attributes: ['title'],
							include: [translationInclude(req)],
						},
					],
				},
				{
					model: db.vendor,
					attributes: ['id', 'name'],
					required: vendorRequired,
					where: vendorCondition,
				},
				{
					model: db.product_variant,
					attributes: ['id', 'sku'],
					required: false,
					include: [
						{
							model: db.media,
							required: false,
							attributes: ['url', 'title'],
						},
						{
							model: db.branch,
							required: false,
							through: {
								as: 'pvb',
								attributes: [
									'stock',
									'sale_price',
									'discount_percentage',
								],
							}, // this will stay intact
							attributes: ['id'],
						},
					],
				},
				{
					model: db.media,
					required: false,
					as: 'images',
					attributes: ['url', 'title'],
				},
				{
					model: db.media,
					required: false,
					as: 'thumbnailImage',
					attributes: ['url', 'title'],
				},
				{
					model: db.product_translation,
					required: false,
					attributes: ['title', 'excerpt', 'slug'],
					include: [
						{
							model: db.language,
							attributes: [],
							where: { code: getLang(req) }, // "en" or "ur",
							required: true,
						},
					],
				},
			],
			unique: true,
			distinct: true, // to fix count
			col: 'id', // to fix count
		});

	return {
		total: products.count,
		records: products.rows,
		limit: limit,
		page: page,
	};

	return products;
};

module.exports = {
	getProductBySlug: (req) => {
		return productService.getBySlug(
			req.params.slug,
			getProductsIncludes(req, true),
			[] // keep attribtes array empty to get all the attributes
		);
	},
	getProducts,
	// getProducts: (req) => {
	// 	return productService.list(
	// 		req,
	// 		// [],
	// 		getProductsIncludes(req),
	// 		[], // keep attribtes array empty to get all the attributes
	// 		[['created_at', 'ASC']]
	// 	);
	// },
};

const getProductsIncludes = (req, includeSlugCond = false) => [
	{
		model: db.category.scope('active'),
		attributes: ['id'],
		required: false,
		include: [
			{
				model: db.category_translation,
				separate: true,
				as: 'translations',
				attributes: ['title', 'description', 'slug'],

				include: [translationInclude(req)],
			},
		],
	},
	{
		model: db.usp.scope('active'),
		attributes: ['id'],
		required: false,
		include: [
			{
				model: db.usp_translation,
				as: 'translations',
				separate: true,
				attributes: ['title', 'description', 'slug'],
				include: [translationInclude(req)],
			},
		],
	},
	{
		model: db.vendor,
		attributes: ['id', 'name', 'address', 'country'],
		required: false,
	},
	{
		model: db.product_variant,
		attributes: ['id', 'sku'],
		required: false,
		include: [
			{
				model: db.media,
				required: false,
				attributes: ['url', 'title', 'size'],
			},
			{
				model: db.branch,
				required: false,
				through: {
					as: 'pvb',
					attributes: [
						'cost_price',
						'stock',
						'low_stock',
						'reorder_quantity',
						'sale_price',
						'discount_percentage',
					],
				}, // this will stay intact
				attributes: [
					'id',
					'name',
					'address',
					'country',
					'code',
					'phone',
					'email',
					'latitude',
					'longitude',
					'is_main_branch',
				],
			},
		],
	},
	{
		model: db.media,
		required: false,
		as: 'images',
		attributes: ['url', 'title', 'size'],
	},
	{
		model: db.media,
		required: false,
		as: 'thumbnailImage',
		attributes: ['url', 'title', 'size'],
	},
	{
		model: db.product_translation,
		required: false,
		attributes: ['title', 'excerpt', 'description', 'slug'],
		where: includeSlugCond
			? {
					slug: req.params.slug,
			  }
			: {},
		include: [
			{
				model: db.language,
				attributes: [],
				where: { code: getLang(req) }, // "en" or "ur",
				required: true,
			},
		],
	},
];
