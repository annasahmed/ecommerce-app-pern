import requests from "./httpService";

const BranchServices = {
	getAllBranches: async () => {
		return requests.get("/branch");
	},

	getBranchById: async (id) => {
		return requests.get(`/branch/${id}`);
	},

	addBranch: async (body) => {
		return requests.post("/branch", body);
	},

	updateBranch: async (id, body) => {
		return requests.patch(`/branch/${id}`, body);
	},

	updateStatus: async (id, body) => {
		return requests.patch(`/branch/${id}`, body);
	},

	deleteBranch: async (id, body) => {
		return requests.delete(`/branch/${id}`, body);
	},

	// addAllBranch: async (body) => {
	// 	return requests.post("/branch", body);
	// },

	// updateManyBranch: async (body) => {
	// 	return requests.patch("/branch/update/many", body);
	// },

	// deleteManyBranch: async (body) => {
	// 	return requests.patch("/branch/delete/many", body);
	// },
};

export default BranchServices;
