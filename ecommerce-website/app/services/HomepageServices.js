import requests from "./httpServices";

const HomepageService = {
	getHomepageSections: async () => {
		try {
			const data = await requests.get("/homepage-sections");
			return data;
		} catch (err) {
			console.error("API error:", err);
		}
	},
};

export default HomepageService;
