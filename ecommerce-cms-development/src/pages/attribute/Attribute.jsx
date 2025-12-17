import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import CheckBox from "@/components/form/others/CheckBox";
import SearchAndFilter from "@/components/newComponents/SearchAndFilter";
import TableWrapperWithPagination from "@/components/newComponents/TableWrapperWithPagination";
import PageTitle from "@/components/Typography/PageTitle";
import AttributeTable from "@/components/attribute/AttributeTable";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import AttributeServices from "@/services/AttributeServices";
import MainDrawer from "@/components/drawer/MainDrawer";
import AttributeDrawer from "@/components/attribute/AttributeDrawer";

const Attribute = () => {
	const { toggleDrawer, lang } = useContext(SidebarContext);
	const {
		data: attributesData,
		loading,
		error,
	} = useAsync(AttributeServices.getAllAttributes);
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
			<PageTitle>{t("Attribute")}</PageTitle>
			<SearchAndFilter
				buttonText={t("AddAttribute")}
				inputPlaceholder={t("SearchAttribute")}
				onClick={toggleDrawer}
			/>
			<TableWrapperWithPagination
				loading={loading}
				error={error}
				data={attributesData}>
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
					<AttributeTable
						data={attributesData.records}
						isCheck={isCheck}
						setIsCheck={setIsCheck}
						toggleDrawerData={toggleDrawerData}
					/>
				</Table>
			</TableWrapperWithPagination>

			<MainDrawer>
				<AttributeDrawer
					id={serviceId}
					data={attributesData.records}
					lang={lang}
				/>
			</MainDrawer>
		</>
	);
};

export default Attribute;
