import requests from "./httpServices";

const ReturnedService = {
	getReturnEligibleItems: async (orderId) => {
		// Simulate an API call to fetch filter data
		try {
			const data = await requests.get(
				`/returned/${orderId}/return-eligible-items`,
			);
			return data;
		} catch (err) {
			console.error("API error:", err);
		}
	},
	requestReturn: async (formData) => {
		// Simulate an API call to fetch filter data
		try {
			const data = await requests.post(`/returned`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			return data;
		} catch (err) {
			throw new Error(err.message || err);
		}
	},
	// requestReturn: async (formData) => {
	// 	// Simulate an API call to fetch filter data
	// 	try {
	// 		const data = await requests.post(`/returned`, formData, {
	// 			headers: { "Content-Type": "multipart/form-data" },
	// 		});
	// 		return data;
	// 	} catch (err) {
	// 		// console.log(err, err.message);
	// 		throw new Error(err.message || err);
	// 		console.error("API error:", err);
	// 	}
	// },
};

export default ReturnedService;
