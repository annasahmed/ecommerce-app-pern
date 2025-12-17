const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/appBaseService.js');
const { translationInclude } = require('../../utils/includeHelpers.js');

const categoryService = createAppBaseService(db.category, {
	name: 'Category',
});

module.exports = {
	getCategories: (req) =>
		categoryService.list(
			req,
			[
				{
					model: db.category_translation,
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
