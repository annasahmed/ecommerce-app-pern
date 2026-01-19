const { extractTranslation } = require('../../utils/transformerHelpers');

function extractLangField(obj, lang) {
	if (!obj || typeof obj !== 'object') return obj;
	return obj[lang] || Object.values(obj)[0] || null;
}

function transformCategory(category, lang) {
	const translation = extractTranslation(category.translations, lang);
	return {
		id: category.id,
		title: translation.title,
		description: translation.description,
		slug: translation.slug,
	};
}

function transformUSP(usp, lang) {
	const translation = extractTranslation(usp.translations, lang);
	return {
		id: usp.id,
		title: translation.title,
		description: translation.description,
		slug: translation.slug,
	};
}

function transformVendor(vendor, lang) {
	return {
		id: vendor.id,
		name: extractLangField(vendor.name, lang),
		address: extractLangField(vendor.address, lang),
		country: extractLangField(vendor.country, lang),
	};
}

function transformVariant(variant, lang) {
	// return variant;
	return {
		id: variant.id,
		sku: variant.sku,
		image: variant.medium ? variant.medium.url : null,
		// branches: (variant.branches || []).map((b) => ({
		// 	name: extractLangField(b.name, lang),
		// 	address: extractLangField(b.address, lang),
		// 	country: extractLangField(b.country, lang),
		// 	cost_price: b.pvb?.cost_price,
		// 	sale_price: b.pvb?.sale_price,
		// 	stock: b.pvb?.stock,
		// 	low_stock: b.pvb?.low_stock,
		// 	discount_percentage: b.pvb?.discount_percentage,
		// })),
		attributes: (variant.attributes || []).map((a) => ({
			id: a.id,
			name: extractLangField(a.name, lang),
			value: extractLangField(a.pva.value, lang),
		})),
	};
}

function transformProduct(product, lang) {
	const translation = extractTranslation(product.product_translations, lang);

	return {
		id: product.id,
		sku: product.sku,
		title: translation.title,
		excerpt: translation.excerpt,
		description: translation.description,
		slug: translation.slug,
		meta_title: product.meta_title,
		meta_description: product.meta_description,
		base_price: product.base_price,
		base_discount_percentage: product.base_discount_percentage,
		is_featured: product.is_featured,
		thumbnail: product.thumbnailImage ? product.thumbnailImage.url : null,
		images: [
			...(product.thumbnailImage ? [product.thumbnailImage.url] : []),
			...product.images?.map((v) => v.url),
		],

		categories: (product.categories || []).map((cat) =>
			transformCategory(cat, lang)
		),

		usps: (product.usps || []).map((u) => transformUSP(u, lang)),

		vendors: (product.vendors || []).map((v) => transformVendor(v, lang)),

		variants: (product.product_variants || []).map((v) =>
			transformVariant(v, lang)
		),

		created_at: product.created_at,
	};
}

function transformProductsResponse(response, lang = 'en') {
	return {
		...response,
		// records: (response.records || []).map((product) => product),
		records: (response.records || []).map((product) =>
			transformProduct(product, lang)
		),
	};
}

module.exports = {
	transformProductsResponse,
	transformProduct,
	transformCategory,
	extractLangField,
};
