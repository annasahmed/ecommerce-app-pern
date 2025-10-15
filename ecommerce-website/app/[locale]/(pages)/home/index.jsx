"use client";
import BaseImage from "@/app/components/BaseComponents/BaseImage";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import BaseSlider from "@/app/components/BaseComponents/BaseSlider";
import Loader from "@/app/components/Shared/Loader";
import { loadThemeComponents } from "@/app/components/Themes/autoLoader";
import { ENV_VARIABLES } from "@/app/constants/env_variables";
import { categories } from "@/app/data/storeSettingsSportsTheme";
import { useFetchReactQuery } from "@/app/hooks/useFetchReactQuery";
import { useStore } from "@/app/providers/StoreProvider";
import ParentCategoryServices from "@/app/services/ParentCategoryServices";
import ProductServices from "@/app/services/ProductServices";
import homeSmallBanner from "@/app/assets/themes/kidsTheme/home-small-banner.png";

const HomePage = () => {
	const store = useStore();
	const {
		HeroSection,
		CategoriesSection,
		PopularCatTabs,
		TrendingCategoriesSection,
	} = loadThemeComponents(store.themeName);

	return (
		<main>
			<HeroSection />
			<CategoriesSection />
			<PopularCatTabs />
			<BaseImage
				src={homeSmallBanner}
				alt="special-sale"
				className="w-full h-auto object-contain"
			/>
			<TrendingCategoriesSection />
		</main>
	);
};

export default HomePage;
