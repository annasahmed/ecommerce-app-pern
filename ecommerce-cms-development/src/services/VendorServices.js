import requests from "./httpService";

const VendorServices = {
	getAllVendors: async () => {
		return requests.get("/vendor");
	},

	getVendorById: async (id) => {
		return requests.get(`/vendor/${id}`);
	},

	addVendor: async (body) => {
		return requests.post("/vendor", body);
	},

	updateVendor: async (id, body) => {
		return requests.patch(`/vendor/${id}`, body);
	},

	updateStatus: async (id, body) => {
		return requests.patch(`/vendor/${id}`, body);
	},

	deleteVendor: async (id, body) => {
		return requests.delete(`/vendor/${id}`, body);
	},

	// addAllVendor: async (body) => {
	// 	return requests.post("/vendor", body);
	// },

	// updateManyVendor: async (body) => {
	// 	return requests.patch("/vendor/update/many", body);
	// },

	// deleteManyVendor: async (body) => {
	// 	return requests.patch("/vendor/delete/many", body);
	// },
};

export default VendorServices;
