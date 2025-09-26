import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
import { Button } from "@windmill/react-ui";
import { useFieldArray, useForm } from "react-hook-form";

// internal imports
import DrawerButton from "@/components/form/button/DrawerButton";
import { useGlobalSettings } from "@/context/GlobalSettingsContext";
import { SidebarContext } from "@/context/SidebarContext";
import AttributeServices from "@/services/AttributeServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import SwitchToggleField from "../form/fields/SwitchToggleField";
import DrawerHeader from "../newComponents/DrawerHeader";
import TranslationFields from "../newComponents/TranslationFields";
import {
	transformForBackend,
	transformForForm,
} from "@/utils/translationUtils";

const AttributeDrawer = ({ id }) => {
	const { t } = useTranslation();
	const [status, setStatus] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { closeDrawer, setIsUpdate } = useContext(SidebarContext);
	const { selectedLanguage } = useGlobalSettings();

	// 🔹 Default values for create
	const defaultValues = {
		translations: [
			{
				name: null,
				language_id: selectedLanguage.code,
			},
		],
		values: [
			{
				translations: [
					{
						value: null,
						language_id: selectedLanguage.code,
					},
				],
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

	const { fields, append, remove } = useFieldArray({
		control,
		name: "values",
	});

	const onSubmit = async (data) => {
		try {
			setIsSubmitting(true);
			const attributeData = transformForBackend(data);

			console.log(data, attributeData, "chkking data");

			let res;
			if (id) {
				res = await AttributeServices.updateAttribute(id, attributeData);
			} else {
				res = await AttributeServices.addAttribute(attributeData);
			}

			setIsUpdate(true);
			notifySuccess(res.message);
			closeDrawer();
			reset();
		} catch (err) {
			notifyError(err ? err?.response?.data?.message : err?.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	// 🔹 Edit mode
	useEffect(() => {
		if (id) {
			(async () => {
				try {
					const res = await AttributeServices.getAttributeById(id);
					if (res) {
						const formData = transformForForm(res);
						reset(formData); // reset entire form with transformed data
						setStatus(res.status || false);
					}
				} catch (err) {
					notifyError(err ? err.response?.data?.message : err.message);
				}
			})();
		} else {
			reset(defaultValues);
		}
	}, [id]);

	return (
		<>
			<DrawerHeader
				id={id}
				register={register}
				updateTitle={t("UpdateAttribute")}
				updateDescription={t("UpdateAttributeDescription")}
				addTitle={t("AddAttributeTitle")}
				addDescription={t("AddAttributeDescription")}
			/>

			<Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-customGray-700 dark:text-customGray-200">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
						{/* Attribute Name */}
						<TranslationFields
							control={control}
							errors={errors}
							register={register}
							translationFields={[
								{ name: "name", required: true, fieldType: "inputArea" },
							]}
							getTranslationCode
						/>

						{/* Attribute values */}
						{fields.map((field, index) => (
							<div key={field.id} className="border p-4 rounded mb-4">
								<h3 className="font-semibold">
									{t("Value")} {index + 1}
								</h3>

								<TranslationFields
									control={control}
									errors={errors}
									register={register}
									translationFields={[
										{
											name: "value",
											required: true,
											fieldType: "inputArea",
										},
									]}
									formName={`values.${index}.translations`} // ✅ proper nested path
									getTranslationCode
								/>

								<Button
									layout="outline"
									onClick={() => remove(index)}
									className="mt-2">
									{t("RemoveValue")}
								</Button>
							</div>
						))}

						<Button
							onClick={() =>
								append({
									translations: [
										{
											value: null,
											language_id: selectedLanguage.code,
										},
									],
								})
							}
							className="mt-2">
							{t("AddValue")}
						</Button>

						<SwitchToggleField
							label={t("Status")}
							handleProcess={setStatus}
							processOption={status}
						/>
					</div>

					<DrawerButton id={id} title="Attribute" isSubmitting={isSubmitting} />
				</form>
			</Scrollbars>
		</>
	);
};

export default AttributeDrawer;
