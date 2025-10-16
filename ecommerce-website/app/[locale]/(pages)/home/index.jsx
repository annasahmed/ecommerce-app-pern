"use client";
import homeSmallBanner from "@/app/assets/themes/kidsTheme/home-small-banner.png";
import BaseImage from "@/app/components/BaseComponents/BaseImage";
import { loadThemeComponents } from "@/app/components/Themes/autoLoader";
import { useStore } from "@/app/providers/StoreProvider";

const HomePage = () => {
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
			<section className="flex flex-col gap-18 section-layout">
				<CategoriesSection />
				<PopularCatTabs />
				<BaseImage
					src={homeSmallBanner}
					alt="special-sale"
					className="w-full h-auto object-contain"
				/>
				<TrendingCategoriesSection />
				<section className="container-layout">
					<ProductsSlider
						title="best selling products"
						slug=""
						productsData={store.content.bestSellingProducts}
					/>
				</section>
				<section className="container-layout">
					<ProductsSlider
						title="sale"
						slug=""
						productsData={store.content.saleProducts}
					/>
				</section>
			</section>
		</main>
	);
};

export default HomePage;
