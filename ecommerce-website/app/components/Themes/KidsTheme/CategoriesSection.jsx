"use client";
import { useStore } from "@/app/providers/StoreProvider";
import BaseImage from "../../BaseComponents/BaseImage";
import BaseSlider from "../../BaseComponents/BaseSlider";
import BaseLink from "../../BaseComponents/BaseLink";

const CategoriesSection = ({ data, isSlider = true }) => {
	const store = useStore();
	const slidesData = data && data.length > 0 ? data : store.content.categories;
	return (
		<section className="container-layout">
			{isSlider ? (
				<BaseSlider
					slides={slidesData}
					slidesPerView={slidesData?.length > 3 ? 3 : slidesData?.length}
					spaceBetween={20}
					showNavigation={false}
					showPagination={false}
					breakpoints={{
						768: {
							showNavigation: slidesData?.length > 7,
							slidesPerView: slidesData?.length > 7 ? 7 : slidesData?.length,
							spaceBetween: 20,
						},
					}}
					renderSlide={(category, idx) => (
						<div key={idx}>
							<BaseLink href={`/products?category=${category.slug}`}>
								<BaseImage
									src={category.icon}
									key={idx}
									className="w-full rounded-full h-auto border-2 border-dotted p-1 border-secondary"
								/>
								<p className="text-center capitalize mt-2 font-medium">
									{category.title}
								</p>
							</BaseLink>
						</div>
					)}
				/>
			) : (
				<section className="grid grid-cols-5 max-md:grid-cols-3 gap-5 items-center">
					{slidesData.map((category, idx) => (
						<div key={idx}>
							<BaseLink href={`/products?category=${category.slug}`}>
								<BaseImage
									src={category.icon}
									key={idx}
									className="w-full rounded-full h-auto border-2 border-dotted p-1 border-secondary"
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
