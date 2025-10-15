"use client";
import { useStore } from "@/app/providers/StoreProvider";
import CategoryCards from "./CategoryCards";

const TrendingCategoriesSection = () => {
	const store = useStore();

	return (
		<section className="container-layout grid grid-cols-3 gap-6">
			{store.content.trendingCategories?.map((cat, index) => {
				return <CategoryCards category={cat} key={`trending-cat-${index}`} />;
			})}
		</section>
	);
};
export default TrendingCategoriesSection;
