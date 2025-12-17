import React from "react";

const SectionTitle = ({ children }) => {
	return (
		<h2 className="mb-4 text-lg font-semibold text-customGray-600 dark:text-customGray-300">
			{children}
		</h2>
	);
};

export default SectionTitle;
