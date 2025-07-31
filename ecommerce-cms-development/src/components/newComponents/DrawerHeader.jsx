import Title from "@/components/form/others/Title";
import React from "react";

const DrawerHeader = ({
	id,
	register,
	addTitle,
	addDescription,
	updateTitle,
	updateDescription,
}) => {
	return (
		<div className="w-full relative p-6 border-b border-customGray-100 bg-customGray-50 dark:border-customGray-700 dark:bg-customGray-800 dark:text-customGray-300">
			{id ? (
				<Title
					register={register}
					// handleSelectLanguage={handleSelectLanguage}
					title={updateTitle}
					description={updateDescription}
				/>
			) : (
				<Title
					register={register}
					// handleSelectLanguage={handleSelectLanguage}
					title={addTitle}
					description={addDescription}
				/>
			)}
		</div>
	);
};

export default DrawerHeader;
