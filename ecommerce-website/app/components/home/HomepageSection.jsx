import { ENV_VARIABLES } from "@/app/constants/env_variables";
import BaseImage from "../BaseComponents/BaseImage";
import BaseLink from "../BaseComponents/BaseLink";
import CategorySlider from "../CategorySlider";
import CategoriesSection from "../Themes/KidsTheme/CategoriesSection";
import HeroSection from "../Themes/KidsTheme/HeroSection";
import PopularCatTabs from "../Themes/KidsTheme/PopularCatTabs";

export default function HomepageSection({ section }) {
	const { type, config, title } = section;

	console.log(
		type,
		config.images?.map((img) => ENV_VARIABLES.IMAGE_BASE_URL + img),
		"chkking sections",
	);
	// return null;

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
				<CategorySlider data={config.categories} />
			) : (
				<CategoriesSection data={config.categories} isSlider={false} />
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
						// productsData={store.content.saleProducts}
						productsData={
							latestProducts?.records?.length > 0
								? latestProducts?.records.slice(30, 40)
								: store.content.saleProducts
						}
					/>
				</section>
			);
			return (
				<PopularCatTabs
					title={title}
					tabs={config.tabs}
					productsPerTab={config.products_per_tab}
				/>
			);

		default:
			return null;
	}
}
