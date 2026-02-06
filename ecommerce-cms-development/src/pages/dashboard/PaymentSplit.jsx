import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Wallet, CreditCard, Banknote, DollarSign } from "lucide-react";

const PAYMENT_COLORS = {
	COD: "#F59E0B",
	card: "#3B82F6",
	upi: "#8B5CF6",
	wallet: "#10B981",
	default: "#64748B"
};

const PAYMENT_ICONS = {
	COD: Banknote,
	card: CreditCard,
	upi: Wallet,
	wallet: Wallet,
};

const CustomTooltip = ({ active, payload }) => {
	if (active && payload && payload.length) {
		const data = payload[0].payload;
		return (
			<div className="bg-white p-4 rounded-lg shadow-xl border border-slate-200">
				<p className="text-sm font-semibold text-slate-800 mb-2 capitalize">
					{data.payment_method}
				</p>
				<p className="text-sm text-slate-600">
					Revenue: <span className="font-bold text-emerald-600">Rs {data.revenue.toLocaleString()}</span>
				</p>
			</div>
		);
	}
	return null;
};

const CustomLegend = ({ payload }) => {
	return (
		<div className="flex flex-wrap justify-center gap-4 mt-4">
			{payload.map((entry, index) => {
				const Icon = PAYMENT_ICONS[entry.value] || DollarSign;
				return (
					<div key={index} className="flex items-center space-x-2">
						<div 
							className="w-3 h-3 rounded-full" 
							style={{ backgroundColor: entry.color }}
						></div>
						<Icon className="w-4 h-4 text-slate-500" />
						<span className="text-sm text-slate-600 font-medium capitalize">
							{entry.value}
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default function PaymentSplit({ data }) {
	const chartData = data.map(item => ({
		...item,
		fill: PAYMENT_COLORS[item.payment_method] || PAYMENT_COLORS.default
	}));

	const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

	return (
		<div className="bg-white rounded-2xl shadow-lg p-6">
			<div className="flex items-center space-x-3 mb-6">
				<div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
					<Wallet className="w-5 h-5 text-white" />
				</div>
				<div>
					<h2 className="text-xl font-bold text-slate-800">Payment Methods</h2>
					<p className="text-sm text-slate-500">
						Total Revenue: <span className="font-semibold text-emerald-600">Rs {totalRevenue.toLocaleString()}</span>
					</p>
				</div>
			</div>

			{data.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-16">
					<div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
						<Wallet className="w-10 h-10 text-slate-400" />
					</div>
					<p className="text-slate-500 font-medium">No payment data yet</p>
					<p className="text-sm text-slate-400 mt-1">Data will appear once you have completed orders</p>
				</div>
			) : (
				<div>
					<ResponsiveContainer width="100%" height={280}>
						<PieChart>
							<Pie
								data={chartData}
								dataKey="revenue"
								nameKey="payment_method"
								cx="50%"
								cy="50%"
								outerRadius={90}
								innerRadius={50}
								paddingAngle={2}
								label={({ payment_method, percent }) => 
									`${payment_method}: ${(percent * 100).toFixed(0)}%`
								}
								labelLine={{ stroke: '#94A3B8', strokeWidth: 1 }}
							>
								{chartData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.fill} />
								))}
							</Pie>
							<Tooltip content={<CustomTooltip />} />
							<Legend content={<CustomLegend />} />
						</PieChart>
					</ResponsiveContainer>
				</div>
			)}
		</div>
	);
}
