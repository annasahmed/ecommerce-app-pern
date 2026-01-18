const { extractTranslation } = require('../../utils/transformerHelpers');

function extractLangField(obj, lang) {
	if (!obj || typeof obj !== 'object') return obj;
	return obj[lang] || Object.values(obj)[0] || null;
}

function transformBrand(brand, lang) {
	const translation = extractTranslation(brand.translations, lang);
	return {
		id: brand.id,
		title: translation.title,
		slug: translation.slug,
	};
}
function transformCategory(category, lang) {
	const translation = extractTranslation(category.translations, lang);
	return {
		id: category.id,
		title: translation.title,
		slug: translation.slug,
	};
}
function transformAttribute(category, lang) {
	const translation = extractTranslation(category.translations, lang);
	return {
		id: category.id,
		title: translation.title,
		slug: translation.slug,
	};
}

function transformFilterDataResponse(response, lang = 'en') {
	return {
		...response,
		categories: (response.categories || []).map((category) =>
			transformCategory(category, lang)
		),
		brands: (response.brands || []).map((brand) =>
			transformBrand(brand, lang)
		),
		attributes: (response.attributes || []).map((attr) => {
			const plainAttr = attr.get({ plain: true });
			return {
				...plainAttr,
				name: extractLangField(plainAttr.name, lang),
				values: Array.isArray(plainAttr.values)
					? plainAttr.values.map((v) => extractLangField(v, lang))
					: [],
			};
		}),
	};
}

module.exports = {
	transformFilterDataResponse,
};
