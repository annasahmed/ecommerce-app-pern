import React from "react";
import { Button } from "@windmill/react-ui";

import spinnerLoadingImage from "@/assets/img/spinner.gif";

const PrimaryButtonWithLoader = ({
	text = "",
	to,
	loading = false,
	type,
	onClick,
	className,
	disabled,
}) => {
	return loading ? (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${className} opacity-50 cursor-not-allowed text-customWhite text-sm h-12 font-semibold align-bottom inline-flex items-center justify-center leading-5 transition-colors duration-150 focus:outline-none`}>
			<img src={spinnerLoadingImage} alt="Loading" width={20} height={10} />
			<span className="font-serif ml-1 font-light text-sm text-customWhite">
				Processing
			</span>
		</button>
	) : (
		<Button disabled={loading} type="submit" className={`${className}`} to={to}>
			{text}
		</Button>
	);
};

export default PrimaryButtonWithLoader;
