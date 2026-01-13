const { transformCategory } = require('./categoryTransformer');
const { extractLangField } = require('./productTransformer');

function transformHomepageSection(product, lang) {
	if (product.config.categories) {
		product.config.categories = product.config.categories.map((cat) =>
			transformCategory(cat, lang)
		);
	} else if (product.config.tabs) {
		product.config.tabs = product.config.tabs.map((cat) =>
			transformCategory(cat, lang)
		);
	} else if (product.config.category) {
		product.config.category = transformCategory(
			product.config.category,
			lang
		);
	} else if (product.config.images) {
		product.config.images = product.config.images.map((img) => img.url);
	} else if (product.config.image) {
		product.config.image = product.config.image.url;
	}
	if (product.title) {
		product.title = extractLangField(product.title, lang);
	}
	return {
		...product,
	};
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

function transformHomepageSectionsResponse(response, lang = 'en') {
	return response.map((section) => transformHomepageSection(section, lang));
}
module.exports = {
	transformHomepageSectionsResponse,
};
