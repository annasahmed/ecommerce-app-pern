import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import { useGlobalSettings } from "@/context/GlobalSettingsContext";
import { SidebarContext } from "@/context/SidebarContext";
import ParentCategoryServices from "@/services/ParentCategoryServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useForm } from "react-hook-form";
import ImageSelectorField from "../form/fields/ImageSelectorField";
import SwitchToggleField from "../form/fields/SwitchToggleField";
import DrawerHeader from "../newComponents/DrawerHeader";
import TranslationFields from "../newComponents/TranslationFields";

const ParentCategoryDrawer = ({ id, data }) => {
	const { t } = useTranslation();
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedImageUrl, setSelectedImageUrl] = useState(null);
	const [status, setStatus] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resData, setResData] = useState({});
	const { closeDrawer, setIsUpdate } = useContext(SidebarContext);
	const { selectedLanguage } = useGlobalSettings();

	const defaultValues = {
		icon: null,
		translations: [
			{
				title: null,
				description: null,
				slug: null,
				language_id: selectedLanguage.id,
			},
		],
	};

	const {
		control,
		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm({ defaultValues });

	const onSubmit = async (data) => {
		try {
			setIsSubmitting(true);

			const parentCategoryData = {
				...data,
				translations: data.translations.map((tr) =>
					Object.fromEntries(
						Object.entries(tr).filter(
							([_, value]) => value !== "" && value !== null,
						),
					),
				),
				icon: selectedImage,
				status,
			};

			if (id) {
				const res = await ParentCategoryServices.updateParentCategory(
					id,
					parentCategoryData,
				);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				closeDrawer();
				reset();
			} else {
				const res = await ParentCategoryServices.addParentCategory(
					parentCategoryData,
				);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				closeDrawer();
				reset();
			}
		} catch (err) {
			setIsSubmitting(false);
			notifyError(err ? err?.response?.data?.message : err?.message);
		}
	};

	const translationFields = [
		{
			name: "title",
			required: true,
			fieldType: "inputArea",
		},
		{
			name: "slug",
			required: true,
			fieldType: "inputArea",
		},
		{
			name: "description",
			fieldType: "textArea",
		},
	];

	useEffect(() => {
		if (id) {
			(async () => {
				try {
					const res = await ParentCategoryServices.getParentCategoryById(id);
					if (res) {
						setResData(res);
						setValue("translations", res.translations);
						setValue("slug", res.slug);
						setSelectedImage(res.icon);
						setSelectedImageUrl(
							res.medium.url
								? import.meta.env.VITE_APP_CLOUDINARY_URL + res.medium.url
								: null,
						);
						setStatus(res.status || false);
					}
				} catch (err) {
					notifyError(err ? err.response?.data?.message : err.message);
				}
			})();
		} else {
			reset();
		}
	}, [id, setValue, clearErrors, data]);

	return (
		<>
			<DrawerHeader
				id={id}
				register={register}
				updateTitle={t("UpdateParentCategory")}
				updateDescription={t("UpdateParentCategoryDescription")}
				addTitle={t("AddParentCategoryTitle")}
				addDescription={t("AddParentCategoryDescription")}
			/>

			<Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-customGray-700 dark:text-customGray-200">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
						{/* Translations */}
						<TranslationFields
							control={control}
							errors={errors}
							register={register}
							translationFields={translationFields}
						/>
						<ImageSelectorField
							label={t("Icon")}
							selectedImage={selectedImage}
							setSelectedImage={setSelectedImage}
							selectedImageUrl={selectedImageUrl}
							setSelectedImageUrl={setSelectedImageUrl}
						/>
						<SwitchToggleField
							label={t("Status")}
							handleProcess={setStatus}
							processOption={status}
						/>
					</div>

					<DrawerButton
						id={id}
						title="ParentCategory"
						isSubmitting={isSubmitting}
					/>
				</form>
			</Scrollbars>
		</>
	);
};

export default ParentCategoryDrawer;
