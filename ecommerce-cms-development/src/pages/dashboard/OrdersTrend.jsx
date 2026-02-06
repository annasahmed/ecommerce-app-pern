import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp } from "lucide-react";

const CustomTooltip = ({ active, payload }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-4 rounded-lg shadow-xl border border-slate-200">
				<p className="text-sm font-medium text-slate-600 mb-2">{payload[0].payload.date}</p>
				<div className="space-y-1">
					<p className="text-sm">
						<span className="text-blue-600 font-semibold">Orders:</span> {payload[0].value}
					</p>
					<p className="text-sm">
						<span className="text-emerald-600 font-semibold">Revenue:</span> Rs {payload[1]?.value.toLocaleString()}
					</p>
				</div>
			</div>
		);
	}
	return null;
};

export default function OrdersTrend({ data, days, onChange }) {
	return (
		<div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
				<div className="flex items-center space-x-3">
					<div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
						<TrendingUp className="w-5 h-5 text-white" />
					</div>
					<div>
						<h2 className="text-xl font-bold text-slate-800">Orders Trend</h2>
						<p className="text-sm text-slate-500">Track your sales performance</p>
					</div>
				</div>
				
				<div className="flex space-x-2">
					<button
						onClick={() => onChange(7)}
						className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
							days === 7
								? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30"
								: "bg-slate-100 text-slate-600 hover:bg-slate-200"
						}`}>
						7 Days
					</button>
					<button
						onClick={() => onChange(30)}
						className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
							days === 30
								? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30"
								: "bg-slate-100 text-slate-600 hover:bg-slate-200"
						}`}>
						30 Days
					</button>
				</div>
			</div>

			{data.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-16">
					<div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
						<TrendingUp className="w-10 h-10 text-slate-400" />
					</div>
					<p className="text-slate-500 font-medium">No delivered orders yet</p>
					<p className="text-sm text-slate-400 mt-1">Data will appear once you have completed orders</p>
				</div>
			) : (
				<div className="mt-6">
					<ResponsiveContainer width="100%" height={320}>
						<LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
							<defs>
								<linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
									<stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
								</linearGradient>
								<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
									<stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
							<XAxis 
								dataKey="date" 
								tick={{ fill: '#64748B', fontSize: 12 }}
								stroke="#CBD5E1"
							/>
							<YAxis 
								tick={{ fill: '#64748B', fontSize: 12 }}
								stroke="#CBD5E1"
							/>
							<Tooltip content={<CustomTooltip />} />
							<Line 
								type="monotone" 
								dataKey="orders" 
								stroke="#3B82F6" 
								strokeWidth={3}
								dot={{ fill: '#3B82F6', r: 4 }}
								activeDot={{ r: 6 }}
								fill="url(#colorOrders)"
							/>
							<Line 
								type="monotone" 
								dataKey="revenue" 
								stroke="#10B981" 
								strokeWidth={3}
								dot={{ fill: '#10B981', r: 4 }}
								activeDot={{ r: 6 }}
								fill="url(#colorRevenue)"
							/>
						</LineChart>
					</ResponsiveContainer>
					
					{/* Legend */}
					<div className="flex items-center justify-center space-x-8 mt-6">
						<div className="flex items-center space-x-2">
							<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
							<span className="text-sm text-slate-600 font-medium">Orders</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
							<span className="text-sm text-slate-600 font-medium">Revenue</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
