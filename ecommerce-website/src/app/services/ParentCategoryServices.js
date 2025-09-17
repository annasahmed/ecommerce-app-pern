import requests from "./httpServices";

const ParentCategoryServices = {
	getParentCategories: async (themeName) => {
		try {
			const data = await requests.get("/parent-category");
			if (data && data.records?.length > 0) {
				return data;
			}
		} catch (err) {
			console.error("API error:", err);
		}

		const module = await import(`../data/${themeName}/data`);
		// const module = await import(`./${themeName}/data.js`);
		return module.parentCategories;
	},
};

export default ParentCategoryServices;
