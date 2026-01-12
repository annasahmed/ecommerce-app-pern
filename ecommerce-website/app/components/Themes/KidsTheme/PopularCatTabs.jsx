"use client";
import { useFetchReactQuery } from "@/app/hooks/useFetchReactQuery";
import { useStore } from "@/app/providers/StoreProvider";
import ProductServices from "@/app/services/ProductServices";
import BaseTab from "../../BaseComponents/BaseTabs";
import Loader from "../../Shared/Loader";
import ProductCard from "./ProductCard";
import { useState } from "react";

const PopularCatTabs = () => {
	const store = useStore();
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const popularTabs = store.content.popularTabs || [];
	const activeTab = popularTabs[activeTabIndex];

	const { data, isLoading } = useFetchReactQuery(
		() =>
			ProductServices.getProducts({
				categoryId: activeTab?.id,
				limit: 10,
			}),
		["popularCatProducts", activeTab?.id],
		{ enabled: !!activeTab?.id },
	);

	return (
		<section className="container-layout">
			<h4 className="text-center font-bold h4 text-primary mb-2">
				NEW IN STORE
			</h4>

			<BaseTab
				defaultIndex={0}
				onChange={(index) => setActiveTabIndex(index)}
				tabs={popularTabs.map((tab) => ({
					label: tab.title,
					content: () => {
						if (isLoading && activeTab?.id === tab.id) return <Loader />;

						const products = data?.records || [];
						if (products.length === 0) {
							return <p className="text-center p4">No products available.</p>;
						}

						return (
							<div className="grid grid-cols-5 max-md:grid-cols-2 gap-6 max-md:gap-3">
								{products.map((product) => (
									<ProductCard
										key={`${tab.title}-product-${product.id}`}
										product={product}
									/>
								))}
							</div>
						);
					},
				}))}
			/>
		</section>
	);
};

export default PopularCatTabs;
