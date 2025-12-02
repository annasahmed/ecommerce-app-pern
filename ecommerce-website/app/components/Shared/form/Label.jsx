import React from "react";

const Label = ({ label, htmlFor, required }) => {
	return (
		<label
			htmlFor={htmlFor}
			className="flex gap-1 items-start text-gray-500 font-medium text-sm leading-none mb-2 cursor-pointer">
			{label}
			{required && <span className="pb-1/ text-red-500">*</span>}
		</label>
	);
};

export default Label;
