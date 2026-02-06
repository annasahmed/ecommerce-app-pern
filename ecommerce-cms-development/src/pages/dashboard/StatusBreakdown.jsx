import { Clock, Loader, XCircle, CheckCircle, RotateCcw, Package, CreditCard, RefreshCw } from "lucide-react";

const STATUS_CONFIG = {
	pending: {
		color: "from-amber-400 to-orange-500",
		bg: "bg-amber-50",
		text: "text-amber-700",
		icon: Clock,
		label: "Pending"
	},
	in_progress: {
		color: "from-blue-400 to-blue-600",
		bg: "bg-blue-50",
		text: "text-blue-700",
		icon: Loader,
		label: "In Progress"
	},
	cancelled: {
		color: "from-red-400 to-red-600",
		bg: "bg-red-50",
		text: "text-red-700",
		icon: XCircle,
		label: "Cancelled"
	},
	delivered: {
		color: "from-emerald-400 to-emerald-600",
		bg: "bg-emerald-50",
		text: "text-emerald-700",
		icon: CheckCircle,
		label: "Delivered"
	},
	return_requested: {
		color: "from-orange-400 to-orange-600",
		bg: "bg-orange-50",
		text: "text-orange-700",
		icon: RotateCcw,
		label: "Return Requested"
	},
	returned: {
		color: "from-purple-400 to-purple-600",
		bg: "bg-purple-50",
		text: "text-purple-700",
		icon: Package,
		label: "Returned"
	},
	refunded: {
		color: "from-pink-400 to-pink-600",
		bg: "bg-pink-50",
		text: "text-pink-700",
		icon: CreditCard,
		label: "Refunded"
	},
	exchanged: {
		color: "from-indigo-400 to-indigo-600",
		bg: "bg-indigo-50",
		text: "text-indigo-700",
		icon: RefreshCw,
		label: "Exchanged"
	},
};

function StatusCard({ status, count }) {
	const config = STATUS_CONFIG[status] || {
		color: "from-slate-400 to-slate-600",
		bg: "bg-slate-50",
		text: "text-slate-700",
		icon: Package,
		label: status.replace("_", " ").toUpperCase()
	};
	
	const Icon = config.icon;

	return (
		<div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
			<div className={`h-1 bg-gradient-to-r ${config.color}`}></div>
			<div className="p-6">
				<div className="flex items-center justify-between mb-3">
					<div className={`p-3 rounded-lg ${config.bg}`}>
						<Icon className={`w-6 h-6 ${config.text}`} />
					</div>
					<div className={`px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
						{count}
					</div>
				</div>
				<p className={`text-base font-semibold ${config.text}`}>
					{config.label}
				</p>
			</div>
		</div>
	);
}

export default function StatusBreakdown({ data }) {
	const totalOrders = Object.values(data).reduce((sum, count) => sum + count, 0);

	return (
		<div className="bg-white rounded-2xl shadow-lg p-6">
			<div className="mb-6">
				<h2 className="text-xl font-bold text-slate-800 mb-1">Order Status</h2>
				<p className="text-sm text-slate-500">
					Total: <span className="font-semibold text-slate-700">{totalOrders}</span> orders
				</p>
			</div>
			
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				{Object.entries(data).map(([status, count]) => (
					<StatusCard key={status} status={status} count={count} />
				))}
			</div>
		</div>
	);
}
