import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import PageTitle from "@/components/Typography/PageTitle";
import UspTable from "@/components/usp/UspTable";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import UspServices from "@/services/UspServices";
import MainDrawer from "@/components/drawer/MainDrawer";
import UspDrawer from "@/components/usp/UspDrawer";

const Usp = () => {
	const { toggleDrawer, lang } = useContext(SidebarContext);
	const {
		data: uspsData,
		loading,
		error,
	} = useAsync(UspServices.getAllUsps);
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
			<PageTitle>{t("Usp")}</PageTitle>
			<SearchAndFilter
				buttonText={t("AddUsp")}
				inputPlaceholder={t("SearchUsp")}
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
							<TableCell>{t("ValuesTbl")}</TableCell>
							<TableCell className="text-center">{t("PublishedTbl")}</TableCell>
							<TableCell className="text-right">{t("ActionsTbl")}</TableCell>
						</tr>
					</TableHeader>
					<UspTable
						data={uspsData.records}
						isCheck={isCheck}
						setIsCheck={setIsCheck}
						toggleDrawerData={toggleDrawerData}
					/>
				</Table>
			</TableWrapperWithPagination>

			<MainDrawer>
				<UspDrawer
					id={serviceId}
					data={uspsData.records}
					lang={lang}
				/>
			</MainDrawer>
		</>
	);
};

export default Usp;
