import {
	Pagination,
	Table,
	TableCell,
	TableContainer,
	TableFooter,
	TableHeader,
	WindmillContext,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
import { ImCreditCard, ImStack } from "react-icons/im";

// internal import
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import LineChart from "@/components/chart/LineChart/LineChart";
import PieChart from "@/components/chart/Pie/PieChart";
import CardItem from "@/components/dashboard/CardItem";
import CardItemTwo from "@/components/dashboard/CardItemTwo";
import ChartCard from "@/components/chart/ChartCard";
import OrderTable from "@/components/order/OrderTable";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import OrderServices from "@/services/OrderServices";
import AnimatedContent from "@/components/common/AnimatedContent";

const Dashboard = () => {
	const { t } = useTranslation();
	const { mode } = useContext(WindmillContext);

	dayjs.extend(isBetween);
	dayjs.extend(isToday);
	dayjs.extend(isYesterday);

	const { currentPage, handleChangePage } = useContext(SidebarContext);

	// React hook
	const [todayOrderAmount, setTodayOrderAmount] = useState(0);
	const [yesterdayOrderAmount, setYesterdayOrderAmount] = useState(0);
	const [salesReport, setSalesReport] = useState([]);
	const [todayCashPayment, setTodayCashPayment] = useState(0);
	const [todayCardPayment, setTodayCardPayment] = useState(0);
	const [todayCreditPayment, setTodayCreditPayment] = useState(0);
	const [yesterdayCashPayment, setYesterdayCashPayment] = useState(0);
	const [yesterdayCardPayment, setYesterdayCardPayment] = useState(0);
	const [yesterdayCreditPayment, setYesterdayCreditPayment] = useState(0);

	const {
		data: bestSellerProductChart,
		loading: loadingBestSellerProduct,
		error,
	} = useAsync(OrderServices.getBestSellerProductChart);

	const { data: dashboardRecentOrder, loading: loadingRecentOrder } = useAsync(
		() =>
			OrderServices.getDashboardRecentOrder({ page: currentPage, limit: 8 }),
	);

	const { data: dashboardOrderCount, loading: loadingOrderCount } = useAsync(
		OrderServices.getDashboardCount,
	);

	const { data: dashboardOrderAmount, loading: loadingOrderAmount } = useAsync(
		OrderServices.getDashboardAmount,
	);
	const { dataTable, serviceData } = useFilter(dashboardRecentOrder?.orders);

	// Handle the sales report and payment methods
	useEffect(() => {
		// Code for processing dashboard data here...
	}, [dashboardOrderAmount]);

	return (
		<>
			<PageTitle>{t("DashboardOverview")}</PageTitle>

			<AnimatedContent>
				<div className="grid gap-2 mb-8 xl:grid-cols-5 md:grid-cols-2">
					<CardItemTwo
						mode={mode}
						title="Today Order"
						title2="TodayOrder"
						Icon={ImStack}
						cash={todayCashPayment || 0}
						card={todayCardPayment || 0}
						credit={todayCreditPayment || 0}
						price={todayOrderAmount || 0}
						className="text-customWhite dark:text-customTeal-100 bg-customTeal-600"
						loading={loadingOrderAmount}
					/>

					<CardItemTwo
						mode={mode}
						title="Yesterday Order"
						title2="YesterdayOrder"
						Icon={ImStack}
						cash={yesterdayCashPayment || 0}
						card={yesterdayCardPayment || 0}
						credit={yesterdayCreditPayment || 0}
						price={yesterdayOrderAmount || 0}
						className="text-customWhite dark:text-customOrange-100 bg-customOrange-400"
						loading={loadingOrderAmount}
					/>

					<CardItemTwo
						mode={mode}
						title2="ThisMonth"
						Icon={FiShoppingCart}
						price={dashboardOrderAmount?.thisMonthlyOrderAmount || 0}
						className="text-customWhite dark:text-customTeal-100 bg-customBlue-500"
						loading={loadingOrderAmount}
					/>

					<CardItemTwo
						mode={mode}
						title2="LastMonth"
						Icon={ImCreditCard}
						loading={loadingOrderAmount}
						price={dashboardOrderAmount?.lastMonthOrderAmount || 0}
						className="text-customWhite dark:text-customTeal-100 bg-customTeal-600"
					/>

					<CardItemTwo
						mode={mode}
						title2="AllTimeSales"
						Icon={ImCreditCard}
						price={dashboardOrderAmount?.totalAmount || 0}
						className="text-customWhite dark:text-customTeal-100 bg-customTeal-600"
						loading={loadingOrderAmount}
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
					<CardItem
						title="Total Order"
						Icon={FiShoppingCart}
						loading={loadingOrderCount}
						quantity={dashboardOrderCount?.totalOrder || 0}
						className="text-customOrange-600 dark:text-customOrange-100 bg-customOrange-100 dark:bg-customOrange-500"
					/>
					<CardItem
						title={t("OrderPending")}
						Icon={FiRefreshCw}
						loading={loadingOrderCount}
						quantity={dashboardOrderCount?.totalPendingOrder?.count || 0}
						amount={dashboardOrderCount?.totalPendingOrder?.total || 0}
						className="text-customBlue-600 dark:text-customBlue-100 bg-customBlue-100 dark:bg-customBlue-500"
					/>
					<CardItem
						title={t("OrderProcessing")}
						Icon={FiTruck}
						loading={loadingOrderCount}
						quantity={dashboardOrderCount?.totalProcessingOrder || 0}
						className="text-customTeal-600 dark:text-customTeal-100 bg-customTeal-100 dark:bg-customTeal-500"
					/>
					<CardItem
						title={t("OrderDelivered")}
						Icon={FiCheck}
						loading={loadingOrderCount}
						quantity={dashboardOrderCount?.totalDeliveredOrder || 0}
						className="text-customTeal-600 dark:text-customTeal-100 bg-customTeal-100 dark:bg-customTeal-500"
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-2 my-8">
					<ChartCard
						mode={mode}
						loading={loadingOrderAmount}
						title={t("WeeklySales")}>
						<LineChart salesReport={salesReport} />
					</ChartCard>

					<ChartCard
						mode={mode}
						loading={loadingBestSellerProduct}
						title={t("BestSellingProducts")}>
						<PieChart data={bestSellerProductChart} />
					</ChartCard>
				</div>
			</AnimatedContent>

			<PageTitle>{t("RecentOrder")}</PageTitle>

			{loadingRecentOrder ? (
				<TableLoading row={5} col={4} />
			) : error ? (
				<span className="text-center mx-auto text-customRed-500">{error}</span>
			) : serviceData?.length !== 0 ? (
				<TableContainer className="mb-8">
					<Table>
						<TableHeader>
							<tr>
								<TableCell>{t("OrderID")}</TableCell>
								<TableCell>{t("CustomerName")}</TableCell>
								<TableCell>{t("TotalAmount")}</TableCell>
								<TableCell>{t("OrderStatus")}</TableCell>
							</tr>
						</TableHeader>
						<TableFooter>
							<Pagination />
						</TableFooter>
					</Table>
				</TableContainer>
			) : (
				<NotFound title="Sorry, There are no orders right now." />
			)}
		</>
	);
};

export default Dashboard;
