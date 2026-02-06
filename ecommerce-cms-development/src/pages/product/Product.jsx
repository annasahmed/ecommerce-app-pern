import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

//internal import

import ProductDrawer from "@/components/product/ProductDrawer";
import ProductTable from "@/components/product/ProductTable";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import ProductServices from "@/services/ProductServices";
import UploadProductsExcel from "@/components/product/UploadProductsExcel";

const Product = () => {
	const { toggleDrawer, lang } = useContext(SidebarContext);
	const {
		data: productsData,
		loading,
		error,
	} = useAsync(ProductServices.getAllProducts);
	const history = useHistory();
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
			<PageTitle>{t("Product")}</PageTitle>
			<SearchAndFilter
				buttonText={t("AddProduct")}
				inputPlaceholder={t("SearchProduct")}
				onClick={toggleDrawer}
				showImportButton
				// onClick={() => {
				// 	if (serviceId) {
				// 		history.push(`/product/update/${serviceId}`);
				// 	} else {
				// 		history.push("/product/add");
				// 	}
				// }}
			/>
			<UploadProductsExcel />
			{/* <UploadProductsExcel /> */}
			<TableWrapperWithPagination
				loading={loading}
				error={error}
				data={productsData}>
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
							<TableCell>{t("IdTbl")}</TableCell>
							<TableCell>{t("NameTbl")}</TableCell>
							<TableCell>{t("Brand")}</TableCell>
							<TableCell>{t("SKUTbl")}</TableCell>
							{/* <TableCell>{t("CategoriesTbl")}</TableCell> */}
							<TableCell className="text-center">{t("PublishedTbl")}</TableCell>
							<TableCell className="text-right">{t("ActionsTbl")}</TableCell>
						</tr>
					</TableHeader>
					<ProductTable
						data={productsData.records}
						isCheck={isCheck}
						setIsCheck={setIsCheck}
						toggleDrawerData={toggleDrawerData}
					/>
				</Table>
			</TableWrapperWithPagination>

			<MainDrawer>
				<ProductDrawer id={serviceId} data={productsData.records} lang={lang} />
			</MainDrawer>
		</>
	);
};

export default Product;
