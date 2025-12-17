const { extractTranslation } = require('../../utils/transformerHelpers');

function transformCategory(category, lang) {
	const translation = extractTranslation(category.translations, lang);
	return {
		id: category.id,
		title: translation.title,
		description: translation.description,
		slug: translation.slug,
		icons: category.medium?.url || null,
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
