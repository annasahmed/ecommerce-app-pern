import { Button, Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

//internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import { SidebarContext } from "@/context/SidebarContext";
import AdminServices from "@/services/AdminServices";
import CategoryServices from "@/services/CategoryServices";
import CouponServices from "@/services/CouponServices";
import CustomerServices from "@/services/CustomerServices";
import LanguageServices from "@/services/LanguageServices";
import ProductServices from "@/services/ProductServicesOld";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import AttributeServices from "@/services/AttributeServicesOld";
import CurrencyServices from "@/services/CurrencyServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import useDisableForDemo from "@/hooks/useDisableForDemo";
import UspServices from "@/services/UspServices";
import VendorServices from "@/services/VendorServices";
import BranchServices from "@/services/BranchServices";
import MediaServices from "@/services/MediaServices";

const DeleteModal = ({ id, ids, setIsCheck, category, title, useParamId }) => {
	const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
	const { setServiceId } = useToggleDrawer();
	const location = useLocation();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const { handleDisableForDemo } = useDisableForDemo();

	const handleDelete = async () => {
		if (handleDisableForDemo()) {
			return; // Exit the function if the feature is disabled
		}
		try {
			setIsSubmitting(true);
			if (location.pathname === "/products") {
				if (ids) {
					const res = await ProductServices.deleteManyProducts({
						ids: ids,
					});
					setIsUpdate(true);
					notifySuccess(res.message);
					setIsCheck([]);
					setServiceId();
					closeModal();
					setIsSubmitting(false);
				} else {
					const res = await ProductServices.deleteProduct(id);
					setIsUpdate(true);
					notifySuccess(res.message);
					setServiceId();
					closeModal();
					setIsSubmitting(false);
				}
			}

			if (location.pathname === "/coupons") {
				if (ids) {
					const res = await CouponServices.deleteManyCoupons({
						ids: ids,
					});
					setIsUpdate(true);
					notifySuccess(res.message);
					setIsCheck([]);
					setServiceId();
					closeModal();
					setIsSubmitting(false);
				} else {
					const res = await CouponServices.deleteCoupon(id);
					setIsUpdate(true);
					notifySuccess(res.message);
					setServiceId();
					closeModal();
					setIsSubmitting(false);
				}
			}

			if (location.pathname === "/categories" || category) {
				if (ids) {
					const res = await CategoryServices.deleteManyCategory({
						ids: ids,
					});
					setIsUpdate(true);
					notifySuccess(res.message);
					setIsCheck([]);
					setServiceId();
					closeModal();
					setIsSubmitting(false);
				} else {
					if (id === undefined || !id) {
						notifyError("Please select a category first!");
						setIsSubmitting(false);
						return closeModal();
					}
					const res = await CategoryServices.deleteCategory(id);
					setIsUpdate(true);
					notifySuccess(res.message);
					closeModal();
					setServiceId();
					setIsSubmitting(false);
				}
			} else if (
				location.pathname === `/categories/${useParamId}` ||
				category
			) {
				if (id === undefined || !id) {
					notifyError("Please select a category first!");
					setIsSubmitting(false);
					return closeModal();
				}

				const res = await CategoryServices.deleteCategory(id);
				setIsUpdate(true);
				notifySuccess(res.message);
				closeModal();
				setServiceId();
				setIsSubmitting(false);
			}

			if (location.pathname === "/usps") {
				const res = await UspServices.deleteUsp(id);
				setIsUpdate(true);
				notifySuccess(res.message);
				setServiceId();
				closeModal();
				setIsSubmitting(false);
			}
			if (location.pathname === "/media") {
				const res = await MediaServices.deleteMedia(id);
				setIsUpdate(true);
				notifySuccess(res.message);
				setServiceId();
				closeModal();
				setIsSubmitting(false);
			}
			if (location.pathname === "/vendors") {
				const res = await VendorServices.deleteVendor(id);
				setIsUpdate(true);
				notifySuccess(res.message);
				setServiceId();
				closeModal();
				setIsSubmitting(false);
			}
			if (location.pathname === "/branches") {
				const res = await BranchServices.deleteBranch(id);
				setIsUpdate(true);
				notifySuccess(res.message);
				setServiceId();
				closeModal();
				setIsSubmitting(false);
			}

			if (location.pathname === "/customers") {
				const res = await CustomerServices.deleteCustomer(id);
				setIsUpdate(true);
				notifySuccess(res.message);
				setServiceId();
				closeModal();
				setIsSubmitting(false);
			}

			if (location.pathname === "/attributes") {
				if (ids) {
					const res = await AttributeServices.deleteManyAttribute({
						ids: ids,
					});
					setIsUpdate(true);
					notifySuccess(res.message);
					setIsCheck([]);
					setServiceId();
					closeModal();
					setIsSubmitting(false);
				} else {
					const res = await AttributeServices.deleteAttribute(id);
					setIsUpdate(true);
					notifySuccess(res.message);
					setServiceId();
					closeModal();
					setIsSubmitting(false);
				}
			}

			if (
				location.pathname === `/attributes/${location.pathname.split("/")[2]}`
			) {
				if (ids) {
					const res = await AttributeServices.deleteManyChildAttribute({
						id: location.pathname.split("/")[2],
						ids: ids,
					});
					setIsUpdate(true);
					notifySuccess(res.message);
					setServiceId();
					setIsCheck([]);
					closeModal();
					setIsSubmitting(false);
				} else {
					const res = await AttributeServices.deleteChildAttribute({
						id: id,
						ids: location.pathname.split("/")[2],
					});
					setIsUpdate(true);
					notifySuccess(res.message);
					setServiceId();
					closeModal();
					setIsSubmitting(false);
				}
			}

			if (location.pathname === "/our-staff") {
				const res = await AdminServices.deleteStaff(id);
				setIsUpdate(true);
				notifySuccess(res.message);
				setServiceId();
				closeModal();
				setIsSubmitting(false);
			}

			if (location.pathname === "/languages") {
				if (ids) {
					const res = await LanguageServices.deleteManyLanguage({
						ids: ids,
					});
					setIsUpdate(true);
					notifySuccess(res.message);
					setIsCheck([]);
					closeModal();
					setIsSubmitting(false);
				} else {
					const res = await LanguageServices.deleteLanguage(id);
					setIsUpdate(true);
					notifySuccess(res.message);
					setServiceId();
					closeModal();
					setIsSubmitting(false);
				}
			}

			if (location.pathname === "/currencies") {
				if (ids) {
					const res = await CurrencyServices.deleteManyCurrency({
						ids: ids,
					});
					setIsUpdate(true);
					notifySuccess(res.message);
					setIsCheck([]);
					closeModal();
					setIsSubmitting(false);
				} else {
					const res = await CurrencyServices.deleteCurrency(id);
					setIsUpdate(true);
					notifySuccess(res.message);
					setServiceId();
					closeModal();
					setIsSubmitting(false);
				}
			}
		} catch (err) {
			notifyError(err ? err?.response?.data?.message : err?.message);
			setServiceId();
			setIsCheck([]);
			closeModal();
			setIsSubmitting(false);
		}
	};

	const { t } = useTranslation();

	return (
		<>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
					<span className="flex justify-center text-3xl mb-6 text-customRed-500">
						<FiTrash2 />
					</span>
					{/* <h2 className="text-xl font-medium mb-1">{t('DeleteModalH2')}</h2> */}
					<h2 className="text-xl font-medium mb-2">
						{t("DeleteModalH2")}{" "}
						<span className="text-customRed-500">{title}</span>?
					</h2>
					<p>{t("DeleteModalPtag")}</p>
				</ModalBody>

				<ModalFooter className="justify-center">
					<Button
						className="w-full sm:w-auto hover:bg-customWhite hover:border-customGray-50"
						layout="outline"
						onClick={closeModal}>
						{t("modalKeepBtn")}
					</Button>
					<div className="flex justify-end">
						{isSubmitting ? (
							<Button
								disabled={true}
								type="button"
								className="w-full h-12 sm:w-auto">
								<img
									src={spinnerLoadingImage}
									alt="Loading"
									width={20}
									height={10}
								/>{" "}
								<span className="font-serif ml-2 font-light">
									{t("Processing")}
								</span>
							</Button>
						) : (
							<Button onClick={handleDelete} className="w-full h-12 sm:w-auto">
								{t("modalDeletBtn")}
							</Button>
							// <button
							//   type="submit"
							//   className="text-sm mt-6 leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-customWhite px-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-customWhite bg-customTeal-400 hover:bg-customTeal-500 h-10"
							// >
							//   Park Order
							// </button>
						)}
					</div>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default React.memo(DeleteModal);
