import React from "react";

const OverlayContainer = ({
	opacity = 0.5,
	backgroundColor = "var(--color-dark)",
}) => {
	return (
		<div
			className="absolute inset-0 w-full"
			style={{
				opacity,
				backgroundColor,
			}}
		/>
	);
};

export default OverlayContainer;
