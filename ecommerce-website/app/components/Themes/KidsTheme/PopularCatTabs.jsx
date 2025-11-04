"use client";
import { useStore } from "@/app/providers/StoreProvider";
import BaseTab from "../../BaseComponents/BaseTabs";
import ProductCard from "./ProductCard";

const PopularCatTabs = () => {
	const store = useStore();
	return (
		<section className="container-layout">
			<h3 className="text-center font-bold h4 text-primary mb-2">
				NEW IN STORE
			</h3>
			<BaseTab
				tabs={store.content.popularTabs?.map((tab) => {
					return {
						label: tab.label,
						content: (
							<div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 max-md:gap-3">
								{tab.products.map((product) => {
									return (
										<ProductCard
											key={`${tab.label}-product-${product.id}`}
											product={product}
										/>
									);
								})}
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
