const { extractTranslation } = require('../../utils/transformerHelpers');

function transformParentCategory(product, lang) {
	const translation = extractTranslation(product.translations, lang);

	return {
		id: product.id,
		title: translation.title,
		description: translation.description,
		slug: translation.slug,
		icons: product.medium?.url,
	};
}

function transformParentCategoriesResponse(response, lang = 'en') {
	return {
		...response,
		records: (response.records || []).map((category) =>
			transformParentCategory(category, lang)
		),
	};
}

module.exports = {
	transformParentCategory,
	transformParentCategoriesResponse,
};
