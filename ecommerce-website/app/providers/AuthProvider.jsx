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
	const [loading, setLoading] = useState(true);

	// Load user on mount (check if still logged in via cookie)
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await requests.get("/auth/me"); // backend returns user info
				setUser(data);
			} catch (error) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		// fetchUser();
	}, []);

	// Login function
	const login = useCallback(async (email, password) => {
		await requests
			.post("/auth/login", { email, password })
			.then((res) => {
				setUser(res.user);
				return res;
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	// Register function
	const register = useCallback(async (email, password, name) => {
		const res = await requests.post("/auth/register", {
			email,
			password,
			name,
			user_type: "website",
		});
		setUser(res.user);
		return res;
	}, []);

	// Logout function
	const logout = useCallback(async () => {
		try {
			await requests.post("/auth/logout");
		} catch (e) {
			console.error("Logout failed", e);
		} finally {
			setUser(null);
		}
	}, []);

	// Auth context value
	const value = {
		user,
		login,
		register,
		logout,
		loading,
		isAuthenticated: !!user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
