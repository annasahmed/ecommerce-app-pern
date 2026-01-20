// store/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
	persist(
		(set, get) => ({
			cart: [],
			favourites: [],

			// --- CART ---
			addToCart: (product, quantity = 1) => {
				quantity = product.quantity || quantity;
				const cart = get().cart;
				const existing = cart.find((item) => item.id === product.id);

				let updatedCart;
				if (existing) {
					updatedCart = cart.map((item) =>
						item.id === product.id
							? { ...item, quantity: item.quantity + quantity }
							: item,
					);
				} else {
					updatedCart = [...cart, { ...product, quantity }];
				}
				set({ cart: updatedCart });
			},

			removeFromCart: (id) => {
				set({ cart: get().cart.filter((item) => item.id !== id) });
			},

			clearCart: () => set({ cart: [] }),

			// --- FAVOURITES ---
			toggleFavourite: (product) => {
				const favourites = get().favourites;
				const exists = favourites.find((item) => item.id === product.id);
				const updated = exists
					? favourites.filter((item) => item.id !== product.id)
					: [...favourites, product];
				set({ favourites: updated });
			},

			clearFavourites: () => set({ favourites: [] }),
		}),
		{
			name: "ecommerce-storage", // key in localStorage
		},
	),
);
