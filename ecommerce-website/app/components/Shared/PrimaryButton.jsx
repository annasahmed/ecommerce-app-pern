import { useRouter } from "next/navigation";
import React from "react";

const PrimaryButton = ({
	className = "",
	children,
	isSmall = false,
	onClick = () => {},
	link,
}) => {
	const router = useRouter();
	return (
		<button
			onClick={() => {
				if (link) {
					router.push(link);
				} else {
					onClick();
				}
			}}
			className={`bg-primary text-light  text-sm font-medium rounded-sm ${
				isSmall ? "px-3 py-1 p5 max-md:px-1 max-md:py-0.5 max-md:rounded-none" : "p4 px-5 py-2 max-md:px-1 max-md:py-1"
			} transition-all duration-300 hover:brightness-110 hover:shadow-md hover:scale-105 ${className}`}>
			{children}
		</button>
	);
};

export default PrimaryButton;
