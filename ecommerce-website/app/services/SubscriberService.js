import requests from "./httpServices";

const SubscriberService = {
	createSubscriber: async (requestBody) => {
		try {
			const data = await requests.post("/subscriber", requestBody);
			return data;
		} catch (err) {
			throw new Error(err.message || err);
			console.error("API error:", err);
		}
	},
};

export default SubscriberService;
