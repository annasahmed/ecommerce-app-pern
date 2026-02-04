import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import ParentCategoryDrawer from "@/components/parentCategory/ParentCategoryDrawer";
import ParentCategoryTable from "@/components/parentCategory/ParentCategoryTable";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import ParentCategoryServices from "@/services/ParentCategoryServices";

const ParentCategory = () => {
	const { toggleDrawer, lang } = useContext(SidebarContext);
	const {
		data: parentCategoriesData,
		loading,
		error,
	} = useAsync(ParentCategoryServices.getAllParentCategory);

	const { t } = useTranslation();
	const toggleDrawerData = useToggleDrawer();
	const { serviceId } = toggleDrawerData;

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
			<PageTitle>{t("ParentCategory")}</PageTitle>
			<SearchAndFilter
				buttonText={t("AddParentCategory")}
				inputPlaceholder={t("SearchParentCategory")}
				onClick={toggleDrawer}
			/>
			<TableWrapperWithPagination
				loading={loading}
				error={error}
				data={parentCategoriesData}>
				<Table>
					<TableHeader>
						<tr>
							{/* <TableCell>
								<CheckBox
									type="checkbox"
									name="selectAll"
									id="selectAll"
									handleClick={handleSelectAll}
									isChecked={isCheckAll}
								/>
							</TableCell> */}
							<TableCell>{t("catIdTbl")}</TableCell>
							<TableCell>{t("catIconTbl")}</TableCell>
							<TableCell>{t("CatTbName")}</TableCell>
							<TableCell>{t("CatTbDescription")}</TableCell>
							<TableCell className="text-center">
								{t("catPublishedTbl")}
							</TableCell>
							<TableCell className="text-right">{t("catActionsTbl")}</TableCell>
						</tr>
					</TableHeader>
					<ParentCategoryTable
						data={parentCategoriesData.records}
						isCheck={isCheck}
						setIsCheck={setIsCheck}
						toggleDrawerData={toggleDrawerData}
					/>
				</Table>
			</TableWrapperWithPagination>
			<MainDrawer>
				<ParentCategoryDrawer
					id={serviceId}
					data={parentCategoriesData.records}
					lang={lang}
				/>
			</MainDrawer>
		</>
	);
};

export default ParentCategory;
