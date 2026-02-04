import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import CategoryDrawer from "@/components/category/CategoryDrawer";
import CategoryTable from "@/components/category/CategoryTable";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import CategoryServices from "@/services/CategoryServices";

const Category = () => {
	const { toggleDrawer, lang } = useContext(SidebarContext);
	const {
		data: categoriesData,
		loading,
		error,
	} = useAsync(CategoryServices.getAllCategory);

	const { t } = useTranslation();
	const { serviceId } = useToggleDrawer();

	// react hooks
	const [isCheckAll, setIsCheckAll] = useState(false);
	const [isCheck, setIsCheck] = useState([]);
	const [showChild, setShowChild] = useState(false);

	const handleSelectAll = () => {
		setIsCheckAll(!isCheckAll);
		setIsCheck(data[0]?.children.map((li) => li.id));
		if (isCheckAll) {
			setIsCheck([]);
		}
	};

	return (
		<>
			<PageTitle>{t("Category")}</PageTitle>
			<SearchAndFilter
				buttonText={t("AddCategory")}
				inputPlaceholder={t("SearchCategory")}
				onClick={toggleDrawer}
			/>
			<TableWrapperWithPagination
				loading={loading}
				error={error}
				data={{ records: categoriesData }}>
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
					<CategoryTable
						data={categoriesData}
						categories={categoriesData}
						isCheck={isCheck}
						setIsCheck={setIsCheck}
					/>
				</Table>
			</TableWrapperWithPagination>
			{/* <MainDrawer>
				<CategoryDrawer
					id={serviceId}
					data={categoriesData.records}
					lang={lang}
				/>
			</MainDrawer> */}
		</>
	);
};

export default Category;
