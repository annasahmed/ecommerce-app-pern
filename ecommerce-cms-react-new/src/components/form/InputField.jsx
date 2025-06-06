import React from "react";
import { Input } from "@windmill/react-ui";
import { Label } from "@windmill/react-ui";
import Error from "./other/Error";

const InputField = ({
	register,
	defaultValue,
	required,
	name,
	label,
	type,
	autoComplete,
	placeholder,

	errorName,
}) => {
	return (
		<>
			{label && (
				<Label className="col-span-4 sm:col-span-2 font-medium text-sm">
					{label}
				</Label>
			)}
			<Input
				{...register(`${name}`, {
					required: required ? `${label} is required!` : false,
				})}
				defaultValue={defaultValue}
				type={type}
				placeholder={placeholder}
				name={name}
				autoComplete={autoComplete}
				className="mr-2 h-12 p-2"
			/>
			<Error errorName={errorName} />
		</>
	);
};

export default InputField;
