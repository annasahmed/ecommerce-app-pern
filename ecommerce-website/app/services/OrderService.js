import requests from "./httpServices";

const OrderService = {
	confirmOrder: async (requestBody) => {
		// Simulate an API call to fetch filter data
		try {
			const data = await requests.post("/order/confirm-order", requestBody);
			return data;
		} catch (err) {
			console.error("API error:", err);
		}
	},
};

export default OrderService;
