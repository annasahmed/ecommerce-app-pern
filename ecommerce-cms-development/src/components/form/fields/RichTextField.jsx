import React from "react";
import { useWatch } from "react-hook-form";
import LabelArea from "../selectOption/LabelArea";
import RichTextCom from "../input/RichTextCom";
import Error from "../others/Error";

const RichTextField = ({
	label,
	control,
	setValue,
	inputLabel,
	inputName,
	required,
	errorName,
	isVertical,
	className = "",
}) => {
	const value = useWatch({
		control,
		name: inputName,
	});

	return (
		<div
			className={`${
				isVertical
					? "flex flex-col gap-2"
					: "grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
			} ${className}`}>
			<LabelArea label={label} required={required} />

			<div className="col-span-8 sm:col-span-4">
				<RichTextCom
					required={required}
					label={inputLabel}
					name={inputName}
					control={control}
					setValue={setValue}
					value={value}
				/>
				<Error errorName={errorName} />
			</div>
		</div>
	);
};

export default RichTextField;
