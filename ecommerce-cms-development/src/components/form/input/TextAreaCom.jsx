import { Textarea } from "@windmill/react-ui";
import React from "react";

const TextAreaCom = ({
	register,
	name,
	label,
	placeholder,
	required,
	type,
	value,
}) => {
	return (
		<>
			<Textarea
				className="border text-sm border-customGray-200 focus:border-customGray-300 block w-full bg-customGray-100"
				{...register(`${name}`, {
					required: required ? `${label} is required!` : false,
				})}
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				rows="4"
				spellCheck="false"
			/>
		</>
	);
};

export default TextAreaCom;
