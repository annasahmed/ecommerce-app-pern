import requests from "./httpServices";

const MetadataService = {
	getFiltersData: async () => {
		// Simulate an API call to fetch filter data
		try {
			const data = await requests.get("/metadata/filters");
			return data;
		} catch (err) {
			console.error("API error:", err);
		}
	},
	getNavCategories: async () => {
		// Simulate an API call to fetch filter data
		try {
			const data = await requests.get("/metadata/navCategories");
			return data;
		} catch (err) {
			console.error("API error:", err);
		}
	},
	getBrands: async () => {
		// Simulate an API call to fetch filter data
		try {
			const data = await requests.get("/metadata/brands");
			return data;
		} catch (err) {
			console.error("API error:", err);
		}
	},
};

export default MetadataService;
