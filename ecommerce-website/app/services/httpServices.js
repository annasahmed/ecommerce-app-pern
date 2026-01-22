import axios from "axios";
import { triggerAuthDrawer } from "../store/authEvents";

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	timeout: 50000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	withCredentials: true, // 🔥 required for HttpOnly refresh cookie
});

/* ================================
   Refresh Token State
================================ */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, response = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(response);
		}
	});
	failedQueue = [];
};

/* ================================
   Response Interceptor
================================ */
instance.interceptors.response.use(
	(response) => response.data,

	async (error) => {
		const originalRequest = error.config;
		const status = error.response?.status;

		// ❌ If refresh itself fails → don't retry
		if (originalRequest.url.includes("/auth/refresh")) {
			return Promise.reject(error);
		}

		// 🔁 Handle expired access token
		if (status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				// 🧵 Queue request while refresh in progress
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				}).then(() => instance(originalRequest));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				// 🔄 Call refresh endpoint (refresh token is in cookie)
				await instance.post("/auth/refresh");

				processQueue(null);
				return instance(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError);

				// 🚪 Optional: logout & redirect
				if (typeof window !== "undefined") {
					// window.location.href = "/login";
					triggerAuthDrawer();
				}

				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject({
			status,
			message:
				error.response?.data?.message ||
				error.message ||
				"Something went wrong",
			data: error.response?.data || null,
		});
	},
);

/* ================================
   Request Helpers
================================ */
const requests = {
	get: (url, config) => instance.get(url, config),
	post: (url, body, config) => instance.post(url, body, config),
	put: (url, body, config) => instance.put(url, body, config),
	delete: (url, config) => instance.delete(url, config),
};

export default requests;
