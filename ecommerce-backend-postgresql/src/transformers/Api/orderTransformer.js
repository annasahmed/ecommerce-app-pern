const { transformProduct } = require('./productTransformer');

function transformOrderResponse(order, lang = 'en') {
	if (!order) return {};
	order = order.get({ plain: true });
	return {
		...order,
		order_items: order.order_items?.map((v) => {
			return {
				...v,
				product: transformProduct(v.product),
			};
		}),
	};
}

function transformOrdersResponse(response, lang = 'en') {
	return response.map((order) => {
		return {
			...transformOrderResponse(order),
		};
	});
	return {
		...response,
		// records: (response.records || []).map((product) => product),
		records: (response.records || []).map((product) =>
			transformProduct(product, lang, true)
		),
	};
}

module.exports = {
	transformOrdersResponse,
	transformOrderResponse,
};
