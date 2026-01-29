import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

//internal import

import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import SubscriberTable from "@/components/subscriber/SubscriberTable";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import SubscriberServices from "@/services/SubscriberServices";

const Subscriber = () => {
	const {
		data: subscribersData,
		loading,
		error,
	} = useAsync(SubscriberServices.getAllSubscribers);

	const { t } = useTranslation();

	return (
		<>
			<PageTitle>{t("Website subscribers List")}</PageTitle>
			{/* <SearchAndFilter
				buttonText={t("Add Subscriber")}
				inputPlaceholder={t("Search Subscriber")}
				showAddButtom={false}
			/> */}
			<TableWrapperWithPagination
				loading={loading}
				error={error}
				data={subscribersData}>
				<Table>
					<TableHeader>
						<tr>
							<TableCell>{t("IdTbl")}</TableCell>
							{/* <TableCell>{t("Name")}</TableCell> */}
							<TableCell>{t("Email")}</TableCell>
							<TableCell>{t("Date")}</TableCell>
						</tr>
					</TableHeader>
					<SubscriberTable
						data={subscribersData.records}
					/>
				</Table>
			</TableWrapperWithPagination>
		</>
	);
};

export default Subscriber;
