const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/AppBaseService.js');

const parentCategoryService = createAppBaseService(db.parent_category, {
	name: 'Parent Category',
});

module.exports = {
	getParentCategories: (req) =>
		parentCategoryService.list(
			req,
			[
				{
					model: db.category,
				},
			],
			[],
			[['created_at', 'ASC']]
		),
};
