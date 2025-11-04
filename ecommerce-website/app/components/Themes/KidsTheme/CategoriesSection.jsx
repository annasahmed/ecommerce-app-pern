"use client";
import { useStore } from "@/app/providers/StoreProvider";
import BaseImage from "../../BaseComponents/BaseImage";
import BaseSlider from "../../BaseComponents/BaseSlider";
import BaseLink from "../../BaseComponents/BaseLink";

const CategoriesSection = ({ data }) => {
	const store = useStore();
	const slidesData = data && data.length > 0 ? data : store.content.categories;
	return (
		<section className="container-layout">
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
					<div>
						<BaseLink href={`/products?category=${category.slug}`}>
							<BaseImage
								src={category.icon}
								key={idx}
								className="w-full rounded-full h-auto border-2 border-dotted p-1 border-secondary"
							/>
						</BaseLink>
					</div>
				)}
			/>
		</section>
	);
};
export default CategoriesSection;
