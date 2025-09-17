import requests from "./httpServices";

const AuthServices = {
	login: async (body) => {
		return requests.post("/auth/login", body);
	},
	register: async (body) => {
		return requests.post(`/auth/register`, body);
	},
};

export default AuthServices;
