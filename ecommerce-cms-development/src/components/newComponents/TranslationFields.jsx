import LanguageServices from "@/services/LanguageServices";
import { Button } from "@windmill/react-ui";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputAreaField from "../form/fields/InputAreaField";
import InputSelectField from "../form/fields/InputSelectField";
import TextAreaField from "../form/fields/TextAreaField";
import { IfMultilingual } from "../IfMultilingual";

const TranslationFields = ({
	control,
	errors,
	register,
	translationFields,
}) => {
	const { t } = useTranslation();
	const [languages, setLanguages] = useState([]);
	useEffect(() => {
		LanguageServices.getAllLanguages().then((data) => {
			setLanguages(data);
		});
	}, []);

	const {
		fields: translationFieldsArray,
		append: appendTranslation,
		remove: removeTranslation,
	} = useFieldArray({
		control,
		name: "translations",
	});

	if (!control || !errors || !register)
		return (
			<p>
				register, control, errors parmas are required in TranslationFields
				component
			</p>
		);
	if (!translationFields || translationFields?.length === 0) return null;
	return (
		<div className="mb-6">
			<IfMultilingual>
				<h3 className="text-xl font-semibold mt-4">{t("Translations")}</h3>
			</IfMultilingual>
			{translationFieldsArray.map((field, index) => (
				<div key={field.id} className="border p-4 rounded mt-2 space-y-6 mb-6">
					{translationFields?.map((input, index) => {
						const Field =
							input.fieldType === "inputArea" ? InputAreaField : TextAreaField;
						return (
							<Field
								label={t(input.name)}
								required={input.required}
								register={register}
								inputLabel="title"
								inputName={`translations.${index}.${input.name}`}
								inputType="text"
								inputPlaceholder={t(input.name)}
								errorName={errors[`translations.${index}.${input.name}`]}
							/>
						);
					})}
					<InputSelectField
						label={t("Language")}
						required={true}
						register={register}
						inputLabel={t("language")}
						inputName={`translations.${index}.language_id`}
						inputPlaceholder={t("selectLanguage")}
						options={languages
							?.filter((lang) => {
								const selectedLangs = translationFieldsArray.map(
									(f) => f.language_id,
								);
								// allow this lang if not already selected OR it is the one already set for this field
								return (
									!selectedLangs.includes(`${lang.id}`) ||
									field.language_id === lang.id
								);
							})
							.map((pCat, idx) => (
								<option value={pCat.id} key={idx}>
									{pCat?.name}
								</option>
							))}
						errorName={errors[`translations.${index}.language_id`]}
					/>
					{translationFieldsArray.length > 1 ? (
						<Button
							layout="outline"
							onClick={() => removeTranslation(index)}
							className="mt-2">
							{t("RemoveTranslation")}
						</Button>
					) : null}
				</div>
			))}
			<IfMultilingual>
				<Button
					onClick={() =>
						appendTranslation({
							title: null,
							excerpt: null,
							description: null,
							language_id: null,
						})
					}
					className="">
					{t("AddTranslation")}
				</Button>
			</IfMultilingual>
		</div>
	);
};

export default TranslationFields;
