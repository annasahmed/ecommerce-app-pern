"use client";
import { ArrowRight } from "lucide-react";
import BaseImage from "../../BaseComponents/BaseImage";
import BaseLink from "../../BaseComponents/BaseLink";

const ParentCategoriesGrid = ({
	title,
	data = [],
	bgColor = "bg-secondary/80",
	showTitle = true,
}) => {
	return (
		<section className="container-layout">
			{title && (
				<div className="flex gap-8 items-center max-md:justify-between mb-4">
					<h3 className="h3 font-bold text-primary uppercase">{title}</h3>
					<BaseLink
						href={`/products?category=${title}`}
						className="flex gap-2 whitespace-nowrap hover:gap-4 font-medium p5 items-center transition-all">
						View All
						<ArrowRight className="size-6 max-md:size-4 mt-0.5 max-md:mt-0" />
					</BaseLink>
				</div>
			)}
			<section className="grid grid-cols-2 md:grid-cols-4 justify-between gap-6 max-md:gap-3 items-stretch">
				{data?.map((pCat, idx) => (
					<div key={idx}>
						<BaseLink
							href={`/products?category=${pCat.slug}`}
							className={`${bgColor} ${
								showTitle ? "p-2" : ""
							} text-light block rounded-lg hover:scale-105 transition-all duration-500 hover:shadow-lg`}>
							<BaseImage
								src={pCat.icon}
								key={idx}
								className={`w-full rounded-lg ${
									showTitle ? "md:h-80" : "md:h-full"
								}  object-cover border-${bgColor}`}
							/>
							{showTitle && (
								<p className="text-center capitalize mt-2 font-medium">
									{pCat.title}
								</p>
							)}
						</BaseLink>
					</div>
				))}
			</section>
		</section>
	);
};
export default ParentCategoriesGrid;
