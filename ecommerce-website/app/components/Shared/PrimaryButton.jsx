import React from "react";

const PrimaryButton = ({ className = "", children, isSmall = false }) => {
	return (
		<button
			className={`bg-primary text-white  text-sm font-medium ${
				isSmall ? "px-3 py-1 p5" : "p4 px-5 py-2"
			} rounded-sm transition-all duration-300 hover:brightness-110 hover:shadow-md hover:scale-105 ${className}`}>
			{children}
		</button>
	);
};

export default PrimaryButton;
