const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/appBaseService.js');
const {
	localizeAttributes,
	getLang,
	appIncludes,
} = require('../../utils/commonUtils.js');

const productService = createAppBaseService(db.product, {
	name: 'Product',
});
// const includes = [
// 	{
// 		model: db.category,
// 		attributes: ['id', 'slug'],
// 		translationAttributes: ['title', 'description'],
// 		name: 'categories',
// 		require: false,
// 		through: true,
// 	},
// 	{
// 		model: db.usp,
// 		attributes: ['id', 'slug'],
// 		translationAttributes: ['title', 'description'],
// 		name: 'usps',
// 		require: false,
// 		through: true,
// 	},
// 	{
// 		model: db.vendor,
// 		attributes: ['id'],
// 		translationAttributes: ['name', 'address', 'country'],
// 		name: 'vendors',
// 		require: false,
// 		through: true,
// 	},
// 	{
// 		model: db.product_variant,
// 		attributes: ['id', 'sku', 'attributes'],
// 		required: false,
// 		include: [
// 			{
// 				model: db.media,
// 				required: false,
// 				attributes: ['url', 'title', 'size'],
// 			},
// 			{
// 				model: db.branch,
// 				required: false,
// 				through: {
// 					as: 'pvb',
// 					attributes: [
// 						'cost_price',
// 						'stock',
// 						'low_stock',
// 						'reorder_quantity',
// 						'sale_price',
// 						'discount_percentage',
// 					],
// 				}, // this will stay intact
// 				attributes: [
// 					'id',
// 					'code',
// 					'phone',
// 					'email',
// 					'latitude',
// 					'longitude',
// 					'is_main_branch',
// 				],
// 				translationAttributes: ['name', 'address', 'country'],
// 				name: 'product_variants->branches',
// 			},
// 		],
// 	},
// 	{
// 		model: db.media,
// 		required: false,
// 		as: 'images',
// 		attributes: ['url', 'title', 'size'],
// 	},
// 	{
// 		model: db.media,
// 		required: false,
// 		as: 'thumbnailImage',
// 		attributes: ['url', 'title', 'size'],
// 	},
// 	{
// 		model: db.product_translation,
// 		required: false,
// 		include: [
// 			{
// 				model: db.language,
// 				attributes: [],
// 				where: { code: getLang(req) }, // "en" or "ur"
// 				required: true,
// 			},
// 		],
// 	},
// ];

module.exports = {
	getProducts: (req) => {
		const includes = [
			{
				model: db.category,
				attributes: ['id'],
				// translationAttributes: ['title', 'description'],
				name: 'categories',
				required: false,
				through: true,
				include: [
					{
						model: db.category_translation,
						as: 'translations',
						attributes: ['title', 'description', 'slug'],
						include: [
							{
								model: db.language,
								as: 'language',
								attributes: [],
								where: { code: getLang(req) }, // "en" or "ur",
								required: true,
							},
						],
					},
				],
			},
			{
				model: db.usp,
				attributes: ['id'],
				// translationAttributes: ['title', 'description'],
				name: 'usps',
				required: false,
				through: true,
			},
			{
				model: db.vendor,
				attributes: ['id'],
				translationAttributes: ['name', 'address', 'country'],
				name: 'vendors',
				required: false,
				through: true,
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
							'code',
							'phone',
							'email',
							'latitude',
							'longitude',
							'is_main_branch',
						],
						translationAttributes: ['name', 'address', 'country'],
						name: 'product_variants->branches',
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
				attributes: ['title', 'excerpt', 'description'],
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
		return productService.list(
			req,
			[...includes],
			// [...appIncludes(includes, req)],
			[],
			[['created_at', 'ASC']]
		);
	},
};

// getProducts: (req) =>
// 		productService.list(
// 			req,
// 			[
// 				{
// 					model: db.media,
// 					required: false,
// 					as: 'thumbnailImage',
// 					attributes: ['url', 'title', 'size'],
// 				},
// 				{
// 					model: db.media,
// 					required: false,
// 					as: 'images',
// 					attributes: ['url', 'title', 'size'],
// 				},
// 				{
// 					model: db.category.scope({ method: ['active'] }),
// 					attributes: [
// 						'id',
// 						'slug',
// 						...localizeAttributes(
// 							['title', 'description'],
// 							getLang(req),
// 							'categories'
// 						),
// 					],
// 					required: false,
// 					through: { attributes: [] },
// 				},
// 				{ model: db.product_translation, required: false },
// 				{
// 					model: db.usp.scope({ method: ['active'] }),
// 					attributes: [
// 						'id',
// 						'slug',
// 						...localizeAttributes(
// 							['title', 'description'],
// 							getLang(req),
// 							'usps'
// 						),
// 					],
// 					required: false,
// 					through: { attributes: [] },
// 				},
// 				{
// 					model: db.vendor.scope({ method: ['active'] }),
// 					attributes: [
// 						'id',
// 						...localizeAttributes(
// 							['name', 'address', 'country'],
// 							getLang(req),
// 							'vendors'
// 						),
// 					],
// 					required: false,
// 				},
// 				{
// 					model: db.product_variant,
// 					required: false,
// 					include: [
// 						{ model: db.media, required: false },
// 						{
// 							model: db.branch,
// 							required: false,
// 							through: {
// 								as: 'pvb',
// 							},
// 						},
// 					],
// 				},
// 			],
// 			[],
// 			[['created_at', 'ASC']]
// 		),
