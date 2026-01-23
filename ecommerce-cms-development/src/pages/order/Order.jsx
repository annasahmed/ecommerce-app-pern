import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import PageTitle from "@/components/Typography/PageTitle";
import OrderTable from "@/components/order/OrderTable";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import OrderServices from "@/services/OrderServices";
import MainDrawer from "@/components/drawer/MainDrawer";
import OrderDrawer from "@/components/order/OrderDrawer";

const Order = () => {
	const { toggleDrawer, lang } = useContext(SidebarContext);
	const {
		data: ordersData,
		loading,
		error,
	} = useAsync(OrderServices.getAllOrders);
	const toggleDrawerData = useToggleDrawer();
	const { serviceId } = toggleDrawerData;

	const { t } = useTranslation();

	// react hooks
	const [isCheckAll, setIsCheckAll] = useState(false);
	const [isCheck, setIsCheck] = useState([]);

	const handleSelectAll = () => {
		setIsCheckAll(!isCheckAll);
		setIsCheck(data[0]?.children.map((li) => li.id));
		if (isCheckAll) {
			setIsCheck([]);
		}
	};

	return (
		<>
			<PageTitle>{t("Order")}</PageTitle>
			<SearchAndFilter
				buttonText={t("AddOrder")}
				inputPlaceholder={t("SearchOrder")}
				onClick={toggleDrawer}
			/>
			<TableWrapperWithPagination
				loading={loading}
				error={error}
				data={ordersData}>
				<Table>
					<TableHeader>
						<tr>
							<TableCell>{t("IdTbl")}</TableCell>
							<TableCell>{t("Date")}</TableCell>
							<TableCell>{t("Tracking Id")}</TableCell>
							<TableCell>{t("Name")}</TableCell>
							<TableCell className="text-center">{t("Payment Method")}</TableCell>
							<TableCell>{t("Order Amount")}</TableCell>
							<TableCell>{t("Shipping")}</TableCell>
							<TableCell>{t("Total")}</TableCell>
							<TableCell>{t("Status")}</TableCell>
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

			<MainDrawer>
				<OrderDrawer id={serviceId} data={ordersData.records} lang={lang} />
			</MainDrawer>
		</>
	);
};

export default Order;
