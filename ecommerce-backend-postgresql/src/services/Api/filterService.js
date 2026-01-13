const db = require('../../db/models');
const { translationInclude } = require('../../utils/includeHelpers');

async function getFiltersData() {
	const categories = await db.category.scope({ method: ['active'] }).findAll({
		where: { parent_id: null },
		include: [
			{
				model: db.category_translation,
				as: 'translations',
				attributes: ['title', 'slug'],
				required: true,
				include: [translationInclude(req)],
			},
		],
		order: [
			[
				{ model: db.category_translation, as: 'translations' },
				'title',
				'ASC',
			],
		],
	});

	const brands = await db.brand.scope({ method: ['active'] }).findAll({});
}
