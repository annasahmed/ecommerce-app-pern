import requests from "./httpService";

const HomepageSectionsServices = {
	getHomepageSections: async () => {
		return requests.get("/homepage-sections");
	},

	addHomepageSection: async (body) => {
		return requests.post("/homepage-sections", body);
	},

	updateHomepageSection: async (id, body) => {
		return requests.patch(`/homepage-sections/${id}`, body);
	},

	updateStatus: async (id, body) => {
		return requests.patch(`/homepage-sections/${id}`, body);
	},

	reorderHomepageSection: async (body) => {
		return requests.patch(`/homepage-sections/reorder`, body);
	},

	deleteHomepageSection: async (id, body) => {
		return requests.delete(`/homepage-sections/${id}`, body);
	},
};

export default HomepageSectionsServices;
