import requests from "./httpService";

const AuthServices = {
	login: async (body) => {
		return requests.post(`/auth/login`, body);
	},
};

export default AuthServices;
