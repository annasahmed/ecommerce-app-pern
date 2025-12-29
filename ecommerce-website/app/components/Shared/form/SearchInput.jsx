import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchInput = ({
	name = "search",
	placeholder = "Search for products",
	register,
	onChange,
	onKeyDown,
	defaultValue,
	readOnly = false,
	className = "",
}) => {
	return (
		<div className={`relative w-full/ ${className}`}>
			{/* Search Icon */}
			<div className="absolute inset-y-0 right-3 pl-3 flex items-center pointer-events-none">
				<MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
			</div>

			{/* Input Field */}
			<input
				{...(register ? register(name) : {})}
				type="text"
				name={name}
				defaultValue={defaultValue}
				readOnly={readOnly}
				onChange={onChange}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				className={`py-2 pl-3 pr-10 w-full border text-sm text-gray-800 rounded-full placeholder-gray-400 min-h-12 transition duration-200 
          		focus:ring-0 focus:outline-none focus:border-emerald-500
				${
					readOnly
						? "bg-gray-100 cursor-not-allowed text-gray-500"
						: "bg-white border-gray-200"
				}
        		`}
			/>
		</div>
	);
};

export default SearchInput;
