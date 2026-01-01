import React from "react";
import ViewAllButton from "./ViewAllButton";

const SectionTitle = ({ title = "", href }) => {
	return (
		<div className="flex gap-8 items-center justify-between mb-4">
			<h3 className="h3 font-bold text-primary uppercase">{title}</h3>
			{href && <ViewAllButton href={`/products?category=${title}`} />}
		</div>
	);
};

export default SectionTitle;
