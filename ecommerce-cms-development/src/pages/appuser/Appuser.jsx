import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

//internal import

import AppuserTable from "@/components/appuser/AppuserTable";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import AppuserServices from "@/services/AppuserServices";

const Appuser = () => {
	const {
		data: appusersData,
		loading,
		error,
	} = useAsync(AppuserServices.getAllAppuser);

	const { t } = useTranslation();

	return (
		<>
			<PageTitle>{t("Customers")}</PageTitle>
			<SearchAndFilter
				buttonText={t("AddAppuser")}
				inputPlaceholder={t("Search Customer")}
				showAddButtom={false}
			/>
			<div>
				<TableWrapperWithPagination
					loading={loading}
					error={error}
					data={appusersData}>
					<Table>
						<TableHeader>
							<tr>
								<TableCell>{t("IdTbl")}</TableCell>
								<TableCell>{t("NameTbl")}</TableCell>
								<TableCell>{t("Email")}</TableCell>
								<TableCell>{t("Phone")}</TableCell>
								<TableCell className="text-center">{t("Created At")}</TableCell>
								<TableCell className="text-center">{t("ActionsTbl")}</TableCell>
							</tr>
						</TableHeader>
						<AppuserTable data={appusersData.records} />
					</Table>
				</TableWrapperWithPagination>
			</div>
		</>
	);
};

export default Appuser;
