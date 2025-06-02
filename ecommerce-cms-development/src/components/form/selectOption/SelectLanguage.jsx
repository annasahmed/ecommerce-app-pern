import React from "react";

//internal imports
import useUtilsFunction from "@/hooks/useUtilsFunction";

const SelectLanguage = ({ handleLanguageChange }) => {
	const { languages, langError, langLoading } = useUtilsFunction();
	console.log(languages, "chkking languages");

	return (
		<ul className="dropdown-content w-full">
			{!langError &&
				!langLoading &&
				languages?.map((lang) => (
					<li
						className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-customGray-100 rounded-md"
						onClick={() => handleLanguageChange(lang)}
						key={lang._id}>
						{/* Flag */}
						<div
							className="flag bg-start"
							style={{
								backgroundImage: `url(https://flagcdn.com/w20/${lang.flag.toLowerCase()}.png)`,
							}}></div>

						{/* Language Name */}
						<span className="text-customGray-900 dark:text-customGray-600 pr-8 text-right">
							{lang?.name}
						</span>
					</li>
				))}
		</ul>
	);
};

export default SelectLanguage;
