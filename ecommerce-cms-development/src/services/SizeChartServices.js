import requests from "./httpService";

const SizeChartServices = {
	getAllSizeChart: async () => {
		return requests.get("/sizeChart");
	},

	getAllSizeCharts: async () => {
		return requests.get("/sizeChart");
	},

	getSizeChartById: async (id) => {
		return requests.get(`/sizeChart/${id}`);
	},

	addSizeChart: async (body) => {
		return requests.post("/sizeChart", body);
	},

	addAllSizeChart: async (body) => {
		return requests.post("/sizeChart", body);
	},

	updateSizeChart: async (id, body) => {
		return requests.patch(`/sizeChart/${id}`, body);
	},

	updateStatus: async (id, body) => {
		return requests.patch(`/sizeChart/${id}`, body);
	},

	deleteSizeChart: async (id, body) => {
		return requests.delete(`/sizeChart/${id}`, body);
	},

	updateManySizeChart: async (body) => {
		return requests.patch("/sizeChart/update/many", body);
	},

	deleteManySizeChart: async (body) => {
		return requests.patch("/sizeChart/delete/many", body);
	},
};

export default SizeChartServices;
