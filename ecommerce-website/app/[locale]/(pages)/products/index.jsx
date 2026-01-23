"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import FilterSidebar from "@/app/components/Shared/FiltersSidebar";
import SpinLoader from "@/app/components/Shared/SpinLoader";
import ProductsSlider from "@/app/components/Themes/KidsTheme/ProductsSlider";

import { useStore } from "@/app/providers/StoreProvider";
import ProductServices from "@/app/services/ProductServices";

const PRODUCTS_PER_PAGE = 12;

const ProductsPage = () => {
	const searchParams = useSearchParams();
	const paramsCategory = searchParams.get("category");
	const paramsBrand = searchParams.get("brand");
	const paramsSearch = searchParams.get("search");
	const store = useStore();

	const [selectedFilters, setSelectedFilters] = useState({
		categories: [],
		brands: [],
		price: null,
		size: null,
		color: null,
	});

	const [defaultFilters, setDefaultFilters] = useState(null);
	const loaderRef = useRef(null);

	/* ============================
	   Infinite Query Setup
	============================ */
	const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteQuery({
			queryKey: [
				"filteredProducts",
				JSON.stringify(selectedFilters),
				JSON.stringify(defaultFilters || {}),
				paramsSearch || "",
			],
			queryFn: ({ pageParam = 1 }) =>
				ProductServices.getFilteredProducts({
					filters: selectedFilters,
					defaultFilters,
					search: paramsSearch,
					page: pageParam,
					limit: PRODUCTS_PER_PAGE,
				}),
			getNextPageParam: (lastPage, allPages) => {
				const currentPage = allPages.length;
				const totalPages = Math.ceil(lastPage.total / PRODUCTS_PER_PAGE);
				return currentPage < totalPages ? currentPage + 1 : undefined;
			},
			enabled: !!store.themeName && defaultFilters !== null,
			staleTime: 1000 * 60 * 5, // 5 minutes
			refetchOnWindowFocus: false,
		});

	/* ============================
	   Flatten products from all pages
	============================ */
	const products = data?.pages.flatMap((page) => page.records) ?? [];
	const recentlyViewed = products.slice(0, 5);

	/* ============================
	   Infinite Scroll Observer
	============================ */
	useEffect(() => {
		if (!loaderRef.current || isFetchingNextPage || !hasNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			},
			{ rootMargin: "200px" },
		);

		observer.observe(loaderRef.current);

		return () => observer.disconnect();
	}, [isFetchingNextPage, hasNextPage, fetchNextPage]);

	return (
		<main>
			<section className="container-layout section-layout">
				<section className="grid md:grid-cols-4 gap-10">
					<FilterSidebar
						selectedFilters={selectedFilters}
						setSelectedFilters={setSelectedFilters}
						paramsCategory={paramsCategory}
						paramsBrand={paramsBrand}
						defaultFilters={defaultFilters}
						setDefaultFilters={setDefaultFilters}
					/>

					<section className="md:col-span-3 ">
						<h4 className="h4 font-bold mb-4 border-b pb-1">
							Results
							{data?.pages[0]?.total > 0 && (
								<span className="text-muted ml-2 text-sm font-normal">
									(Showing {products.length} of {data.pages[0].total})
								</span>
							)}
						</h4>

						{isLoading ? (
							<div className="flex justify-center py-20">
								<SpinLoader />
							</div>
						) : products.length > 0 ? (
							<>
								{/* Render each page separately to ensure all products show */}
								{data?.pages.map((page, pageIndex) => (
									<div key={pageIndex} className="mb-8">
										<ProductsSlider
											productsData={page.records}
											isSlider={false}
											showTitle={false}
										/>
									</div>
								))}

								{/* Infinite scroll trigger */}
								{hasNextPage && (
									<div ref={loaderRef} className="flex justify-center py-10">
										{isFetchingNextPage && <SpinLoader />}
									</div>
								)}

								{/* End of results indicator */}
								{!hasNextPage && products.length > PRODUCTS_PER_PAGE && (
									<p className="text-center text-muted py-6 p4">
										You've reached the end of the results
									</p>
								)}
							</>
						) : (
							<h4 className="h4 text-muted text-center section-layout">
								No products found, please adjust filters
							</h4>
						)}
					</section>
				</section>
			</section>

			{/* <div className="w-full h-px bg-border-color" />

			<section className="container-layout section-layout">
				{recentlyViewed.length > 0 && (
					<ProductsSlider
						productsData={recentlyViewed}
						isSlider={false}
						title="Recently Viewed Products"
						columns="grid-cols-5"
					/>
				)}
			</section> */}
		</main>
	);
};

export default ProductsPage;
