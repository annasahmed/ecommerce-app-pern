"use client";

import { createContext, useContext } from "react";

const StoreContext = createContext(null);

export function StoreProvider({ value, children }) {
	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}

export function useStore() {
	const context = useContext(StoreContext);
	if (!context) {
		throw new Error("Theme not found");
	}
	return useContext(StoreContext);
}
