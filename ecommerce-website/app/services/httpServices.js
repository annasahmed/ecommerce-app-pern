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
	withCredentials: true, // <-- sends cookies
});

// ✅ Global response interceptor
instance.interceptors.response.use(
	(response) => {
		return response.data;
	},
	async (error) => {
		const status = error.response?.status || 500;
		const originalRequest = error.config;
		if (originalRequest.url.includes("/auth/refresh")) {
			return Promise.reject(error);
		}
		// Handle 401 (unauthorized) — Try refreshing the access token first
		if (status === 401 && !originalRequest._retry) {
			// if (status === 401 && !error.config._retry) {
			originalRequest._retry = true;
			try {
				//  Attempt to refresh tokens via backend refresh endpoint
				await instance.post("/auth/refresh");

				//  Retry the original failed request
				return instance(originalRequest);
			} catch (refreshError) {
				console.error("Refresh token failed:", refreshError);

				// Optional: clear user auth state if using store/context
				// const { logout } = useAuthStore.getState();
				// logout();

				//  Redirect to login if refresh fails
				// if (typeof window !== "undefined") {
				// 	window.location.href = "/login";
				// }
				return Promise.reject(refreshError);
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
	get: async (url, config) => {
		return await instance.get(url, config);
	},
	post: async (url, body, config) => await instance.post(url, body, config),
	put: async (url, body, config) => await instance.put(url, body, config),
	delete: async (url, config) => await instance.delete(url, config),
};

export default requests;
