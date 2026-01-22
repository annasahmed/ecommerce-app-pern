import { ENV_VARIABLES } from "@/app/constants/env_variables";
import BaseImage from "../BaseComponents/BaseImage";
import BaseLink from "../BaseComponents/BaseLink";
import CategorySlider from "../CategorySlider";
import CategoriesSection from "../Themes/KidsTheme/CategoriesSection";
import HeroSection from "../Themes/KidsTheme/HeroSection";
import PopularCatTabs from "../Themes/KidsTheme/PopularCatTabs";
import ProductsSlider from "../Themes/KidsTheme/ProductsSlider";
import ParentCategoriesGrid from "../Themes/KidsTheme/ParentCategoriesGrid";

export default function HomepageSection({ section }) {
	const { type, config, title } = section;

	switch (type) {
		case "slider":
			return (
				config.images.length > 0 && (
					<HeroSection
						images={config.images?.map(
							(img) => ENV_VARIABLES.IMAGE_BASE_URL + img,
						)}
						autoplay={config.autoplay}
					/>
				)
			);
		case "categories":
			return config.layout === "slider" ? (
				config.design === "square" ? (
					<CategorySlider data={config.categories} />
				) : (
					<CategoriesSection data={config.categories} isSlider={true} />
				)
			) : config.design === "circle" ? (
				<CategoriesSection data={config.categories} isSlider={false} />
			) : (
				<ParentCategoriesGrid
					title={title}
					// title="FOOTWEAR"
					data={config.categories}
					bgColor={config.bgColor || "bg-primary/80"}
					showTitle={true} // change this to false to show no title and background color
				/>
			);

		case "banner":
			return (
				config.image && (
					<BaseLink href={config.link || "/"}>
						<BaseImage
							src={ENV_VARIABLES.IMAGE_BASE_URL + config.image}
							alt="banner"
							className="w-full h-auto max-md:min-h-[16vh] object-cover md:object-contain cursor-pointer"
						/>
					</BaseLink>
				)
			);

		case "tab":
			return (
				<PopularCatTabs
					title={title}
					tabs={config.tabs}
					productsPerTab={config.products_per_tab}
				/>
			);
		case "products":
			return (
				<section className="container-layout">
					<ProductsSlider
						title={title}
						slug=""
						limit={config.limit}
						isSlider={config.layout === "slider"}
						isFetchProducts
						categoryId={config.category?.id}
						categorySlug={config.category?.slug}
						query={config.category_id}
					/>
				</section>
			);
		default:
			return null;
	}
}
