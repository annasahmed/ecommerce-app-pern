"use client";

import SpinLoader from "@/app/components/Shared/SpinLoader";
import OrderService from "@/app/services/OrderService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TrackOrderPage() {
	const searchParams = useSearchParams();
	const paramsTrackingId = searchParams.get("id");
	const [trackingId, setTrackingId] = useState(paramsTrackingId || "");
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setOrder(null);
		router.push(`/order-tracking?id=${trackingId}`);
	};

	const fetchOrder = async () => {
		setLoading(true);
		setError("");
		setOrder(null);

		await OrderService.trackOrder(paramsTrackingId)
			.then((res) => {
				setOrder(res.order);
			})
			.catch((err) => {
				setError(err.message || "Failed to fetch order");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchOrder();
	}, [paramsTrackingId]);

	return (
		<div className="md:!max-w-4xl container-layout mx-auto section-layout">
			<h1 className="h1 font-bold text-secondary mb-6 text-center">
				Track Your Order
			</h1>

			{/* Form */}
			<form
				onSubmit={handleSubmit}
				className="flex flex-col md:flex-row gap-3 mb-8 justify-center items-center relative">
				<input
					type="text"
					placeholder="Enter your tracking ID"
					value={trackingId}
					onChange={(e) => setTrackingId(e.target.value)}
					className="w-full border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
					required
				/>
				<button
					type="submit"
					className="absolute top-0.25 right-0.25 bg-primary text-light px-6 py-3 rounded-r-lg hover:brightness-90 transition duration-300 font-medium shadow-md">
					{loading ? "Checking..." : "Track Order"}
				</button>
			</form>

			{/* Error */}
			{/* {error && (
				<p className="text-center text-red-400 font-semibold mb-4">{error}</p>
			)} */}

			{/* Order Details */}
			{loading ? (
				<>
					<SpinLoader />
				</>
			) : !order ? (
				<h4>Order not found</h4>
			) : (
				<div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 p4 space-y-6">
					<div className="flex justify-between items-center flex-wrap gap-3">
						<h2 className="h3 font-semibold text-gray-800">
							Order # {order.tracking_id}
						</h2>
						<span
							className={`px-4 py-1 rounded-full text-sm font-bold uppercase p4 tracking-wide shadow-sm ${
								order.status === "pending"
									? "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300"
									: order.status === "confirmed"
										? "bg-blue-100 text-blue-800 ring-1 ring-blue-300"
										: order.status === "cancelled"
											? "bg-red-100 text-red-800 ring-1 ring-red-300"
											: order.status === "delivered"
												? "bg-green-100 text-green-800 ring-1 ring-green-300"
												: "bg-gray-100 text-gray-800"
							}`}>
							{order.status}
						</span>
					</div>

					<div className="grid md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<p>
								<strong>Payment Method:</strong> {order.payment_method}
							</p>
							<p>
								<strong>Order Amount:</strong> Rs {order.order_amount}
							</p>
							<p>
								<strong>Shipping:</strong> Rs {order.shipping}
							</p>
							<p className="text-lg font-semibold">
								<strong>Total Amount:</strong> Rs {order.total}
							</p>
						</div>

						{/* Addresses */}
						<div className="space-y-4">
							<div>
								<strong className="block mb-1 text-gray-700">
									Shipping Address:
								</strong>
								<p>
									{order.shipping_address}
									{order.shipping_apartment && `, ${order.shipping_apartment}`}
								</p>
								<p>
									{order.shipping_city}, {order.shipping_country}{" "}
									{order.shipping_postal_code}
								</p>
							</div>

							<div>
								<strong className="block mb-1 text-gray-700">
									Billing Address:
								</strong>
								<p>
									{order.billing_address}
									{order.billing_apartment && `, ${order.billing_apartment}`}
								</p>
								<p>
									{order.billing_city}, {order.billing_country}{" "}
									{order.billing_postal_code}
								</p>
							</div>
						</div>
					</div>

					{/* Order Items */}
					<div>
						<strong className="block mb-2 text-gray-700">Items:</strong>
						<ul className="divide-y divide-gray-200 border-t border-b">
							{order.order_items.map((item, idx) => (
								<li
									key={`${item.productId}-${idx}`}
									className="py-3 flex justify-between items-center">
									<span>
										{item.product_title} x {item.quantity}
									</span>
									<span className="font-semibold">Rs {item.price}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}
