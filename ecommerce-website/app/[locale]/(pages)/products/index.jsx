"use client";
import BaseImage from "@/app/components/BaseComponents/BaseImage";
import FilterSidebar from "@/app/components/Shared/FiltersSidebar";
import SearchInput from "@/app/components/Shared/form/SearchInput";
import Pagination from "@/app/components/Shared/Pagination";
import { loadThemeComponents } from "@/app/components/Themes/autoLoader";
import productsHeroBanner from "@/app/assets/themes/kidsTheme/products-banner.jpg";
import { useStore } from "@/app/providers/StoreProvider";
import React, { useEffect, useRef, useState } from "react";
import ProductsSlider from "@/app/components/Themes/KidsTheme/ProductsSlider";
import ProductServices from "@/app/services/ProductServices";
import { useFetchReactQuery } from "@/app/hooks/useFetchReactQuery";
import Loader from "@/app/components/Shared/Loader";
import SpinLoader from "@/app/components/Shared/SpinLoader";

const ProductsPage = () => {
	const store = useStore();
	// const { ProductsSlider } = loadThemeComponents(store.themeName);
	const [selectedFilters, setSelectedFilters] = useState({
		categories: [], // [id]
		brands: [], // [id]
		price: null, // ["Under $50"]
		size: null, // "M"
		color: null, // "Red"
	});
	const [page, setPage] = useState(1);
	const productsPerPage = 12;
	const totalProducts = store.content.allProducts?.length || 0;
	const totalPages = Math.ceil(totalProducts / productsPerPage);

	const { data: filteredProducts, isLoading: isProductsLoading } =
		useFetchReactQuery(
			() =>
				ProductServices.getFilteredProducts({
					themeName: store.themeName,
					filters: selectedFilters,
				}),
			["filteredProducts", store.themeName, selectedFilters, page],
			{ enabled: !!store.themeName },
		);
	const isFirstRender = useRef(true);
	const sectionRef = useRef(null);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		if (!sectionRef.current) return;

		const yOffset = -170; // navbar height
		const y =
			sectionRef.current.getBoundingClientRect().top +
			window.pageYOffset +
			yOffset;

		window.scrollTo({ top: y, behavior: "smooth" });
	}, [page]); // 🔥 scroll when page changes

	return (
		<main>
			{/* <BaseImage
				src={productsHeroBanner}
				alt="products-banner"
				className="w-full h-auto object-contain/"
			/> */}
			<section className="container-layout section-layout">
				{/* <section className="mb-10">
					<SearchInput />
				</section> */}
				<section className="grid md:grid-cols-4 max gap-10 md:max-h-[115vh]/ md:overflow-hidden">
					<FilterSidebar
						selectedFilters={selectedFilters}
						setSelectedFilters={setSelectedFilters}
					/>
					<section
						className="md:col-span-3 overflow-y-scroll md:max-h-[115vh]/ hide-scrollbar"
						ref={sectionRef}>
						<h4 className="h4 font-bold mb-4 border-b pb-1">Results</h4>
						{isProductsLoading ? (
							<SpinLoader />
						) : (
							<ProductsSlider
								// productsData={store.content.allProducts.slice(
								// 	(page - 1) * productsPerPage,
								// 	page * productsPerPage,
								// )}
								productsData={
									filteredProducts?.records?.length > 0
										? filteredProducts?.records.slice(
												(page - 1) * productsPerPage,
												page * productsPerPage,
											)
										: store.content.allProducts.slice(7, 12)
								}
								isSlider={false}
								showTitle={false}
							/>
						)}
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
					productsData={
						filteredProducts?.records?.length > 0
							? filteredProducts?.records.slice(0, 5)
							: store.content.allProducts.slice(7, 12)
					}
					isSlider={false}
					title="Recently View Products"
					columns="grid-cols-5"
				/>
			</section>
		</main>
	);
};

export default ProductsPage;
