"use client";

import { useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import BasePrice from "@/app/components/BaseComponents/BasePrice";
import PrimaryButton from "@/app/components/Shared/PrimaryButton";
import BaseImage from "@/app/components/BaseComponents/BaseImage";
import { ENV_VARIABLES } from "@/app/constants/env_variables";
import { toast } from "react-toastify";
import OrderService from "@/app/services/OrderService";

export default function CheckoutPage() {
	const { cart, clearCart } = useCartStore();

	const [voucher, setVoucher] = useState("");
	const [formData, setFormData] = useState({
		email: "",
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		postalCode: "",
		country: "Pakistan",
		phone: "",
		paymentMethod: "cod",
		billingSameAsShipping: true,
	});
	const [billingAddress, setBillingAddress] = useState({
		country: "Pakistan",
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		postalCode: "",
		phone: "",
	});

	// ------------------ CALCULATIONS ------------------
	const subtotal = cart.reduce((acc, item) => {
		const price =
			(item.base_price || item.price) *
			(1 - (item.base_discount_percentage || 0) / 100);

		return acc + price * item.quantity;
	}, 0);

	const shipping = subtotal > 0 ? 200 : 0;
	const discount = voucher ? 0 : 0; // extend later
	const total = subtotal + shipping - discount;

	// ------------------ HANDLERS ------------------
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!cart.length) {
			toast.error("Your cart is empty");
			return;
		}

		console.log("ORDER PAYLOAD", {
			customer: formData,
			billingAddress: formData.billingSameAsShipping ? null : billingAddress,
			items: cart.map((item) => ({
				...item,
				finalPrice: (
					(item.base_price || item.price) *
					(1 - (item.base_discount_percentage || 0) / 100) *
					item.quantity
				).toFixed(2),
			})),
			summary: {
				subtotal,
				shipping,
				//  discount,
				total,
			},
		});

		try {
			const res = await OrderService.confirmOrder({
				customer: formData,
				billingAddress: formData.billingSameAsShipping ? null : billingAddress,
				items: cart.map((item) => {
					const unitPrice =
						(item.base_price || item.price) *
						(1 - (item.base_discount_percentage || 0) / 100);

					return {
						...item,
						finalPrice: Number((unitPrice * item.quantity).toFixed(2)),
					};
				}),
				summary: {
					subtotal,
					shipping,
					total,
				},
			});

			toast.success("Order placed successfully!");

			setFormData({
				email: "",
				firstName: "",
				lastName: "",
				address: "",
				city: "",
				postalCode: "",
				country: "Pakistan",
				phone: "",
				paymentMethod: "cod",
				billingSameAsShipping: true,
			});
			setBillingAddress({
				country: "Pakistan",
				firstName: "",
				lastName: "",
				address: "",
				city: "",
				postalCode: "",
				phone: "",
			});
			console.log("ORDER RESPONSE", res);
			// clearCart();
		} catch (err) {
			toast.error("Something went wrong while placing the order.");
			console.error("ORDER ERROR", err);
		}
	};

	// ------------------ UI ------------------
	return (
		<div className="max-w-7xl mx-auto px-4 py-10">
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 lg:grid-cols-12 gap-10">
				{/* LEFT */}
				<div className="lg:col-span-7 space-y-8">
					{/* Contact */}
					<section>
						<h2 className="text-lg font-semibold mb-3">Contact</h2>
						<input
							type="email"
							name="email"
							placeholder="Email or mobile phone number"
							className="w-full border rounded-md p-3"
							required
							value={formData.email}
							onChange={handleChange}
						/>
					</section>

					{/* Delivery */}
					<section>
						<h2 className="text-lg font-semibold mb-3">Delivery</h2>

						<select
							name="country"
							className="w-full border rounded-md p-3 mb-4"
							value={formData.country}
							onChange={handleChange}>
							<option>Pakistan</option>
						</select>

						<div className="grid grid-cols-2 gap-4 mb-4">
							<input
								name="firstName"
								placeholder="First name"
								className="border rounded-md p-3"
								required
								value={formData.firstName}
								onChange={handleChange}
							/>
							<input
								name="lastName"
								placeholder="Last name"
								className="border rounded-md p-3"
								required
								value={formData.lastName}
								onChange={handleChange}
							/>
						</div>

						<input
							name="address"
							placeholder="Address"
							className="w-full border rounded-md p-3 mb-4"
							required
							value={formData.address}
							onChange={handleChange}
						/>

						<div className="grid grid-cols-2 gap-4 mb-4">
							<input
								name="city"
								placeholder="City"
								className="border rounded-md p-3"
								required
								value={formData.city}
								onChange={handleChange}
							/>
							<input
								name="postalCode"
								placeholder="Postal code"
								className="border rounded-md p-3"
								value={formData.postalCode}
								onChange={handleChange}
							/>
						</div>

						<input
							name="phone"
							placeholder="Phone"
							className="w-full border rounded-md p-3"
							required
							value={formData.phone}
							onChange={handleChange}
						/>
					</section>

					{/* Shipping */}
					<section>
						<h2 className="text-lg font-semibold mb-3">Shipping method</h2>
						<label className="flex items-center justify-between border rounded-md p-4 cursor-pointer">
							<div className="flex items-center gap-2">
								<input type="radio" checked readOnly />
								<span>Standard</span>
							</div>
							<span>Rs 200</span>
						</label>
					</section>

					{/* Payment */}
					<section>
						<h2 className="text-lg font-semibold mb-3">Payment</h2>

						<label className="flex items-center gap-2 border rounded-md p-4 mb-2 cursor-pointer">
							<input
								type="radio"
								name="paymentMethod"
								value="cod"
								checked={formData.paymentMethod === "cod"}
								onChange={handleChange}
							/>
							Cash on Delivery (COD)
						</label>

						<label className="flex items-center gap-2 border rounded-md p-4 cursor-pointer opacity-50">
							<input type="radio" disabled />
							PayFast / Card (Coming Soon)
						</label>
					</section>

					{/* Billing Address */}
					<section>
						<h2 className="text-lg font-semibold mb-3">Billing address</h2>

						<div className="border rounded-md overflow-hidden">
							{/* Same as shipping */}
							<label
								className={`flex items-center gap-3 p-4 border-b cursor-pointer ${
									formData.billingSameAsShipping
										? "bg-secondary/10 border-secondary"
										: ""
								}`}>
								<input
									type="radio"
									name="billingSameAsShipping"
									checked={formData.billingSameAsShipping}
									onChange={() =>
										setFormData({ ...formData, billingSameAsShipping: true })
									}
								/>
								Same as shipping address
							</label>

							{/* Different billing */}
							<label
								className={`flex items-center gap-3 p-4 border-t cursor-pointer ${
									!formData.billingSameAsShipping
										? "bg-secondary/10 border-secondary"
										: ""
								}`}>
								<input
									type="radio"
									name="billingSameAsShipping"
									checked={!formData.billingSameAsShipping}
									onChange={() =>
										setFormData({ ...formData, billingSameAsShipping: false })
									}
								/>
								Use a different billing address
							</label>

							{/* Billing Form */}
							{!formData.billingSameAsShipping && (
								<div className="p-4 space-y-4 border-t bg-white">
									<select
										className="w-full border rounded-md p-3"
										value={billingAddress.country}
										onChange={(e) =>
											setBillingAddress({
												...billingAddress,
												country: e.target.value,
											})
										}>
										<option>Pakistan</option>
									</select>

									<div className="grid grid-cols-2 gap-4">
										<input
											placeholder="First name"
											className="border rounded-md p-3"
											value={billingAddress.firstName}
											onChange={(e) =>
												setBillingAddress({
													...billingAddress,
													firstName: e.target.value,
												})
											}
										/>
										<input
											placeholder="Last name"
											className="border rounded-md p-3"
											value={billingAddress.lastName}
											onChange={(e) =>
												setBillingAddress({
													...billingAddress,
													lastName: e.target.value,
												})
											}
										/>
									</div>

									<input
										placeholder="Address"
										className="border rounded-md p-3 w-full"
										value={billingAddress.address}
										onChange={(e) =>
											setBillingAddress({
												...billingAddress,
												address: e.target.value,
											})
										}
									/>

									{/* <input
										placeholder="Apartment, suite, etc. (optional)"
										className="border rounded-md p-3 w-full"
										value={billingAddress.apartment}
										onChange={(e) =>
											setBillingAddress({
												...billingAddress,
												apartment: e.target.value,
											})
										}
									/> */}

									<div className="grid grid-cols-2 gap-4">
										<input
											placeholder="City"
											className="border rounded-md p-3"
											value={billingAddress.city}
											onChange={(e) =>
												setBillingAddress({
													...billingAddress,
													city: e.target.value,
												})
											}
										/>
										<input
											placeholder="Postal code (optional)"
											className="border rounded-md p-3"
											value={billingAddress.postalCode}
											onChange={(e) =>
												setBillingAddress({
													...billingAddress,
													postalCode: e.target.value,
												})
											}
										/>
									</div>

									<input
										placeholder="Phone (optional)"
										className="border rounded-md p-3 w-full"
										value={billingAddress.phone}
										onChange={(e) =>
											setBillingAddress({
												...billingAddress,
												phone: e.target.value,
											})
										}
									/>
								</div>
							)}
						</div>
					</section>

					<PrimaryButton type="submit" className="w-full">
						Complete order
					</PrimaryButton>
				</div>

				{/* RIGHT */}
				<div className="lg:col-span-5 bg-gray-50 p-6 rounded-lg">
					{/* Cart */}
					<div className="space-y-4 mb-6">
						{cart.map((item) => (
							<div key={item.id} className="flex gap-4">
								<div className="relative">
									<BaseImage
										src={
											item.thumbnail
												? ENV_VARIABLES.IMAGE_BASE_URL + item.thumbnail
												: null
										}
										width={64}
										height={64}
										className="rounded-xl shadow-md w-20 h-20 object-contain border"
									/>
									<p className="p6 text-light px-2 py-0.5 flex justify-center items-center rounded-sm absolute -top-2 -right-2 bg-dark">
										{item.quantity}
									</p>
								</div>

								<div className="flex-1">
									<p className="p4 font-bold">{item.title}</p>
									<p className="p5 text-gray-500">Qty: {item.quantity}</p>
								</div>
								<BasePrice
									price={(
										(item.base_price || item.price) *
										(1 - (item.base_discount_percentage || 0) / 100) *
										item.quantity
									).toFixed(2)}
								/>
							</div>
						))}
					</div>

					{/* Voucher */}
					{/* <div className="flex gap-2 mb-6">
						<input
							placeholder="Discount code"
							className="border rounded-md p-2 flex-1"
							value={voucher}
							onChange={(e) => setVoucher(e.target.value)}
						/>
						<button type="button" className="border rounded-md px-4 text-sm">
							Apply
						</button>
					</div> */}

					{/* Totals */}
					<div className="space-y-2 p4">
						<div className="flex justify-between">
							<span>Subtotal</span>
							<BasePrice price={subtotal} />
						</div>
						<div className="flex justify-between">
							<span>Shipping</span>
							<BasePrice price={shipping} />
						</div>
						<hr />
						<h4 className="flex justify-between font-medium h5">
							<span>Total</span>
							<BasePrice price={total} />
						</h4>
					</div>
				</div>
			</form>
		</div>
	);
}
