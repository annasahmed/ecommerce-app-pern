import React from "react";
import Label from "@/app/components/Shared/form/Label";
import Error from "./Error";

const CheckboxInput = ({
	name,
	label,
	register,
	required = true,
	defaultChecked = false,
	readOnly = false,
	onChange,
	className = "",
	errorName,
}) => {
	return (
		<section>
			<div className="flex items-center gap-2">
				{/* Checkbox */}
				<input
					type="checkbox"
					id={name}
					name={name}
					defaultChecked={defaultChecked}
					readOnly={readOnly}
					{...register(name, {
						required: required ? `${label} is required!` : false,
						onChange: onChange,
					})}
					className={`mb-2 h-3.5 w-3.5 text-emerald-600 border-gray-300 rounded cursor-pointer focus:ring-emerald-500 
					${readOnly ? "bg-gray-100 cursor-not-allowed opacity-70" : ""} 
					${className}`}
				/>

				{/* Label */}
				<Label htmlFor={name} label={label} required={required} />
			</div>

			<Error errorName={errorName} />
		</section>
	);
};

export default CheckboxInput;
