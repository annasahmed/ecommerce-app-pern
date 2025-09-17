import requests from "./httpServices";

const LanguageServices = {
	getLanguages: async () => {
		return requests.get("/language");
	},
};

export default LanguageServices;
