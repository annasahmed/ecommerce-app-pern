"use client";

import { Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/app/components/Shared/PrimaryButton";
import { useCartStore } from "@/app/store/cartStore";
import { ENV_VARIABLES } from "@/app/constants/env_variables";
import { toast } from "react-toastify";
import BasePrice from "@/app/components/BaseComponents/BasePrice";
import BaseImage from "@/app/components/BaseComponents/BaseImage";
import PrimaryButton from "@/app/components/Shared/PrimaryButton";

export default function CartPage() {
	const { cart, removeFromCart, addToCart, clearCart } = useCartStore();

	// Update quantity handler
	const updateQuantity = (product, type) => {
		if (type === "increase") {
			addToCart(product, 1);
		} else {
			// Decrease only if quantity > 1
			const current = cart.find((item) => item.id === product.id);
			if (current && current.quantity > 1) {
				// Update by setting negative quantity (you can also add a decrease function in your store)
				addToCart(product, -1);
			}
		}
	};

	const removeItem = (id) => {
		removeFromCart(id);
		toast.success("Item removed from cart");
	};

	const getSubtotal = () =>
		cart.reduce((acc, item) => {
			const price = item.base_price ?? item.price ?? 0;
			return acc + price * item.quantity;
		}, 0);

	const shipping = 10; // fixed for now — you can replace later
	const subtotal = getSubtotal();
	const total = subtotal + shipping;

	return (
		<section className="max-w-7xl mx-auto px-4 py-10">
			<h1 className="h4 font-semibold mb-6">Shopping Cart</h1>

			{cart.length === 0 ? (
				<div className="text-center py-20 text-muted">
					<p>Your cart is empty.</p>
					<PrimaryButton className="mt-4 bg-primary text-light flex items-center gap-2">
						<ArrowLeft size={18} />
						Continue Shopping
					</PrimaryButton>
				</div>
			) : (
				<div className="grid lg:grid-cols-3 gap-10">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-6">
						{cart.map((item) => {
							const price = item.base_price ?? item.price ?? 0;
							const subtotal = price * item.quantity;
							console.log(item, "chkking item");

							return (
								<div
									key={item.id}
									className="flex flex-col sm:flex-row items-center gap-6 border p-4 rounded-lg">
									<BaseImage
										src={
											item.thumbnail
												? ENV_VARIABLES.IMAGE_BASE_URL + item.thumbnail
												: item.image || null
										}
										alt={item.title}
										width={120}
										height={120}
										className="rounded-md object-contain"
									/>

									<div className="flex-1 text-center sm:text-left">
										<h3 className="font-medium h5 line-clamp-2">
											{item.title}
										</h3>
										<BasePrice
											price={price}
											className="text-primary font-semibold mt-1"
										/>
									</div>

									{/* Quantity Controls */}
									<div className="flex items-center gap-3 border rounded-md px-2">
										<button
											onClick={() => updateQuantity(item, "decrease")}
											className="px-2 py-1 p2">
											-
										</button>
										<span className="p4">{item.quantity}</span>
										<button
											onClick={() => updateQuantity(item, "increase")}
											className="px-2 py-1 p2">
											+
										</button>
									</div>

									{/* Subtotal */}
									<BasePrice
										price={subtotal}
										className="w-20 text-right font-semibold"
									/>

									{/* Remove */}
									<button
										onClick={() => removeItem(item.id)}
										className="text-muted hover:text-red-600 transition">
										<Trash2 size={18} />
									</button>
								</div>
							);
						})}
					</div>

					{/* Summary */}
					<div className="border rounded-lg p-6 h-fit bg-gray-50">
						<h2 className="h4 font-semibold mb-4">Order Summary</h2>

						<div className="flex justify-between mb-2">
							<span>Subtotal</span>
							<BasePrice price={subtotal} />
						</div>
						<div className="flex justify-between mb-2">
							<span>Shipping</span>
							<BasePrice price={shipping} />
						</div>

						<hr className="my-3" />

						<div className="flex justify-between h6 font-semibold mb-4">
							<span>Total</span>
							<BasePrice price={total} />
						</div>

						<PrimaryButton
							link={"/checkout"}
							className="w-full bg-primary text-light flex items-center justify-center gap-2">
							Proceed to Checkout <ArrowRight size={18} />
						</PrimaryButton>

						<PrimaryButton
							link={"/products"}
							className="w-full mt-3 flex items-center justify-center gap-2">
							<ArrowLeft size={18} />
							Continue Shopping
						</PrimaryButton>
					</div>
				</div>
			)}
		</section>
	);
}
