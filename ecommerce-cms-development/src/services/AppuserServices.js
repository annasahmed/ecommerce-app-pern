import requests from "./httpService";

const AppuserServices = {
	getAllAppuser: async () => {
		return requests.get("/appuser");
	},

	updateAppuser: async (id, body) => {
		return requests.patch(`/appuser/${id}`, body);
	},

	updateStatus: async (id, body) => {
		return requests.patch(`/appuser/${id}`, body);
	},
};

export default AppuserServices;
