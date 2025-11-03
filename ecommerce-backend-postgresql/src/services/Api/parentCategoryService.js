const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/appBaseService.js');
const { translationInclude } = require('../../utils/includeHelpers.js');

const parentCategoryService = createAppBaseService(db.parent_category, {
	name: 'Parent Category',
});

module.exports = {
	getParentCategories: (req) =>
		parentCategoryService.list(
			req,
			[
				{
					model: db.parent_category_translation,
					separate: true,
					as: 'translations',
					attributes: ['title', 'description', 'slug'],
					include: [translationInclude(req)],
				},
				{
					model: db.media,
					required: false,
				},
			],
			[],
			[['created_at', 'ASC']]
		),
};
