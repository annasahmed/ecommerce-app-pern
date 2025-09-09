const { literal } = require('sequelize');
const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/AppBaseService.js');
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
							getLang(req) || 'en',
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
			[['created_at', 'ASC']]
		),
};
// [
// 				'id',
// 				// Extract specific language from JSONB
// 				[literal(`title->>'${'fr'}'`), 'title'],
// 				[literal(`description->>'${'fr'}'`), 'description'],
// 				'created_at',
// 			],
