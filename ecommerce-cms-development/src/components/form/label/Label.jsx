import React from "react";

const Label = ({ label }) => {
	return (
		<label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-customGray-600 dark:text-customGray-400 mb-1">
			{label}
		</label>
	);
};

export default Label;
