import React from "react";
import LabelArea from "../selectOption/LabelArea";
import InputArea from "../input/InputArea";
import Error from "../others/Error";
import TextAreaCom from "../input/TextAreaCom";

const TextAreaField = ({
	label,
	register,
	inputLabel,
	inputName,
	inputType,
	inputPlaceholder,
	required,
	errorName,
	isVertical,
	className = "",
}) => {
	return (
		<div
			className={`${
				isVertical
					? "flex flex-col gap-2"
					: "grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
			} ${className}`}>
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
