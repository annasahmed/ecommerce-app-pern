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
	trackOrder: async (trackingId) => {
		if (!trackingId) {
			console.error("Tracking Id is required");
			throw new Error("Tracking Id is required");
		}
		try {
			const data = await requests.get(`/order/track/${trackingId}`);
			return data;
		} catch (err) {
			console.error("API error:", err);
		}
	},
};

export default OrderService;
