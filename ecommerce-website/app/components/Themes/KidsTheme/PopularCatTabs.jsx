"use client";
import { useStore } from "@/app/providers/StoreProvider";
import BaseTab from "../../BaseComponents/BaseTabs";
import ProductCard from "./ProductCard";
import { ENV_VARIABLES } from "@/app/constants/env_variables";
import ProductServices from "@/app/services/ProductServices";
import { useFetchReactQuery } from "@/app/hooks/useFetchReactQuery";
import Loader from "../../Shared/Loader";

const PopularCatTabs = () => {
	const store = useStore();

	const { data: catProducts, isLoading: catProductsLoading } =
		useFetchReactQuery(
			() => ProductServices.getLatestProducts(store.themeName),
			["popularCatProducts", store.themeName],
			{ enabled: !!store.themeName },
		);
	console.log(catProducts, "chkking catProducts");

	if (catProductsLoading) return <Loader />;
	return (
		<section className="container-layout">
			<h4 className="text-center font-bold h4 text-primary mb-2">
				NEW IN STORE
			</h4>
			<BaseTab
				tabs={store.content.popularTabs?.map((tab, idx) => {
					const start = idx * 20;
					const end = start + 10;
					return {
						label: tab.label,
						content: () => (
							<div className="grid grid-cols-5 max-md:grid-cols-2 gap-4 max-md:gap-3">
								{(catProducts?.records?.length > 0
									? catProducts?.records.slice(start, end)
									: tab.products
								).map((product) => (
									<ProductCard
										key={`${tab.label}-product-${product.id}`}
										product={product}
									/>
								))}
							</div>
						),
					};
				})}
				defaultIndex={0}
				// className="bg-white rounded-xl shadow-sm"
				// activeTabClassName="text-blue-600 border-blue-600"
			/>
		</section>
	);
};
export default PopularCatTabs;
