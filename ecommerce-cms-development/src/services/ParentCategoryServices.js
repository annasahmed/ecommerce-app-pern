import requests from "./httpService";

const ParentCategoryServices = {
	getAllParentCategory: async () => {
		return requests.get("/parent-category");
	},

	getAllParentCategories: async () => {
		return requests.get("/parent-category");
	},

	getParentCategoryById: async (id) => {
		return requests.get(`/parent-category/${id}`);
	},

	addParentCategory: async (body) => {
		return requests.post("/parent-category", body);
	},

	addAllParentCategory: async (body) => {
		return requests.post("/parent-category/add/all", body);
	},

	updateParentCategory: async (id, body) => {
		return requests.patch(`/parent-category/${id}`, body);
	},

	updateStatus: async (id, body) => {
		return requests.patch(`/parent-category/${id}`, body);
	},

	deleteParentCategory: async (id, body) => {
		return requests.delete(`/parent-category/${id}`, body);
	},

	updateManyParentCategory: async (body) => {
		return requests.patch("/parent-category/update/many", body);
	},

	deleteManyParentCategory: async (body) => {
		return requests.patch("/parent-category/delete/many", body);
	},
};

export default ParentCategoryServices;
