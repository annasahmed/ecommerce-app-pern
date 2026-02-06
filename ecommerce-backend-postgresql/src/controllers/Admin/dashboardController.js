const catchAsync = require('../../utils/catchAsync');
const { adminDashboardService } = require('../../services/Admin');
const { startOfDay, endOfDay, startOfMonth, endOfMonth } = require('date-fns');

const getDashboardData = catchAsync(async (req, res) => {
	const todayStart = startOfDay(new Date());
	const todayEnd = endOfDay(new Date());

	const monthStart = startOfMonth(new Date());
	const monthEnd = endOfMonth(new Date());
	const days = req.query.days === '30' ? 30 : 7;
	const [
		today,
		month,
		pending,
		trend,
		statusBreakdown,
		paymentSplit,
		recentOrders,
	] = await Promise.all([
		adminDashboardService.getTodayKPI(todayStart, todayEnd),
		adminDashboardService.getMonthKPI(monthStart, monthEnd),
		adminDashboardService.getPendingKPI(),
		adminDashboardService.getOrdersTrend(days),
		adminDashboardService.getOrderStatusBreakdown(),
		adminDashboardService.getRevenueByPaymentMethod(),
		adminDashboardService.getRecentOrders(),
	]);

	res.send({
		today,
		month,
		pending,
		trend,
		statusBreakdown,
		paymentSplit,
		recentOrders,
	});
});

module.exports = {
	getDashboardData,
};
