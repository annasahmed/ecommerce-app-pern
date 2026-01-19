const { Op, json } = require('sequelize');
const db = require('../../db/models');
const { translationInclude } = require('../../utils/includeHelpers');
const { getAllDescendantCategoryIds } = require('./categoryService');

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

async function getNavCategories(req) {
	const categories = await db.category.scope('active').findAll({
		where: {
			parent_id: null,
		},
		attributes: ['id'],
		include: [
			{
				model: db.category.scope('active'),
				as: 'children',
				where: { level: 2 },
				attributes: ['id'],
				required: false,
				include: [
					{
						model: db.category.scope('active'),
						as: 'children',
						where: { level: 3 },
						attributes: ['id'],
						required: false,
						include: [
							{
								model: db.category_translation,
								as: 'translations',
								attributes: ['title', 'slug'],
								include: [translationInclude(req)],
							},
						],
					},
					{
						model: db.category_translation,
						as: 'translations',
						attributes: ['title'],
						include: [translationInclude(req)],
					},
				],
			},
			{
				model: db.category_translation,
				as: 'translations',
				attributes: ['title', 'slug'],
				include: [translationInclude(req)],
			},
		],
		order: [['id', 'ASC']],
		limit: 9,
	});

	return categories;
}
async function getBrands(req) {
	const brands = await db.brand.scope('active').findAll({
		attributes: ['id'],
		include: [
			{
				model: db.brand_translation,
				as: 'translations',
				attributes: ['title', 'slug'],
				include: [translationInclude(req)],
			},
		],
		order: [['id', 'ASC']],
		limit: 9,
	});

	return brands;
}

module.exports = {
	getFiltersData,
	getNavCategories,
	getBrands,
};
