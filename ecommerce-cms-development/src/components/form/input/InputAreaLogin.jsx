import React from "react";
import { Input } from "@windmill/react-ui";

const InputAreaLogin = ({
	register = () => {},
	defaultValue,
	required,
	name,
	label,
	type,
	autoComplete,
	placeholder,
	onChange,
}) => {

	const registerField = register(name, {
		required: required ? `${label} is required!` : false,
	});

	return (
		<Input
			{...registerField}
			defaultValue={defaultValue}
			type={type}
			step="any"
			placeholder={placeholder}
			name={name}
			autoComplete={autoComplete}
			className="mr-2 h-12 p-2"
			onChange={(e) => {
				registerField.onChange(e); // react-hook-form update
				onChange && onChange(e);   // your custom onChange
			}}
		/>
	);
};

export default InputAreaLogin;
