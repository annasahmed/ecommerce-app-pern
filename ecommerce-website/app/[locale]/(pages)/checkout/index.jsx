"use client";

import { useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import BasePrice from "@/app/components/BaseComponents/BasePrice";
import PrimaryButton from "@/app/components/Shared/PrimaryButton";
import { ENV_VARIABLES } from "@/app/constants/env_variables";
import BaseImage from "@/app/components/BaseComponents/BaseImage";
import { toast } from "react-toastify";

export default function CheckoutPage() {
	const { cart, clearCart } = useCartStore();
	const [voucher, setVoucher] = useState("");
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		postalCode: "",
		country: "",
		paymentMethod: "cod",
	});

	// 🧮 Calculate totals dynamically from cart
	const subtotal = cart.reduce(
		(acc, item) => acc + (item.base_price ?? item.price ?? 0) * item.quantity,
		0,
	);
	const shipping = cart.length > 0 ? 20 : 0; // can be dynamic later
	const discount = voucher ? 15 : 0;
	const total = subtotal + shipping - discount;

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (cart.length === 0) {
			toast.error("Your cart is empty!");
			return;
		}

		console.log("✅ Order placed:", {
			customer: formData,
			voucher,
			cart,
			summary: { subtotal, shipping, discount, total },
		});

		toast.success("🎉 Order placed successfully!");
		clearCart();
	};

	return (
		<div className="max-w-6xl mx-auto py-10 px-4 md:px-6 lg:px-8">
			<h1 className="text-2xl md:text-3xl font-semibold mb-8">Checkout</h1>

			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* LEFT COLUMN - CUSTOMER DETAILS */}
				<div className="lg:col-span-2 space-y-8">
					{/* Personal Info */}
					<div className="bg-light border rounded-lg p-6 shadow-sm">
						<h2 className="h5 font-semibold mb-4">Personal Information</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{["firstName", "lastName", "email", "phone"].map((field) => (
								<input
									key={field}
									type={
										field === "email"
											? "email"
											: field === "phone"
											? "tel"
											: "text"
									}
									name={field}
									placeholder={
										field.charAt(0).toUpperCase() +
										field.slice(1).replace(/([A-Z])/g, " $1")
									}
									value={formData[field]}
									onChange={handleInputChange}
									className="border rounded-md p-2 w-full"
									required
								/>
							))}
						</div>
					</div>

					{/* Address */}
					<div className="bg-light border rounded-lg p-6 shadow-sm">
						<h2 className="h5 font-semibold mb-4">Delivery Address</h2>
						<textarea
							name="address"
							placeholder="Street Address"
							value={formData.address}
							onChange={handleInputChange}
							className="border rounded-md p-2 w-full mb-3"
							rows={3}
							required
						/>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{["city", "postalCode", "country"].map((field) => (
								<input
									key={field}
									type="text"
									name={field}
									placeholder={
										field.charAt(0).toUpperCase() +
										field.slice(1).replace(/([A-Z])/g, " $1")
									}
									value={formData[field]}
									onChange={handleInputChange}
									className="border rounded-md p-2 w-full"
									required
								/>
							))}
						</div>
					</div>

					{/* Payment */}
					<div className="bg-light border rounded-lg p-6 shadow-sm">
						<h2 className="h5 font-semibold mb-4">Payment Method</h2>
						<div className="flex flex-col gap-3">
							{["cod", "card", "paypal"].map((method) => (
								<label key={method} className="flex items-center gap-2">
									<input
										type="radio"
										name="paymentMethod"
										value={method}
										checked={formData.paymentMethod === method}
										onChange={handleInputChange}
									/>
									{method === "cod"
										? "Cash on Delivery"
										: method === "card"
										? "Credit / Debit Card"
										: "PayPal"}
								</label>
							))}
						</div>
					</div>
				</div>

				{/* RIGHT COLUMN - ORDER SUMMARY */}
				<div>
					<div className="bg-light border rounded-lg p-6 shadow-sm mb-6">
						<h2 className="h5 font-semibold mb-4">Order Summary</h2>

						{/* Cart Items */}
						{cart.length === 0 ? (
							<p className="text-gray-500 text-center p-4">
								No items in your cart.
							</p>
						) : (
							<div className="space-y-4">
								{cart.map((item) => (
									<div key={item.id} className="flex items-center gap-4">
										<BaseImage
											src={
												item.thumbnail
													? ENV_VARIABLES.IMAGE_BASE_URL + item.thumbnail
													: null
											}
											alt={item.title}
											width={60}
											height={60}
											className="rounded-md object-cover border"
										/>
										<div className="flex-1">
											<p className="p5 font-medium line-clamp-1">
												{item.title}
											</p>
											<p className="text-gray-500 text-sm">
												Qty: {item.quantity}
											</p>
										</div>
										<BasePrice
											className="font-medium"
											price={
												(item.base_price ?? item.price ?? 0) * item.quantity
											}
										/>
									</div>
								))}
							</div>
						)}

						<hr className="my-4" />

						{/* Summary Totals */}
						<div className="space-y-2 text-gray-700">
							<div className="flex justify-between">
								<span>Subtotal</span>
								<BasePrice price={subtotal} />
							</div>
							<div className="flex justify-between">
								<span>Shipping</span>
								<BasePrice price={shipping} />
							</div>
							{voucher && (
								<div className="flex justify-between text-green-600">
									<span>Discount</span>
									<BasePrice price={discount} />
								</div>
							)}
							<hr />
							<div className="flex justify-between font-semibold p4">
								<span>Total</span>
								<BasePrice price={total} />
							</div>
						</div>
					</div>

					{/* Voucher */}
					<div className="bg-light border rounded-lg p-6 shadow-sm mb-6">
						<h2 className="h5 font-semibold mb-4">Voucher Code</h2>
						<div className="flex gap-2">
							<input
								type="text"
								value={voucher}
								onChange={(e) => setVoucher(e.target.value)}
								placeholder="Enter voucher code"
								className="border rounded-md p-2 flex-1"
							/>
							<PrimaryButton
								type="button"
								onClick={() => toast.success("Voucher applied successfully!")}>
								Apply
							</PrimaryButton>
						</div>
					</div>

					{/* Place Order */}
					<PrimaryButton type="submit" className="w-full">
						Place Order
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
}
