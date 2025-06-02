import requests from "./httpService";

const ParentCategoryServices = {
	getAllCategory: async () => {
		return requests.get("/parent-category");
	},

	getAllCategories: async () => {
		return requests.get("/parent-category/all");
	},

	getCategoryById: async (id) => {
		return requests.get(`/parent-category/${id}`);
	},

	addCategory: async (body) => {
		return requests.post("/parent-category/add", body);
	},

	addAllCategory: async (body) => {
		return requests.post("/parent-category/add/all", body);
	},

	updateCategory: async (id, body) => {
		return requests.put(`/parent-category/${id}`, body);
	},

	updateStatus: async (id, body) => {
		return requests.put(`/parent-category/status/${id}`, body);
	},

	deleteCategory: async (id, body) => {
		return requests.delete(`/parent-category/${id}`, body);
	},

	updateManyCategory: async (body) => {
		return requests.patch("/parent-category/update/many", body);
	},

	deleteManyCategory: async (body) => {
		return requests.patch("/parent-category/delete/many", body);
	},
};

export default ParentCategoryServices;
