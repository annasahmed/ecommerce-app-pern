"use client";
import Image from "next/image";
import { useState } from "react";
import { Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/app/components/Shared/PrimaryButton";

export default function CartPage() {
	// ✅ Cart data in one object (easy to replace with API)
	const [cart, setCart] = useState({
		items: [
			{
				id: 1,
				name: "Minimalist Black Round Side Table",
				price: 120,
				discount: 50,
				quantity: 1,
				image: "/images/table1.png",
			},
			{
				id: 2,
				name: "Modern Wooden Lamp",
				price: 80,
				discount: 0,
				quantity: 2,
				image: "/images/lamp1.png",
			},
		],
		shipping: 10,
	});

	const updateQuantity = (id, type) => {
		setCart((prev) => ({
			...prev,
			items: prev.items.map((item) =>
				item.id === id
					? {
							...item,
							quantity:
								type === "increase"
									? item.quantity + 1
									: Math.max(1, item.quantity - 1),
					  }
					: item,
			),
		}));
	};

	const removeItem = (id) => {
		setCart((prev) => ({
			...prev,
			items: prev.items.filter((item) => item.id !== id),
		}));
	};

	const getSubtotal = () =>
		cart.items.reduce((acc, item) => {
			const discounted =
				item.discount > 0
					? item.price - (item.price * item.discount) / 100
					: item.price;
			return acc + discounted * item.quantity;
		}, 0);

	const subtotal = getSubtotal();
	const total = subtotal + cart.shipping;

	return (
		<section className="max-w-7xl mx-auto px-4 py-10">
			<h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

			{cart.items.length === 0 ? (
				<div className="text-center py-20 text-gray-500">
					<p>Your cart is empty.</p>
					<Button className="mt-4 bg-primary text-white">
						<ArrowLeft size={18} className="mr-2" />
						Continue Shopping
					</Button>
				</div>
			) : (
				<div className="grid lg:grid-cols-3 gap-10">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-6">
						{cart.items.map((item) => {
							const discounted =
								item.discount > 0
									? item.price - (item.price * item.discount) / 100
									: item.price;
							const subtotal = discounted * item.quantity;

							return (
								<div
									key={item.id}
									className="flex flex-col sm:flex-row items-center gap-6 border p-4 rounded-lg">
									<Image
										src={item.image}
										alt={item.name}
										width={120}
										height={120}
										className="rounded-md object-contain"
									/>

									<div className="flex-1 text-center sm:text-left">
										<h3 className="font-medium text-lg">{item.name}</h3>
										<div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
											<p className="text-primary font-semibold">
												${discounted.toFixed(2)}
											</p>
											{item.discount > 0 && (
												<span className="text-gray-400 line-through text-sm">
													${item.price.toFixed(2)}
												</span>
											)}
										</div>
									</div>

									{/* Quantity Controls */}
									<div className="flex items-center gap-3 border rounded-md px-2">
										<button
											onClick={() => updateQuantity(item.id, "decrease")}
											className="px-2 py-1 text-lg">
											-
										</button>
										<span>{item.quantity}</span>
										<button
											onClick={() => updateQuantity(item.id, "increase")}
											className="px-2 py-1 text-lg">
											+
										</button>
									</div>

									{/* Subtotal */}
									<p className="w-20 text-right font-semibold">
										${subtotal.toFixed(2)}
									</p>

									{/* Remove */}
									<button
										onClick={() => removeItem(item.id)}
										className="text-gray-500 hover:text-red-600 transition">
										<Trash2 size={18} />
									</button>
								</div>
							);
						})}
					</div>

					{/* Summary */}
					<div className="border rounded-lg p-6 h-fit bg-gray-50">
						<h2 className="text-xl font-semibold mb-4">Order Summary</h2>

						<div className="flex justify-between mb-2">
							<span>Subtotal</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>
						<div className="flex justify-between mb-2">
							<span>Shipping</span>
							<span>${cart.shipping.toFixed(2)}</span>
						</div>

						<hr className="my-3" />

						<div className="flex justify-between text-lg font-semibold mb-4">
							<span>Total</span>
							<span>${total.toFixed(2)}</span>
						</div>

						<Button className="w-full bg-primary text-white">
							Proceed to Checkout <ArrowRight className="ml-2" size={18} />
						</Button>

						<Button
							variant="outline"
							className="w-full mt-3 flex items-center justify-center gap-2">
							<ArrowLeft size={18} />
							Continue Shopping
						</Button>
					</div>
				</div>
			)}
		</section>
	);
}
