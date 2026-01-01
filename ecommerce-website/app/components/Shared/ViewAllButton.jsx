import React from "react";
import BaseLink from "../BaseComponents/BaseLink";
import { ArrowRight } from "lucide-react";

const ViewAllButton = ({ text = "View All", href = "" }) => {
	return (
		<BaseLink
			href={href}
			className="
				group
				relative
				flex
				items-center
				justify-center
				gap-2
				overflow-hidden
				rounded-full
				border-2
				border-primary
				px-4
				py-1
				font-medium
				text-primary
				transition-all
				duration-300
				hover:text-light
				p5
			">
			{/* Hover background */}
			<span
				className="
					absolute
					inset-0
					-translate-x-full
					bg-primary
					transition-transform
					duration-300
					ease-out
					group-hover:translate-x-0
				"
			/>

			{/* Content */}
			<p className="relative z-10 flex items-center gap-2 max-md:gap-1 whitespace-nowrap">
				{text}
				<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
			</p>
		</BaseLink>
	);
};

export default ViewAllButton;
