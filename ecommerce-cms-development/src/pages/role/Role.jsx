import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import PageTitle from "@/components/Typography/PageTitle";
import RoleTable from "@/components/role/RoleTable";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import RoleServices from "@/services/RoleServices";
import MainDrawer from "@/components/drawer/MainDrawer";
import RoleDrawer from "@/components/role/RoleDrawer";

const Role = () => {
	const { toggleDrawer, lang } = useContext(SidebarContext);
	const {
		data: rolesData,
		loading,
		error,
	} = useAsync(RoleServices.getAllRoles);
	const toggleDrawerData = useToggleDrawer();
	const { serviceId } = toggleDrawerData;
	console.log(serviceId, "chkking serviceId roles page");

	const { t } = useTranslation();

	// react hooks

	return (
		<>
			<PageTitle>{t("Role")}</PageTitle>
			<SearchAndFilter
				buttonText={t("Add Role")}
				inputPlaceholder={t("Search Role")}
				onClick={toggleDrawer}
			/>
			<TableWrapperWithPagination
				loading={loading}
				error={error}
				data={rolesData}>
				<Table>
					<TableHeader>
						<tr>
							<TableCell>{t("IdTbl")}</TableCell>
							<TableCell>{t("NameTbl")}</TableCell>
							{/* <TableCell>{t("Email")}</TableCell> */}
							{/* <TableCell>{t("Role")}</TableCell> */}
							<TableCell className="text-center">{t("Created At")}</TableCell>
							{/* <TableCell className="text-center">{t("Status")}</TableCell> */}
							<TableCell className="text-right">{t("ActionsTbl")}</TableCell>
						</tr>
					</TableHeader>
					<RoleTable
						data={rolesData.records}
						toggleDrawerData={toggleDrawerData}
					/>
				</Table>
			</TableWrapperWithPagination>

			<MainDrawer>
				<RoleDrawer id={serviceId} data={rolesData.records} lang={lang} />
			</MainDrawer>
		</>
	);
};

export default Role;
