"use client";
import BaseImage from "@/app/components/BaseComponents/BaseImage";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import Loader from "@/app/components/Shared/Loader";
import { loadThemeComponents } from "@/app/components/Themes/autoLoader";
import { categories } from "@/app/data/storeSettingsSportsTheme";
import { useFetchReactQuery } from "@/app/hooks/useFetchReactQuery";
import { useStore } from "@/app/providers/StoreProvider";
import ParentCategoryServices from "@/app/services/ParentCategoryServices";

const HomePage = () => {
	const store = useStore();
	const { HeroSection } = loadThemeComponents(store.themeName);

	// const {
	// 	data: parentCategories,
	// 	isLoading,
	// 	error,
	// } = useFetchReactQuery(
	// 	() => ParentCategoryServices.getParentCategories(store.themeName),
	// 	["parentCategories"],
	// 	{
	// 		retry: false,
	// 	},
	// );
	const {
		data: parentCategories,
		isLoading,
		error,
	} = useFetchReactQuery(
		() => ParentCategoryServices.getParentCategories(store.themeName),
		["parentCategory"],
		// ["parentCategory", store.themeName],
		{ enabled: !!store.themeName },
	);

	console.log(parentCategories, "chkking data");
	if (isLoading) return <Loader />;

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
											? process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
											  pCategory.medium?.url
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
		</main>
	);
};

export default HomePage;
