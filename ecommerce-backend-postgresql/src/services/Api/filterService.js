const { Op, json } = require('sequelize');
const db = require('../../db/models');
const { translationInclude } = require('../../utils/includeHelpers');

async function getFiltersData(req) {
	const { categoryId } = req.params;
	const categories = await db.category.scope({ method: ['active'] }).findAll({
		where: { level: 1 },
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
	const brands = await db.brand.scope({ method: ['active'] }).findAll({
		include: [
			{
				model: db.brand_translation,
				as: 'translations',
				attributes: ['title', 'slug'],
				required: true,
				include: [translationInclude(req)],
			},
		],
		order: [
			[
				{ model: db.brand_translation, as: 'translations' },
				'title',
				'ASC',
			],
		],
	});

	const attributes = await db.attribute
		.scope({ method: ['active'] })
		.findAll({
			where: {
				[Op.or]: [
					json('name.en', 'size'),
					json('name.en', 'gender'),
					json('name.en', 'color'),
				],
			},
			attributes: ['id', 'name', 'values'],
		});

	return { categories, brands, attributes };
}

module.exports = {
	getFiltersData,
};
