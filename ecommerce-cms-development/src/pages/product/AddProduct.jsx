import ProductDrawer from "@/components/product/ProductDrawer";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const AddProduct = () => {
	const { id } = useParams();
	const { toggleDrawer, lang } = useContext(SidebarContext);

	const toggleDrawerData = useToggleDrawer();
	const { serviceId } = toggleDrawerData;

	const { t } = useTranslation();

	return (
		<>
			{/* <PageTitle>{t("Product")}</PageTitle> */}
			<ProductDrawer id={id}/>
		</>
	);
};

export default AddProduct;
