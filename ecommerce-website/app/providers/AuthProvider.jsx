"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import requests from "../services/httpServices";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	// Load user on mount (check if still logged in via cookie)
	const fetchUser = async () => {
		try {
			const data = await requests.get("/auth/me"); // backend returns user info
			setUser(data.user);
			localStorage.setItem("auth_user", JSON.stringify(data.user));
		} catch (error) {
			setUser(null);
			// localStorage.removeItem("auth_user");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (typeof window === "undefined") return;
		const storedUser = localStorage?.getItem("auth_user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
			setLoading(false);
		} else {
			fetchUser();
		}
	}, []);

	// update user function
	const updateUser = useCallback(async (data = {}) => {
		return await requests
			.patch("/profile", data)
			.then((res) => {
				setUser(res);
				localStorage.setItem("auth_user", JSON.stringify(res));
				toast.success("Profile updated successfully");
				return res;
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	// change password function
	const changePassword = useCallback(async (data = {}) => {
		return await requests
			.patch("/auth/change-password", data)
			.then((res) => {
				setUser(res);
				localStorage.setItem("auth_user", JSON.stringify(res));
				toast.success("Password updated successfully");
				return res;
			})
			.catch((err) => {
				toast.error(
					err.message || "error updating password, please try again later",
				);
			});
	}, []);

	// Login function
	const login = useCallback(async (email, password) => {
		return await requests
			.post("/auth/login", { email, password })
			.then((res) => {
				setUser(res.user);
				localStorage.setItem("auth_user", JSON.stringify(res.user));
				return res.user;
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	// Register function
	const register = useCallback(async (email, password, name, otp) => {
		const res = await requests
			.post("/auth/register", {
				email,
				password,
				name,
				otp,
				user_type: "website",
			})
			.then((res) => {
				setUser(res.user);
				localStorage.setItem("auth_user", JSON.stringify(res.user));
				return res.user;
			})
			.catch((err) => {
				toast.error(err.message || err);
			});
		return res;
	}, []);

	// Register function
	const sendOtp = useCallback(async (email, name) => {
		const res = await requests.post("/auth/send-otp", {
			email,
			name,
		});
		return res;
	}, []);

	// Logout function
	const logout = useCallback(async () => {
		try {
			await requests.post("/auth/logout");
			toast.success("User logged out successfully");
			setUser(null);
		} catch (e) {
			console.error("Logout failed", e);
		} finally {
			setUser(null);
			localStorage.removeItem("auth_user");
		}
	}, []);

	// Auth context value
	const value = {
		user,
		login,
		register,
		logout,
		sendOtp,
		loading,
		isAuthenticated: !!user,
		updateUser,
		changePassword,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
