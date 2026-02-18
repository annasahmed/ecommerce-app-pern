import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import MainDrawer from "@/components/drawer/MainDrawer";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import OrderDetailsDrawer from "@/components/order/OrderDetailsDrawer";
import OrderTable from "@/components/order/OrderTable";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import OrderServices from "@/services/OrderServices";

const Order = () => {
	const { toggleDrawer, lang, setIsUpdate, isDrawerOpen } =
		useContext(SidebarContext);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState({});
	const limit = 10;
	const {
		data: ordersData,
		loading,
		error,
	} = useAsync(
		() =>
			OrderServices.getAllOrders(
				`limit=${limit}&page=${page}${filters.search ? `&search=${filters.search}` : ""}`,
			),
		[page, filters],
	);

	const toggleDrawerData = useToggleDrawer();
	const { serviceId } = toggleDrawerData;

	// 🔥 REFRESH ORDERS WHEN DRAWER CLOSES
	useEffect(() => {
		if (!isDrawerOpen) {
			setIsUpdate(true);
		}
	}, [isDrawerOpen, setIsUpdate]);

	const { t } = useTranslation();

	// react hooks
	const [isCheck, setIsCheck] = useState([]);
	const handleFilter = (values) => {
		setPage(1);
		setFilters(values);
	};

	return (
		<>
			<PageTitle>{t("Order")}</PageTitle>
			<SearchAndFilter
				buttonText={t("Add Order")}
				inputPlaceholder={t("Search Order")}
				onClick={toggleDrawer}
				showAddButtom={false}
				onSubmitFilter={handleFilter}
			/>

			<TableWrapperWithPagination
				loading={loading}
				error={error}
				data={ordersData}
				onPageChange={setPage}>
				<Table>
					<TableHeader>
						<tr>
							<TableCell>{t("IdTbl")}</TableCell>
							<TableCell>{t("Date")}</TableCell>
							<TableCell>{t("Tracking Id")}</TableCell>
							<TableCell>{t("Name")}</TableCell>
							<TableCell className="text-center">
								{t("Payment Method")}
							</TableCell>
							<TableCell>{t("Order Amount")}</TableCell>
							<TableCell>{t("Shipping")}</TableCell>
							<TableCell>{t("Total")}</TableCell>
							<TableCell>{t("Status")}</TableCell>
							<TableCell>{t("Action")}</TableCell>
						</tr>
					</TableHeader>
					<OrderTable
						data={ordersData.records}
						isCheck={isCheck}
						setIsCheck={setIsCheck}
						toggleDrawerData={toggleDrawerData}
					/>
				</Table>
			</TableWrapperWithPagination>
			<MainDrawer setIsUpdate={setIsUpdate}>
				<OrderDetailsDrawer
					id={serviceId}
					data={ordersData.records}
					lang={lang}
				/>
			</MainDrawer>
		</>
	);
};

export default Order;
