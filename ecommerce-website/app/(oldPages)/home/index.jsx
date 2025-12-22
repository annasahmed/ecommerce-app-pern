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

const HomePage = () => {
	const store = useStore();
	const { HeroSection } = loadThemeComponents(store.themeName);
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

	if ((parentCategoriesLoading, latestProdductsLoading)) return <Loader />;

	return (
		<main>
			<HeroSection />
			<section className="section-layout container-layout flex flex-col gap-10">
				<h2 className="h2 font-bold">Shop By Categories</h2>
				<div className="grid grid-cols-2 gap-6 gap-y-12 justify-between items-strech">
					{parentCategories.records?.map((pCategory, idx) => {
						return (
							<BaseLink
								href={`/products/${pCategory.slug}`}
								key={idx}
								className={`${
									idx % 3 === 0 ? "row-span-2 flex-col" : "items-end"
								} flex gap-6 px-12 py-12 bg-cardsBg `}>
								<div className="flex-1">
									<h3 className="h3 heading">{pCategory.title}</h3>
									<p className="p3 underline font-medium underline-offset-2">
										Shop Now
									</p>
								</div>
								<BaseImage
									src={
										pCategory.medium?.url
											? ENV_VARIABLES.IMAGE_BASE_URL + pCategory.medium?.url
											: null
									}
									alt={pCategory.title}
									width={500}
									height={500}
									className={` mx-auto h-auto object-contain ${
										idx % 3 === 0 ? "flex-1 w-[100%]" : "flex-[1.35] w-[50%]"
									}`}
								/>
							</BaseLink>
						);
					})}
				</div>
			</section>
			<section className="section-layout flex flex-col gap-10">
				<h2 className="h2 font-bold container-layout">
					New
					<br />
					Arrivals
				</h2>
				<div className="container-layout-only-left">
					<BaseSlider
						slides={latestProducts.records}
						slidesPerView={4.5} // show 1 full card + part of next one
						spaceBetween={20}
						autoPlay={false}
						showPagination={false}
						showNavigation={false}
						renderSlide={(product, idx) => {
							return (
								<BaseLink
									href={`/products/${product.slug}`}
									key={idx}
									className="flex flex-col h-full gap-1">
									<div className="flex flex-1 justify-center items-center bg-cardsBg px-10 py-12 mb-4">
										<BaseImage
											src={
												product.thumbnailImage?.url
													? ENV_VARIABLES.IMAGE_BASE_URL +
													  product.thumbnailImage.url
													: null
											}
											alt={product.product_translations[0].title}
											width={500}
											height={500}
											className="h-auto max-h-60 object-contain"
										/>
									</div>
									<h5 className="h5 font-bold">
										{product.product_translations[0].title}
									</h5>
									<p className="p4 font-bold">
										{store.currency}
										{product.product_variants[0].branches[0].pvb.sale_price}
									</p>
								</BaseLink>
							);
						}}
					/>
				</div>
			</section>
			<section className="section-layout flex flex-col gap-10">
				<h2 className="h2 font-bold container-layout">
					New
					<br />
					Arrivals
				</h2>
				<div className="container-layout-only-left">
					<BaseSlider
						slides={latestProducts.records}
						slidesPerView={4.5} // show 1 full card + part of next one
						spaceBetween={20}
						autoPlay={false}
						showPagination={false}
						showNavigation={false}
						renderSlide={(product, idx) => {
							return (
								<BaseLink
									href={`/products/${product.slug}`}
									key={idx}
									className="flex flex-col h-full gap-1">
									<div className="flex flex-1 justify-center items-center bg-cardsBg px-10 py-12 mb-4">
										<BaseImage
											src={
												product.thumbnailImage?.url
													? ENV_VARIABLES.IMAGE_BASE_URL +
													  product.thumbnailImage.url
													: null
											}
											alt={product.product_translations[0].title}
											width={500}
											height={500}
											className="h-auto max-h-60 object-contain"
										/>
									</div>
									<h5 className="h5 font-bold">
										{product.product_translations[0].title}
									</h5>
									<p className="p4 font-bold">
										{store.currency}
										{product.product_variants[0].branches[0].pvb.sale_price}
									</p>
								</BaseLink>
							);
						}}
					/>
				</div>
			</section>
		</main>
	);
};

export default HomePage;
