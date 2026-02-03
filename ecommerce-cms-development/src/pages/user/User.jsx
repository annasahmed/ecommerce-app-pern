import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import PageTitle from "@/components/Typography/PageTitle";
import UserTable from "@/components/user/UserTable";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import UserServices from "@/services/UserServices";
import MainDrawer from "@/components/drawer/MainDrawer";
import UserDrawer from "@/components/user/UserDrawer";

const User = () => {
	const { toggleDrawer, lang } = useContext(SidebarContext);
	const {
		data: usersData,
		loading,
		error,
	} = useAsync(UserServices.getAllUsers);
	const toggleDrawerData = useToggleDrawer();
	const { serviceId } = toggleDrawerData;

	const { t } = useTranslation();

	// react hooks

	return (
		<>
			<PageTitle>{t("User")}</PageTitle>
			<SearchAndFilter
				buttonText={t("AddUser")}
				inputPlaceholder={t("SearchUser")}
				onClick={toggleDrawer}
			/>
			<TableWrapperWithPagination
				loading={loading}
				error={error}
				data={usersData}>
				<Table>
					<TableHeader>
						<tr>
							<TableCell>{t("IdTbl")}</TableCell>
							<TableCell>{t("NameTbl")}</TableCell>
							<TableCell>{t("Email")}</TableCell>
							<TableCell>{t("Role")}</TableCell>
							<TableCell className="text-center">{t("Created At")}</TableCell>
							{/* <TableCell className="text-center">{t("Status")}</TableCell> */}
							<TableCell className="text-right">{t("ActionsTbl")}</TableCell>
						</tr>
					</TableHeader>
					<UserTable
						data={usersData.records}
						toggleDrawerData={toggleDrawerData}
					/>
				</Table>
			</TableWrapperWithPagination>

			<MainDrawer>
				<UserDrawer id={serviceId} data={usersData.records} lang={lang} />
			</MainDrawer>
		</>
	);
};

export default User;
