'use client'
import Filters from "@/app/components/Shared/Filters";
import { loadThemeComponents } from "@/app/components/Themes/autoLoader";
import { useStore } from "@/app/providers/StoreProvider";
import React from "react";

const ProductsPage = () => {
	const store = useStore();
	const {
		HeroSection,
		CategoriesSection,
		PopularCatTabs,
		TrendingCategoriesSection,
		ProductsSlider,
	} = loadThemeComponents(store.themeName);
	return (
		<main>
			<HeroSection />
			<section className="container-layout flex flex-col gap-18 section-layout">
				<section className="grid grid-cols-4">
					<div className="border col-span-1">filters</div>
					<div className="border col-span-3">products grid</div>
				</section>
			</section>
		</main>
	);
};

export default ProductsPage;
