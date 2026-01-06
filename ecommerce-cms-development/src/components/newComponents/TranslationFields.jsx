import LanguageServices from "@/services/LanguageServices";
import { Button } from "@windmill/react-ui";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputAreaField from "../form/fields/InputAreaField";
import InputSelectField from "../form/fields/InputSelectField";
import TextAreaField from "../form/fields/TextAreaField";
import { IfMultilingual } from "../IfMultilingual";
import { useGlobalSettings } from "@/context/GlobalSettingsContext";
import RichTextField from "../form/fields/RichTextField";

const TranslationFields = ({
	control,
	errors,
	register,
	translationFields,
	getTranslationCode = false,
	formName = "translations",
	setValue = () => {},
}) => {
	const { t } = useTranslation();
	const { settings, languages, isMultiLingual, selectedLanguage } =
		useGlobalSettings();

	const {
		fields: translationFieldsArray,
		append: appendTranslation,
		remove: removeTranslation,
	} = useFieldArray({
		control,
		name: formName,
	});

	// 👇 Watch all translations so options re-render whenever a language is picked
	const translations =
		useWatch({
			control,
			name: formName,
		}) || [];

	if (!control || !errors || !register)
		return (
			<p>
				register, control, errors params are required in TranslationFields
				component
			</p>
		);

	const fieldNames = useMemo(() => {
		const obj = {};
		for (const f of translationFields) {
			obj[f.name] = null;
			// if (isMultiLingual && f.name === "language_id") {
			// 	obj[f.name] = selectedLanguage.id;
			// } else {
			// }
		}
		return obj;
	}, [translationFields]);

	if (!translationFields || translationFields?.length === 0) return null;

	return (
		<div className="mb-6">
			<IfMultilingual>
				<h3 className="text-xl font-semibold mt-4">{t("Translations")}</h3>
			</IfMultilingual>

			{translationFieldsArray.map((field, index) => {
				const selectedLangs = translations.map((tr) => tr.language_id);

				return (
					<div
						key={field.id}
						className={
							settings.isMultiLingual
								? "border p-4 rounded mt-2 space-y-6 mb-6"
								: "space-y-6 grid grid-cols-2/ gap-x-16 gap-y-0 items-end"
						}>
						{translationFields?.map((input, idx) => {
							const Field =
								input.fieldType === "inputArea"
									? InputAreaField
									: input.fieldType === "textArea"
									? TextAreaField
									: input.fieldType === "richText"
									? RichTextField
									: null;

							return (
								Field && (
									<Field
										key={idx}
										label={t(input.name)}
										required={input.required}
										register={register}
										inputLabel="title"
										inputName={`${formName}.${index}.${input.name}`}
										inputType="text"
										inputPlaceholder={t(input.name)}
										errorName={errors?.[formName]?.[index]?.[input.name]}
										setValue={setValue}
										{...(input.params || {})}
									/>
								)
							);
						})}

						<IfMultilingual>
							<InputSelectField
								label={t("Language")}
								required={true}
								register={register}
								inputLabel={t("language")}
								inputName={`${formName}.${index}.language_id`}
								inputPlaceholder={t("selectLanguage")}
								isVertical
								options={languages
									.filter(
										(lang) =>
											!selectedLangs.some(
												(selected, idx2) =>
													idx2 !== index && selected == lang.id,
											),
									)
									.map((pCat, idx) => (
										<option
											value={getTranslationCode ? pCat.code : pCat.id}
											key={idx}>
											{pCat?.name}
										</option>
									))}
								errorName={errors?.[formName]?.[index]?.language_id}
								validate={{
									unique: (value) => {
										const duplicates = translations.filter(
											(tr) => tr.language_id === value,
										);
										return (
											duplicates.length <= 1 || t("LanguageAlreadySelected")
										);
									},
								}}
								{...(!getTranslationCode
									? register(`${formName}.${index}.language_id`, {
											valueAsNumber: true,
									  })
									: {})}
							/>
						</IfMultilingual>
						<IfMultilingual>
							{translationFieldsArray.length > 1 ? (
								<Button
									layout="outline"
									onClick={() => removeTranslation(index)}
									className="mt-2">
									{t("RemoveTranslation")}
								</Button>
							) : null}
						</IfMultilingual>
					</div>
				);
			})}

			<IfMultilingual>
				<Button
					disabled={translationFieldsArray.length === languages.length}
					onClick={() => appendTranslation(fieldNames)}
					className="">
					{t("AddTranslation")}
				</Button>
			</IfMultilingual>
		</div>
	);
};

export default TranslationFields;
