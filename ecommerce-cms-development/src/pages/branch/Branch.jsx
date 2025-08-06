import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import BranchTable from "@/components/branch/BranchTable";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import PageTitle from "@/components/Typography/PageTitle";
import UspDrawer from "@/components/usp/UspDrawer";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import BranchServices from "@/services/BranchServices";
import BranchDrawer from "@/components/branch/BranchDrawer";

const Usp = () => {
	const { toggleDrawer, lang } = useContext(SidebarContext);
	const {
		data: uspsData,
		loading,
		error,
	} = useAsync(BranchServices.getAllBranches);
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
			<PageTitle>{t("Branch")}</PageTitle>
			<SearchAndFilter
				buttonText={t("AddBranch")}
				inputPlaceholder={t("SearchBranch")}
				onClick={toggleDrawer}
			/>
			<TableWrapperWithPagination
				loading={loading}
				error={error}
				data={uspsData}>
				<Table>
					<TableHeader>
						<tr>
							<TableCell>
								<CheckBox
									type="checkbox"
									name="selectAll"
									id="selectAll"
									handleClick={handleSelectAll}
									isChecked={isCheckAll}
								/>
							</TableCell>
							<TableCell>{t("IdTbl")}</TableCell>
							<TableCell>{t("NameTbl")}</TableCell>
							<TableCell>{t("CodeTbl")}</TableCell>
							<TableCell>{t("LocationTbl")}</TableCell>
							<TableCell>{t("ContactTbl")}</TableCell>
							<TableCell>{t("TypeTbl")}</TableCell>
							<TableCell className="text-center">{t("PublishedTbl")}</TableCell>
							<TableCell className="text-right">{t("ActionsTbl")}</TableCell>
						</tr>
					</TableHeader>
					<BranchTable
						data={uspsData.records}
						isCheck={isCheck}
						setIsCheck={setIsCheck}
						toggleDrawerData={toggleDrawerData}
					/>
				</Table>
			</TableWrapperWithPagination>

			<MainDrawer>
				<BranchDrawer id={serviceId} data={uspsData.records} lang={lang} />
			</MainDrawer>
		</>
	);
};

export default Usp;
