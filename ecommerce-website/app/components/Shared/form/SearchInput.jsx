// "use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
	const router = useRouter();
	const searchParams = useSearchParams();
	const paramsSearch = searchParams.get("search");
	const pathname = usePathname();
	return (
		<form
			className={`relative w-full/ ${className}`}
			onSubmit={(e) => {
				e.preventDefault();
				if (pathname !== "/products") {
					router.push(
						`/products?search=${encodeURIComponent(e.target.search.value)}`,
					);
				} else {
					const currentParams = new URLSearchParams(searchParams.toString());
					currentParams.set("search", e.target.search.value);
					router.replace(`${pathname}?${currentParams.toString()}`);
				}
			}}>
			{/* Search Icon */}
			<div className="absolute inset-y-0 right-0 px-4 py-2 flex items-center pointer-events-none bg-primary text-light rounded-r-full rounde">
				<MagnifyingGlassIcon className="h-5 w-auto text-light" />
			</div>

			{/* Input Field */}
			<input
				{...(register ? register(name) : {})}
				type="text"
				name={name}
				defaultValue={defaultValue || paramsSearch || ""}
				readOnly={readOnly}
				onChange={onChange}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				className={`py-2 pl-3 pr-10 w-full border text-sm text-gray-800 rounded-full placeholder-gray-400 min-h-12 transition duration-200 
          		focus:ring-0 focus:outline-none focus:border-primary
				${
					readOnly
						? "bg-gray-100 cursor-not-allowed text-gray-500"
						: "bg-white border-gray-200"
				}
        		`}
			/>
		</form>
	);
};

export default SearchInput;
