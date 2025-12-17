import React from "react";
import TranslationFields from "../newComponents/TranslationFields";

const ProductTranslationForm = ({
	control,
	register,
	translationFields,
	errors,
}) => {
 return <TranslationFields
    control={control}
    register={register}
    translationFields={translationFields}
    errors={errors}
  />
	return (
		<section className={`w-full relative p-6 rounded-lg border`}>
			<h3 className="font-semibold text-2xl h3 mb-4">Basic Information</h3>
		</section>
	);
};

export default ProductTranslationForm;
