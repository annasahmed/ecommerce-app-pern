import React from "react";
import { Input } from "@windmill/react-ui";

const InputArea = ({
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
	return (
		<>
			<Input
				{...register(`${name}`, {
					required: required ? `${label} is required!` : false,
				})}
				defaultValue={defaultValue}
				type={type}
				step={"any"}
				placeholder={placeholder}
				name={name}
				autoComplete={autoComplete}
				className="mr-2 h-12 p-2"
				onChange={onChange}
			/>
		</>
	);
};

export default InputArea;
