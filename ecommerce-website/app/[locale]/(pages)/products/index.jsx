"use client";
import FilterSidebar from "@/app/components/Shared/FiltersSidebar";
import Filters from "@/app/components/Shared/FiltersSidebar";
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
				<section className="grid grid-cols-4 gap-10">
					<FilterSidebar />
					<section className="col-span-3">
						<h4 className="h4 font-bold mb-4 border-b pb-1">Results</h4>
						<ProductsSlider
							title="best selling products"
							slug=""
							productsData={store.content.allProducts}
							isSlider={false}
							showTitle={false}
						/>
					</section>
				</section>
			</section>
		</main>
	);
};

export default ProductsPage;
