const db = require('../../db/models/index.js');
const createAppBaseService = require('../../utils/appBaseService.js');
const { translationInclude } = require('../../utils/includeHelpers.js');

const categoryService = createAppBaseService(db.category, {
	name: 'Category',
});

async function getAllDescendantCategoryIds(categoryId, includeOwnId = true) {
	const [rows] = await db.sequelize.query(
		`
		WITH RECURSIVE category_tree AS (
			SELECT id
			FROM category
			WHERE id = :categoryId

			UNION ALL

			SELECT c.id
			FROM category c
			INNER JOIN category_tree ct ON ct.id = c.parent_id
		)
		 SELECT id FROM category_tree
		 ${includeOwnId ? '' : ' WHERE id != :categoryId'};
		`,
		{ replacements: { categoryId } }
	);

	return rows.map((r) => r.id);
}

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
					as: 'cat_icon',
					required: false,
					attributes: ['url', 'title'],
				},
			],
			[],
			[['id', 'DESC']]
		),
	getAllDescendantCategoryIds,
};
