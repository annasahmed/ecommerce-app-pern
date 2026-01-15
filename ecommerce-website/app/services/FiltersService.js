import requests from "./httpServices";

const FiltersService = {
	getFiltersData: async () => {
		// Simulate an API call to fetch filter data
		try {
			const data = await requests.get("/filters");
			console.log(data, "chkisanid111");

			return data;
		} catch (err) {
			console.error("API error:", err);
		}
	},
};

export default FiltersService;
