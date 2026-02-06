import { TrendingUp, Calendar, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

function KpiCard({ title, value, sub, icon: Icon, gradient, iconColor }) {
	return (
		<Link
			to="/orders"
			className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${gradient}`}>
			<div className="p-6">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<p className="text-sm font-medium text-white/80 mb-1">{title}</p>
						<p className="text-4xl font-bold text-white mb-2">{value}</p>
						{sub && (
							<div className="flex items-center space-x-1 text-white/90">
								<DollarSign className="w-4 h-4" />
								<p className="text-sm font-medium">{sub}</p>
							</div>
						)}
					</div>
					<div
						className={`p-3 rounded-xl ${iconColor} bg-white/20 backdrop-blur-sm`}>
						<Icon className="w-7 h-7 text-white" />
					</div>
				</div>
			</div>

			{/* Decorative circles */}
			<div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
			<div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
		</Link>
	);
}

export default function KpiCards({ data }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			<KpiCard
				title="Today's Orders"
				value={data.today.count}
				sub={`Rs ${data.today.amount.toLocaleString()}`}
				icon={Calendar}
				gradient="bg-gradient-to-br from-blue-500 to-blue-700"
				iconColor="bg-blue-400"
			/>
			<KpiCard
				title="This Month"
				value={data.month.count}
				sub={`Rs ${data.month.amount.toLocaleString()}`}
				icon={TrendingUp}
				gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
				iconColor="bg-emerald-400"
			/>
			<KpiCard
				title="Pending Orders"
				value={data.pending.count}
				icon={Clock}
				gradient="bg-gradient-to-br from-amber-500 to-amber-700"
				iconColor="bg-amber-400"
			/>
		</div>
	);
}
