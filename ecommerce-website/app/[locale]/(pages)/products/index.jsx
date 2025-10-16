"use client";
import FilterSidebar from "@/app/components/Shared/FiltersSidebar";
import Filters from "@/app/components/Shared/FiltersSidebar";
import SearchInput from "@/app/components/Shared/form/SearchInput";
import Pagination from "@/app/components/Shared/Pagination";
import { loadThemeComponents } from "@/app/components/Themes/autoLoader";
import { useStore } from "@/app/providers/StoreProvider";
import React, { useState } from "react";

const ProductsPage = () => {
	const store = useStore();
	const {
		HeroSection,
		CategoriesSection,
		PopularCatTabs,
		TrendingCategoriesSection,
		ProductsSlider,
	} = loadThemeComponents(store.themeName);
	const [page, setPage] = useState(1);
	const productsPerPage = 9;
	const totalProducts = store.content.allProducts?.length || 0;
	const totalPages = Math.ceil(totalProducts / productsPerPage);
	return (
		<main>
			<HeroSection />
			<section className="container-layout section-layout">
				<section className="mb-10">
					<SearchInput />
				</section>
				<section className="grid grid-cols-4 gap-10 max-h-[115vh] overflow-hidden">
					<FilterSidebar />
					<section className="col-span-3 overflow-y-scroll max-h-[115vh] hide-scrollbar">
						<h4 className="h4 font-bold mb-4 border-b pb-1">Results</h4>
						<ProductsSlider
							productsData={store.content.allProducts.slice(
								(page - 1) * productsPerPage,
								page * productsPerPage,
							)}
							isSlider={false}
							showTitle={false}
						/>
					</section>
				</section>
				<Pagination
					currentPage={page}
					totalPages={totalPages}
					onPageChange={(newPage) => setPage(newPage)}
				/>
			</section>
			<div className="w-full h-px bg-border-color" />
			<section className="container-layout section-layout">
				<ProductsSlider
					productsData={store.content.allProducts.slice(8, 12)}
					isSlider={false}
					title="Recently View Products"
					columns={4}
				/>
			</section>
		</main>
	);
};

export default ProductsPage;
