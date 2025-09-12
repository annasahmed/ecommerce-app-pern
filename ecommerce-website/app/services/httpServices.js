import axios from "axios";

// 👇 import your auth store / logout util
// e.g. if you’re using Zustand/Context/NextAuth, adjust this part
// import { clearAuth } from "../providers/auth";

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	timeout: 50000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export const setToken = (token) => {
	if (token) {
		instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete instance.defaults.headers.common["Authorization"];
	}
};

// ✅ Global response interceptor
instance.interceptors.response.use(
	(response) => {
		return response.data;
	},
	async (error) => {
		const status = error.response?.status || 500;

		if (status === 401) {
			// 🚨 Token expired / user unauthorized → auto logout
			// clearAuth(); // e.g. remove token from storage, reset store, etc.

			// Optional: redirect to login page
			if (typeof window !== "undefined") {
				window.location.href = "/login";
			}
		}

		const customError = {
			status,
			message:
				error.response?.data?.message || error.message || "Unknown error",
			data: error.response?.data || null,
		};

		if (process.env.NODE_ENV === "development") {
			console.error("API Error:", customError);
		}

		return Promise.reject(customError);
	},
);

const requests = {
	get: (url, config) => instance.get(url, config),
	post: (url, body, config) => instance.post(url, body, config),
	put: (url, body, config) => instance.put(url, body, config),
};

export default requests;
