const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/appBaseService.js');
const { localizeAttributes, getLang } = require('../../utils/commonUtils.js');

const parentCategoryService = createAppBaseService(db.parent_category, {
	name: 'Parent Category',
});

module.exports = {
	getParentCategories: (req) =>
		parentCategoryService.list(
			req,
			[
				{
					model: db.category.scope({ method: ['active'] }),
					attributes: [
						'id',
						'slug',
						...localizeAttributes(
							['title', 'description'],
							getLang(req),
							'categories'
						),
					],
				},
				{
					model: db.media,
					required: false,
				},
			],
			[],
			{
				method: ['localized', ['title', 'description'], getLang(req)],
			},
			[['created_at', 'ASC']]
		),
};
