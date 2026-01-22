import React from "react";
import ViewAllButton from "./ViewAllButton";

const SectionTitle = ({ title = "", href, className = "" }) => {
	return (
		<div
			className={`flex gap-8 items-center justify-between mb-4 ${className}`}>
			<h3 className={`h3 font-bold text-primary uppercase `}>{title}</h3>
			{href && (
				<ViewAllButton
					href={
						href.includes("/products") ? href : `/products?category=${href}`
					}
				/>
			)}
		</div>
	);
};

export default SectionTitle;
