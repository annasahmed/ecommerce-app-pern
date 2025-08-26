import requests from "./httpServices";

const ParentCategoryServices = {
	getParentCategories: async () => {
		return requests.get("/parent-category");
	},
};

export default ParentCategoryServices;
