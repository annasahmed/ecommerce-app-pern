import requests from "./httpService";

const MediaServices = {
	getAllMedia: async () => {
		return requests.get("/media?limit=1000");
	},

	addMedia: async (body) => {
		return requests.post("/media", body, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},

	deleteMedia: async (id, body) => {
		return requests.delete(`/media/${id}`, body);
	},
};

export default MediaServices;
