const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/appBaseService.js');
const { getLang } = require('../../utils/commonUtils.js');
const { translationInclude } = require('../../utils/includeHelpers.js');

const productService = createAppBaseService(db.product, {
	name: 'Product',
});

module.exports = {
	getProductBySlug: (req) => {
		console.log(req.params.slug, 'chkking slug');

		return productService.getBySlug(
			req.params.slug,
			getProductsIncludes(req, true),
			[] // keep attribtes array empty to get all the attributes
		);
	},
	getProducts: (req) => {
		return productService.list(
			req,
			// [],
			getProductsIncludes(req),
			[], // keep attribtes array empty to get all the attributes
			[['created_at', 'ASC']]
		);
	},
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
