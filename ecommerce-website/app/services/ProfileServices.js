import requests from "./httpServices";

const ProfileServices = {
	addOrUpdateAddress: async (body) => {
		return requests.patch("/profile/address", body);
	},
};

export default ProfileServices;
