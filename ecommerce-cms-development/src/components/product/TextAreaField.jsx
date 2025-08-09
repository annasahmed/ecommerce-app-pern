import React from "react";
import LabelArea from "../form/selectOption/LabelArea";
import InputArea from "../form/input/InputArea";
import Error from "../form/others/Error";
import TextAreaCom from "../form/input/TextAreaCom";

const TextAreaField = ({
	label,
	register,
	inputLabel,
	inputName,
	inputType,
	inputPlaceholder,
	required,
	errorName,
}) => {
	return (
		<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
			<LabelArea label={label} required={required} />
			<div className="col-span-8 sm:col-span-4">
				<TextAreaCom
					required={required}
					register={register}
					label={inputLabel}
					name={inputName}
					type={inputType}
					placeholder={inputPlaceholder}
				/>
				<Error errorName={errorName} />
			</div>
		</div>
	);
};

export default TextAreaField;
