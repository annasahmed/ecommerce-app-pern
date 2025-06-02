import React from "react";

const PageTitle = ({ children }) => {
	return (
		<h1 className="my-6 text-lg font-bold text-customGray-700 dark:text-customGray-300">
			{children}
		</h1>
	);
};

export default PageTitle;
