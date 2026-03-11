import { create } from "zustand";

export const useAuthUIStore = create((set) => {
	return {
    authDrawerOpen: false,
    cartDrawerOpen: false,
    searchOpen: false,

    openAuthDrawer: () => set({ authDrawerOpen: true }),
    closeAuthDrawer: () => set({ authDrawerOpen: false }),
    openCartDrawer: () => set({ cartDrawerOpen: true }),
    closeCartDrawer: () => set({ cartDrawerOpen: false }),
    toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  };
});
