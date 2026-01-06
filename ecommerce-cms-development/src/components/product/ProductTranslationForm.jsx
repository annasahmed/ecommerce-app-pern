import React from "react";
import TranslationFields from "../newComponents/TranslationFields";

const ProductTranslationForm = ({
	control,
	register,
	translationFields,
	errors,
}) => {
	return (
		<TranslationFields
			control={control}
			register={register}
			translationFields={translationFields}
			errors={errors}
		/>
	);
};

export default ProductTranslationForm;
