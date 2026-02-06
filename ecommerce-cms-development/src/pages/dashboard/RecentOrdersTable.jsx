import { ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const STATUS_CONFIG = {
	pending: {
		bg: "bg-amber-100",
		text: "text-amber-700",
		border: "border-amber-300",
		label: "Pending",
	},
	in_progress: {
		bg: "bg-blue-100",
		text: "text-blue-700",
		border: "border-blue-300",
		label: "In Progress",
	},
	cancelled: {
		bg: "bg-red-100",
		text: "text-red-700",
		border: "border-red-300",
		label: "Cancelled",
	},
	delivered: {
		bg: "bg-emerald-100",
		text: "text-emerald-700",
		border: "border-emerald-300",
		label: "Delivered",
	},
	return_requested: {
		bg: "bg-orange-100",
		text: "text-orange-700",
		border: "border-orange-300",
		label: "Return Requested",
	},
	returned: {
		bg: "bg-purple-100",
		text: "text-purple-700",
		border: "border-purple-300",
		label: "Returned",
	},
	refunded: {
		bg: "bg-pink-100",
		text: "text-pink-700",
		border: "border-pink-300",
		label: "Refunded",
	},
	exchanged: {
		bg: "bg-indigo-100",
		text: "text-indigo-700",
		border: "border-indigo-300",
		label: "Exchanged",
	},
};

const PAYMENT_BADGES = {
	COD: "bg-amber-50 text-amber-700 border-amber-200",
	card: "bg-blue-50 text-blue-700 border-blue-200",
	upi: "bg-purple-50 text-purple-700 border-purple-200",
	wallet: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function RecentOrdersTable({ data }) {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	return (
		<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
			<div className="p-6 border-b border-slate-200">
				<div className="flex items-center space-x-3">
					<div className="p-2 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg">
						<ShoppingBag className="w-5 h-5 text-white" />
					</div>
					<div>
						<h2 className="text-xl font-bold text-slate-800">Recent Orders</h2>
						<p className="text-sm text-slate-500">
							Latest transactions and updates
						</p>
					</div>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="bg-slate-50 border-b border-slate-200">
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Order ID
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Amount
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Payment
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Date
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-slate-100">
						{data.length === 0 ? (
							<tr>
								<td colSpan="6" className="px-6 py-16 text-center">
									<div className="flex flex-col items-center">
										<div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
											<ShoppingBag className="w-8 h-8 text-slate-400" />
										</div>
										<p className="text-slate-500 font-medium">No orders yet</p>
										<p className="text-sm text-slate-400 mt-1">
											Orders will appear here once placed
										</p>
									</div>
								</td>
							</tr>
						) : (
							data.map((order, index) => {
								const statusConfig = STATUS_CONFIG[order.status] || {
									bg: "bg-slate-100",
									text: "text-slate-700",
									border: "border-slate-300",
									label: order.status,
								};

								const paymentClass =
									PAYMENT_BADGES[order.payment_method] ||
									"bg-slate-50 text-slate-700 border-slate-200";

								return (
									<tr
										key={order.id}
										className="hover:bg-slate-50 transition-colors duration-150">
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="text-sm font-semibold text-slate-800">
												#{order.id}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="text-sm font-bold text-slate-900">
												Rs {order.total.toLocaleString()}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${paymentClass}`}>
												{order.payment_method.toUpperCase()}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
												{statusConfig.label}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="text-sm text-slate-600">
												{formatDate(order.created_at)}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<Link
												to="/orders"
												className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors">
												<Eye className="w-4 h-4" />
												<span className="text-sm font-medium">View</span>
											</Link>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>

			{data.length > 0 && (
				<div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
					<p className="text-sm text-slate-600">
						Showing{" "}
						<span className="font-semibold text-slate-800">{data.length}</span>{" "}
						recent orders
					</p>
				</div>
			)}
		</div>
	);
}
