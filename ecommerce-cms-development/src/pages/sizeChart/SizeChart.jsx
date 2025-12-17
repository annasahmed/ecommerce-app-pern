import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import PageTitle from "@/components/Typography/PageTitle";
import SizeChartTable from "@/components/sizeChart/SizeChartTable";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import SizeChartServices from "@/services/SizeChartServices";
import MainDrawer from "@/components/drawer/MainDrawer";
import SizeChartDrawer from "@/components/sizeChart/SizeChartDrawer";

const SizeChart = () => {
	const { toggleDrawer, lang } = useContext(SidebarContext);
	const {
		data: sizeChartsData,
		loading,
		error,
	} = useAsync(SizeChartServices.getAllSizeCharts);
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
			<PageTitle>{t("SizeChart")}</PageTitle>
			<SearchAndFilter
				buttonText={t("AddSizeChart")}
				inputPlaceholder={t("SearchSizeChart")}
				onClick={toggleDrawer}
			/>
			<TableWrapperWithPagination
				loading={loading}
				error={error}
				data={sizeChartsData}>
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
							<TableCell>{t("DescriptionTbl")}</TableCell>
							<TableCell className="text-center">{t("ActionsTbl")}</TableCell>
						</tr>
					</TableHeader>
					<SizeChartTable
						data={sizeChartsData.records}
						isCheck={isCheck}
						setIsCheck={setIsCheck}
						toggleDrawerData={toggleDrawerData}
					/>
				</Table>
			</TableWrapperWithPagination>

			<MainDrawer>
				<SizeChartDrawer
					id={serviceId}
					data={sizeChartsData.records}
					lang={lang}
				/>
			</MainDrawer>
		</>
	);
};

export default SizeChart;
