"use client";

import { useEffect } from "react";
import { useAuthUIStore } from "../store/useAuthUIStore";
import { registerAuthDrawer } from "../store/authEvents";

export default function AppProviders({ children }) {
	const openAuthDrawer = useAuthUIStore((s) => s.openAuthDrawer);

	useEffect(() => {
		registerAuthDrawer(openAuthDrawer);
	}, [openAuthDrawer]);

	return children;
}
