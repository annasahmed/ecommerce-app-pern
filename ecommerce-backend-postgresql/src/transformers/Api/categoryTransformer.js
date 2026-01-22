const { extractTranslation } = require('../../utils/transformerHelpers');

function transformCategory(category, lang) {
	const translation = extractTranslation(category.translations, lang);
	return {
		// ...category,
		id: category.id,
		title: translation.title,
		description: translation.description,
		slug: translation.slug,
		icons: category.cat_icon?.url || null,
	};
}

function transformCategoriesResponse(response, lang = 'en') {
	return {
		...response,
		records: (response.records || []).map((category) =>
			transformCategory(category, lang)
		),
	};
}

module.exports = {
	transformCategory,
	transformCategoriesResponse,
};
