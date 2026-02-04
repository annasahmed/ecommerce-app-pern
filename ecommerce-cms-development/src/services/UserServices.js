import requests from "./httpService";

const UserServices = {
	getAllUsers: async () => {
		return requests.get("/user");
	},

	getUserById: async (id) => {
		return requests.get(`/user/${id}`);
	},

	addUser: async (body) => {
		return requests.post("/user", body);
	},

	updateUser: async (id, body) => {
		return requests.patch(`/user/${id}`, body);
	},

	updateStatus: async (id, body) => {
		return requests.patch(`/user/${id}`, body);
	},

	deleteUser: async (id, body) => {
		return requests.delete(`/user/${id}`, body);
	},
};

export default UserServices;
