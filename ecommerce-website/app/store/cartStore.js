// store/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { trackEvent } from "../utils/trackEvent";

export const useCartStore = create(
	persist(
		(set, get) => ({
			cart: [],
			favourites: [],

			// --- CART ---
			addToCart: (product, quantity = 1) => {
				const cart = get().cart;

				const existing = cart.find((item) => {
					if (item.selectedVariant) {
						return (
							item.id === product.id &&
							item.selectedVariant.id === product.selectedVariant.id
						);
					} else {
						return item.sku === product.sku;
					}
					// return item.id === product.id;
				});
				// const existing = cart.find((item) => item.id === product.id);

				let updatedCart;
				if (existing) {
					updatedCart = cart.map((item) => {
						if (item.selectedVariant) {
							// For items with variants, match both product ID and variant ID
							return item.id === product.id &&
								item.selectedVariant.id === product.selectedVariant.id
								? { ...item, quantity: item.quantity + quantity }
								: item;
						} else {
							// For items without variants, match by SKU
							return item.sku === product.sku
								? { ...item, quantity: item.quantity + quantity }
								: item;
						}
					});
				} else {
					updatedCart = [...cart, { ...product, quantity }];
				}
				// if (existing) {
				// 	updatedCart = cart.map((item) => {
				// 		return item.id === product.id
				// 			? { ...item, quantity: item.quantity + quantity }
				// 			: item;
				// 	});
				// } else {
				// 	updatedCart = [...cart, { ...product, quantity }];
				// }
				set({ cart: updatedCart });
				trackEvent("AddToCart", {
					content_ids: [product.id],
					content_name: product.title,
					sku: product.sku,
					quantity: quantity,
					value: product.selectedVariant?.price || product.base_price,
					currency: "PKR",
				});
			},

			// removeFromCart: (id) => {
			// 	set({ cart: get().cart.filter((item) => item.id !== id) });
			// },

			removeFromCart: (product) => {
				set({
					cart: get().cart.filter((item) => {
						if (item.selectedVariant && product.selectedVariant) {
							// Remove only if both product ID and variant ID match
							return !(
								item.id === product.id &&
								item.selectedVariant.id === product.selectedVariant.id
							);
						} else {
							// Remove by SKU for products without variants
							return item.sku !== product.sku;
						}
					}),
				});
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
