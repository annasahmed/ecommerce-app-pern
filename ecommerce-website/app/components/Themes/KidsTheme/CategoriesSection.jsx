"use client";
import { useStore } from "@/app/providers/StoreProvider";
import BaseImage from "../../BaseComponents/BaseImage";
import BaseSlider from "../../BaseComponents/BaseSlider";
import BaseLink from "../../BaseComponents/BaseLink";
import { ENV_VARIABLES } from "@/app/constants/env_variables";

const CategoriesSection = ({ data = [], isSlider = true }) => {
	const store = useStore();
	const slidesData = data.length > 0 ? data : store.content.categories;
	// const slidesData =
	// 	data && data.records.length > 0 ? data.records : store.content.categories;

	return (
		<section className="container-layout">
			{isSlider ? (
				<BaseSlider
					slides={slidesData}
					slidesPerView={3}
					// slidesPerGroup={2}
					// slidesPerView={slidesData?.length > 3 ? 3 : slidesData?.length}
					// slidesPerView={slidesData?.length > 3 ? 3 : slidesData?.length}
					spaceBetween={20}
					showNavigation={false}
					showPagination={false}
					// arrowsPosition={"outside"}
					breakpoints={{
						768: {
							showNavigation: slidesData?.length > 7,
							slidesPerView: 7,
							// slidesPerView: slidesData?.length > 7 ? 7 : slidesData?.length,
							spaceBetween: 20,
						},
						// 768: {
						// 	showNavigation: slidesData?.length > 7,
						// 	slidesPerView: slidesData?.length > 7 ? 7 : slidesData?.length,
						// 	spaceBetween: 20,
						// },
					}}
					renderSlide={(category, idx) => (
						<div key={idx}>
							<BaseLink href={`/products?category=${category.slug}`}>
								<BaseImage
									src={
										category.icons
											? ENV_VARIABLES.IMAGE_BASE_URL + category.icons
											: category.icon
									}
									key={idx}
									className="w-full rounded-full h-auto "
								/>
								<p className="text-center capitalize mt-2 font-medium">
									{category.title}
								</p>
							</BaseLink>
						</div>
					)}
				/>
			) : (
				<section className="grid grid-cols-6 max-md:grid-cols-3 gap-5 items-center">
					{slidesData.slice(0, 6).map((category, idx) => (
						<div key={idx}>
							<BaseLink href={`/products?category=${category.slug}`}>
								<BaseImage
									src={
										category.icons
											? ENV_VARIABLES.IMAGE_BASE_URL + category.icons
											: category.icon
									}
									key={idx}
									className="w-full rounded-full h-auto "
								/>
								<p className="text-center capitalize mt-2 font-medium">
									{category.title}
								</p>
							</BaseLink>
						</div>
					))}
				</section>
			)}
		</section>
	);
};
export default CategoriesSection;
