import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import { SidebarContext } from "@/context/SidebarContext";
import useTranslationValue from "@/hooks/useTranslationValue";
import BrandServices from "@/services/BrandServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useForm } from "react-hook-form";
import DrawerHeader from "../newComponents/DrawerHeader";
import InputAreaField from "../form/fields/InputAreaField";
import SwitchToggleField from "../form/fields/SwitchToggleField";
import TranslationFields from "../newComponents/TranslationFields";
import { useGlobalSettings } from "@/context/GlobalSettingsContext";

const BrandDrawer = ({ id, data }) => {
	const { t } = useTranslation();
	const [status, setStatus] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resData, setResData] = useState({});
	const { closeDrawer, setIsUpdate } = useContext(SidebarContext);
	const { selectedLanguage } = useGlobalSettings();

	const defaultValues = {
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

			const brandData = {
				...data,
				status,
			};

			if (id) {
				const res = await BrandServices.updateBrand(id, brandData);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				closeDrawer();
				reset();
			} else {
				const res = await BrandServices.addBrand(brandData);
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

	useEffect(() => {
		if (id) {
			(async () => {
				try {
					const res = await BrandServices.getBrandById(id);
					if (res) {
						setResData(res);
						setValue("translations", res.translations);
						setValue("slug", res.slug);
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

	return (
		<>
			<DrawerHeader
				id={id}
				register={register}
				updateTitle={t("UpdateBrand")}
				updateDescription={t("UpdateBrandDescription")}
				addTitle={t("AddBrandTitle")}
				addDescription={t("AddBrandDescription")}
			/>

			<Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-customGray-700 dark:text-customGray-200">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
						<TranslationFields
							control={control}
							errors={errors}
							register={register}
							translationFields={translationFields}
						/>
						<SwitchToggleField
							label={t("Status")}
							handleProcess={setStatus}
							processOption={status}
						/>
					</div>

					<DrawerButton id={id} title="Brand" isSubmitting={isSubmitting} />
				</form>
			</Scrollbars>
		</>
	);
};

export default BrandDrawer;
