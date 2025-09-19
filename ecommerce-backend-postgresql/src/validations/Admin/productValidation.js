const Joi = require('@hapi/joi');
const { validateSlug, validatePhoneNumber } = require('../customValidation');

const createProduct = {
	body: Joi.object().keys({
		sku: Joi.string().optional(),
		thumbnail: Joi.number().required(),
		images: Joi.array().items(Joi.number()).optional(),
		is_featured: Joi.boolean().default(false),
		meta_title: Joi.string().required(),
		meta_description: Joi.string().required(),
		status: Joi.boolean().optional(),

		categories: Joi.array().items(Joi.number().integer()).optional(),
		usps: Joi.array().items(Joi.number().integer()).optional(),
		vendors: Joi.array().items(Joi.number().integer()).optional(),

		translations: Joi.array()
			.items(
				Joi.object({
					title: Joi.string().required(),
					excerpt: Joi.string().allow(null),
					description: Joi.string().allow(null),
					slug: Joi.string().optional().custom(validateSlug),
					language_id: Joi.number().integer().required(),
				})
			)
			.min(1)
			.required(),

		variants: Joi.array()
			.items(
				Joi.object({
					sku: Joi.string().optional(),
					attributes: Joi.object().required(), // e.g., { size: "M", color: "Red" }
					image: Joi.number().required(),
					branch_data: Joi.array()
						.items(
							Joi.object({
								branch_id: Joi.number().integer().required(),
								cost_price: Joi.number().required(),
								stock: Joi.number().integer().required(),
								low_stock: Joi.number().integer().required(),
								reorder_quantity: Joi.number()
									.integer()
									.optional()
									.allow(null),
								sale_price: Joi.number().required(),
								discount_percentage: Joi.number()
									.optional()
									.allow(null),
							})
						)
						.required()
						.min(1),
				})
			)
			.optional(),
	}),
};

// const updateProduct = {
// 	params: Joi.object().keys({
// 		productId: Joi.number().required(),
// 	}),
// 	body: Joi.object().keys({
// 		name: Joi.object().optional(),
// 		address: Joi.object().optional(),
// 		country: Joi.object().allow(null).optional(),
// 		phone: Joi.string().allow(null).optional().custom(validatePhoneNumber),
// 		email: Joi.string().email().optional(),
// 		status: Joi.boolean().optional(),
// 	}),
// };
const updateProduct = {
	params: Joi.object().keys({
		productId: Joi.number().integer().required(),
	}),

	body: Joi.object().keys({
		sku: Joi.string().optional().allow(null),
		thumbnail: Joi.number().optional(),
		images: Joi.array().items(Joi.number()).optional().allow(null),
		is_featured: Joi.boolean().optional(),
		meta_title: Joi.string().optional(),
		meta_description: Joi.string().optional(),
		status: Joi.boolean().optional(),

		categories: Joi.array()
			.items(Joi.number().integer())
			.optional()
			.allow(null),
		usps: Joi.array().items(Joi.number().integer()).optional().allow(null),
		vendors: Joi.array()
			.items(Joi.number().integer())
			.optional()
			.allow(null),

		translations: Joi.array()
			.items(
				Joi.object({
					title: Joi.string().required(),
					excerpt: Joi.string().allow(null),
					description: Joi.string().allow(null),
					slug: Joi.string().optional().custom(validateSlug),
					language_id: Joi.number().integer().required(),
				})
			)
			.optional(),

		variants: Joi.array()
			.items(
				Joi.object({
					sku: Joi.string().optional().allow(null),
					attributes: Joi.object().required(),
					image: Joi.number().required(),
					branch_data: Joi.array()
						.items(
							Joi.object({
								branch_id: Joi.number().integer().required(),
								cost_price: Joi.number().required(),
								stock: Joi.number().integer().required(),
								low_stock: Joi.number().integer().required(),
								reorder_quantity: Joi.number()
									.integer()
									.optional()
									.allow(null),
								sale_price: Joi.number().required(),
								discount_percentage: Joi.number()
									.optional()
									.allow(null),
							})
						)
						.required()
						.min(1),
				})
			)
			.optional(),
	}),
};

const getProducts = {
	query: Joi.object().keys({
		limit: Joi.number().min(1),
		page: Joi.number().min(1),
	}),
};

const getProduct = {
	params: Joi.object().keys({
		productId: Joi.number().required(),
	}),
};

const deleteProduct = {
	params: Joi.object().keys({
		productId: Joi.number().required(),
	}),
};

module.exports = {
	createProduct,
	updateProduct,
	getProducts,
	getProduct,
	deleteProduct,
};
