import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import { SidebarContext } from "@/context/SidebarContext";
import useTranslationValue from "@/hooks/useTranslationValue";
import UspServices from "@/services/UspServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useForm } from "react-hook-form";
import DrawerHeader from "../newComponents/DrawerHeader";
import InputAreaField from "../product/InputAreaField";
import SwitchToggleField from "../product/SwitchToggleField";

const UspDrawer = ({ id, data }) => {
	const { t } = useTranslation();
	const [status, setStatus] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resData, setResData] = useState({});
	const { closeDrawer, setIsUpdate } = useContext(SidebarContext);

	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();

	const { handlerTextTranslateHandler } = useTranslationValue();

	const onSubmit = async (data) => {
		const { title, description, parentCategoryId, slug } = data;

		try {
			setIsSubmitting(true);
			const nameTranslates = await handlerTextTranslateHandler(
				title,
				"en",
				resData?.title,
			);
			const descriptionTranslates = await handlerTextTranslateHandler(
				description,
				"en",
				resData?.description,
			);

			const uspData = {
				title: {
					...nameTranslates,
					["en"]: title,
				},
				description: {
					...descriptionTranslates,
					...(description && { ["en"]: description }),
				},
				slug,
				status,
			};

			if (id) {
				const res = await UspServices.updateUsp(id, uspData);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				closeDrawer();
				reset();
			} else {
				const res = await UspServices.addUsp(uspData);
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
					const res = await UspServices.getUspById(id);
					if (res) {
						setResData(res);
						setValue("title", res.title["en"]);
						setValue("description", res.description && res.description["en"]);
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

	return (
		<>
			<DrawerHeader
				id={id}
				register={register}
				updateTitle={t("UpdateUsp")}
				updateDescription={t("UpdateUspDescription")}
				addTitle={t("AddUspTitle")}
				addDescription={t("AddUspDescription")}
			/>

			<Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-customGray-700 dark:text-customGray-200">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
						<InputAreaField
							label={t("Name")}
							required={true}
							register={register}
							inputLabel="Title"
							inputName="title"
							inputType="text"
							inputPlaceholder={t("UspTitlePlaceholder")}
							errorName={errors.name}
						/>
						<InputAreaField
							label={t("Slug")}
							required={true}
							register={register}
							inputLabel="Slug"
							inputName="slug"
							inputType="text"
							inputPlaceholder={t("UspSlugPlaceholder")}
							errorName={errors.slug}
						/>
						<InputAreaField
							label={t("Slug")}
							required={true}
							register={register}
							inputLabel="Slug"
							inputName="slug"
							inputType="text"
							inputPlaceholder={t("UspSlugPlaceholder")}
							errorName={errors.slug}
						/>
						<InputAreaField
							label={t("Description")}
							register={register}
							inputLabel="Description"
							inputName="description"
							inputType="text"
							inputPlaceholder={t("UspDescriptionPlaceholder")}
							errorName={errors.description}
						/>
						<SwitchToggleField
							label={t("Status")}
							handleProcess={setStatus}
							processOption={status}
						/>
					</div>

					<DrawerButton id={id} title="Usp" isSubmitting={isSubmitting} />
				</form>
			</Scrollbars>
		</>
	);
};

export default UspDrawer;
