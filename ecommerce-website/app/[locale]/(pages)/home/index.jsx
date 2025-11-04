"use client";
import homeSmallBanner from "@/app/assets/themes/kidsTheme/home-small-banner.png";
import BaseImage from "@/app/components/BaseComponents/BaseImage";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import { loadThemeComponents } from "@/app/components/Themes/autoLoader";
import { useFetchReactQuery } from "@/app/hooks/useFetchReactQuery";
import { useStore } from "@/app/providers/StoreProvider";
import ParentCategoryServices from "@/app/services/ParentCategoryServices";
import ProductServices from "@/app/services/ProductServices";

const HomePage = () => {
	const store = useStore();
	const {
		HeroSection,
		CategoriesSection,
		PopularCatTabs,
		TrendingCategoriesSection,
		ProductsSlider,
		FeaturesSection,
	} = loadThemeComponents(store.themeName);

	const { data: parentCategories, isLoading: parentCategoriesLoading } =
		useFetchReactQuery(
			() => ParentCategoryServices.getParentCategories(store.themeName),
			["parentCategory", store.themeName],
			{ enabled: !!store.themeName },
		);
	const { data: latestProducts, isLoading: latestProdductsLoading } =
		useFetchReactQuery(
			() => ProductServices.getLatestProducts(store.themeName),
			["latestProducts", store.themeName],
			{ enabled: !!store.themeName },
		);

	if (parentCategoriesLoading || latestProdductsLoading) return <Loader />;

	return (
		<main>
			<HeroSection />
			<section className="flex flex-col gap-18 section-layout max-md:gap-10">
				<CategoriesSection data={parentCategories} />
				<PopularCatTabs />
				<BaseLink href="/products">
					<BaseImage
						src={homeSmallBanner}
						alt="special-sale"
						className="w-full h-auto max-md:min-h-[16vh] object-cover md:object-contain cursor-pointer"
					/>
				</BaseLink>

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
				<FeaturesSection />
			</section>
		</main>
	);
};

export default HomePage;
