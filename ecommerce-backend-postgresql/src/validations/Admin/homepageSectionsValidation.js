const Joi = require('@hapi/joi');

const sliderConfig = Joi.object({
	images: Joi.array()
		.items(
			Joi.object({
				media_id: Joi.number().required(),
				link: Joi.string().allow(null),
			})
		)
		.min(1)
		.required(),
	autoplay: Joi.boolean().default(false),
	autoplay_delay: Joi.number().integer().min(1000),
	show_dots: Joi.boolean().default(true),
	show_arrows: Joi.boolean().default(false),
	slides_per_view: Joi.number().integer().min(1).default(1),
});

const bannerConfig = Joi.object({
	image: Joi.object({
		media_id: Joi.number().required(),
		link: Joi.string().allow(null),
	}).required(),
});

const tabsConfig = Joi.object();
const categoriesConfig = Joi.object({
	category_ids: Joi.array().items(Joi.number()).min(1).required(),
	layout: Joi.string().valid('grid', 'slider').default('grid'),
	items_per_row: Joi.number().integer().min(1).default(4),
	slider: Joi.boolean().default(false),
	card_design: Joi.string()
		.valid('circle', 'square', 'fullImage')
		.default('square'),
});

const productsConfig = Joi.object({
	category_id: Joi.number().required(),
	product_limit: Joi.number().integer().min(1).default(8),
	layout: Joi.string().valid('grid', 'slider').default('grid'),
	items_per_row: Joi.number().integer().min(1).default(4),
	show_view_all: Joi.boolean().default(true),
});

const createSection = {
	body: Joi.object({
		type: Joi.string()
			.valid('slider', 'banner', 'categories', 'products', 'tab')
			.required(),
		title: Joi.object().optional().allow(null, ''),
		status: Joi.boolean().default(true),

		config: Joi.when('type', {
			switch: [
				{ is: 'slider', then: sliderConfig.required() },
				{ is: 'banner', then: bannerConfig.required() },
				{ is: 'categories', then: categoriesConfig.required() },
				{ is: 'products', then: productsConfig.required() },
				{ is: 'tab', then: tabsConfig.required() },
			],
			otherwise: Joi.forbidden(),
		}),
	}),
};

const updateSection = {
	body: Joi.object({
		title: Joi.object().optional().allow(null, ''),
		status: Joi.boolean(),
		config: Joi.object(), // validated on frontend or revalidated if needed
	}),
};

const reorderSections = {
	body: Joi.array()
		.items(
			Joi.object({
				id: Joi.number().required(),
				position: Joi.number().integer().min(1).required(),
			})
		)
		.min(1)
		.required(),
};

module.exports = {
	createSection,
	updateSection,
	reorderSections,
};
