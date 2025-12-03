"use client";
import { useStore } from "@/app/providers/StoreProvider";
import BaseTab from "../../BaseComponents/BaseTabs";
import ProductCard from "./ProductCard";
import BaseLink from "../../BaseComponents/BaseLink";
import BaseImage from "../../BaseComponents/BaseImage";

const ParentCategoriesGrid = () => {
	const store = useStore();
	return (
		<section className="container-layout">
			<h3 className="text-center font-bold h3 text-primary mb-4">
				FOOTWEAR
			</h3>
			<section className="grid grid-cols-2 md:grid-cols-4 justify-between gap-6 max-md:gap-3 items-stretch">
				{store.content.parentCatgores?.map((pCat, idx) => (
					<div >
						<BaseLink href={`/products?category=${pCat.slug}`} className="bg-secondary/80 p-2 text-light block rounded-lg hover:scale-105 transition-all hover:shadow-lg">
							<BaseImage
								src={pCat.icon}
								key={idx}
								className="w-full rounded-lg md:h-70 object-cover border-secondary"
							/>
							<p className="text-center capitalize mt-2 font-medium">
								{pCat.title}
							</p>
						</BaseLink>
					</div>
				))}
			</section>
		</section>
	);
};
export default ParentCategoriesGrid;
