import { create } from "zustand";

export const useAuthUIStore = create((set) => ({
	authDrawerOpen: false,

	openAuthDrawer: () => set({ authDrawerOpen: true }),
	closeAuthDrawer: () => set({ authDrawerOpen: false }),
}));
