import requests from "./httpService";

const SubscriberServices = {
	getAllSubscribers: async () => {
		return requests.get("/subscriber");
	},
};

export default SubscriberServices;
