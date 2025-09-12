const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/AppBaseService.js');
const { localizeAttributes, getLang } = require('../../utils/commonUtils.js');

const productService = createAppBaseService(db.product, {
	name: 'Product',
});

module.exports = {
	getProducts: (req) =>
		productService.list(
			req,
			[
				{ model: db.media, required: false, as: 'thumbnailImage' },
				{ model: db.media, required: false, as: 'images' },
				{ model: db.category, required: false },
				{ model: db.product_translation, required: false },
				{
					model: db.usp,
					required: false,
				},
				{ model: db.vendor, required: false },
				{
					model: db.product_variant,
					required: false,
					include: [
						{ model: db.media, required: false },
						{
							model: db.branch,
							required: false,
							through: {
								as: 'pvb',
							},
						},
					],
				},
			],
			[],
			[['created_at', 'ASC']]
		),
};
