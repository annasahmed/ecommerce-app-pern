"use client";
import { useState } from "react";

export default function CheckoutPage() {
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

	const orderSummary = {
		subtotal: 180,
		shipping: 20,
		discount: voucher ? 15 : 0,
		total: 180 + 20 - (voucher ? 15 : 0),
		items: [
			{
				id: 1,
				name: "Modern Wooden Chair",
				price: 120,
				quantity: 1,
			},
			{
				id: 2,
				name: "Stylish Lamp",
				price: 60,
				quantity: 1,
			},
		],
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Order placed:", { formData, voucher, orderSummary });
		alert("Order placed successfully!");
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="max-w-6xl mx-auto py-10 px-4 md:px-6 lg:px-8">
			<h1 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">
				Checkout
			</h1>

			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left Column - Details */}
				<div className="lg:col-span-2 space-y-8">
					{/* Personal Info */}
					<div className="bg-white border rounded-lg p-6 shadow-sm">
						<h2 className="text-lg font-semibold mb-4 text-gray-800">
							Personal Information
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<input
								type="text"
								name="firstName"
								placeholder="First Name"
								value={formData.firstName}
								onChange={handleInputChange}
								className="border rounded-md p-2 w-full"
								required
							/>
							<input
								type="text"
								name="lastName"
								placeholder="Last Name"
								value={formData.lastName}
								onChange={handleInputChange}
								className="border rounded-md p-2 w-full"
								required
							/>
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={formData.email}
								onChange={handleInputChange}
								className="border rounded-md p-2 w-full"
								required
							/>
							<input
								type="tel"
								name="phone"
								placeholder="Phone"
								value={formData.phone}
								onChange={handleInputChange}
								className="border rounded-md p-2 w-full"
								required
							/>
						</div>
					</div>

					{/* Delivery Address */}
					<div className="bg-white border rounded-lg p-6 shadow-sm">
						<h2 className="text-lg font-semibold mb-4 text-gray-800">
							Delivery Address
						</h2>
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
							<input
								type="text"
								name="city"
								placeholder="City"
								value={formData.city}
								onChange={handleInputChange}
								className="border rounded-md p-2 w-full"
								required
							/>
							<input
								type="text"
								name="postalCode"
								placeholder="Postal Code"
								value={formData.postalCode}
								onChange={handleInputChange}
								className="border rounded-md p-2 w-full"
								required
							/>
							<input
								type="text"
								name="country"
								placeholder="Country"
								value={formData.country}
								onChange={handleInputChange}
								className="border rounded-md p-2 w-full"
								required
							/>
						</div>
					</div>

					{/* Payment Method */}
					<div className="bg-white border rounded-lg p-6 shadow-sm">
						<h2 className="text-lg font-semibold mb-4 text-gray-800">
							Payment Method
						</h2>
						<div className="flex flex-col gap-3">
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="paymentMethod"
									value="cod"
									checked={formData.paymentMethod === "cod"}
									onChange={handleInputChange}
								/>
								Cash on Delivery
							</label>
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="paymentMethod"
									value="card"
									checked={formData.paymentMethod === "card"}
									onChange={handleInputChange}
								/>
								Credit / Debit Card
							</label>
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="paymentMethod"
									value="paypal"
									checked={formData.paymentMethod === "paypal"}
									onChange={handleInputChange}
								/>
								PayPal
							</label>
						</div>
					</div>
				</div>

				{/* Right Column - Order Summary */}
				<div>
					<div className="bg-white border rounded-lg p-6 shadow-sm mb-6">
						<h2 className="text-lg font-semibold mb-4 text-gray-800">
							Order Summary
						</h2>
						<div className="space-y-4">
							{orderSummary.items.map((item) => (
								<div key={item.id} className="flex items-center gap-4">
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-800">
											{item.name}
										</p>
										<p className="text-sm text-gray-500">
											Qty: {item.quantity}
										</p>
									</div>
									<p className="text-sm font-semibold text-gray-800">
										${item.price.toFixed(2)}
									</p>
								</div>
							))}
						</div>
						<hr className="my-4" />
						<div className="space-y-2 text-sm text-gray-700">
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span>${orderSummary.subtotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Shipping</span>
								<span>${orderSummary.shipping.toFixed(2)}</span>
							</div>
							{voucher && (
								<div className="flex justify-between text-green-600">
									<span>Discount</span>
									<span>- ${orderSummary.discount.toFixed(2)}</span>
								</div>
							)}
							<hr />
							<div className="flex justify-between font-semibold text-gray-900 text-base">
								<span>Total</span>
								<span>${orderSummary.total.toFixed(2)}</span>
							</div>
						</div>
					</div>

					{/* Voucher */}
					<div className="bg-white border rounded-lg p-6 shadow-sm mb-6">
						<h2 className="text-lg font-semibold mb-4 text-gray-800">
							Voucher Code
						</h2>
						<div className="flex gap-2">
							<input
								type="text"
								value={voucher}
								onChange={(e) => setVoucher(e.target.value)}
								placeholder="Enter voucher code"
								className="border rounded-md p-2 flex-1"
							/>
							<button
								type="button"
								onClick={() => alert("Voucher Applied!")}
								className="bg-black text-white px-4 py-2 rounded-md text-sm">
								Apply
							</button>
						</div>
					</div>

					{/* Place Order Button */}
					<button
						type="submit"
						className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition">
						Place Order
					</button>
				</div>
			</form>
		</div>
	);
}
