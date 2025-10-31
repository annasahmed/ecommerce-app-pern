"use client";
import { useStore } from "@/app/providers/StoreProvider";
import BaseImage from "../../BaseComponents/BaseImage";
import BaseSlider from "../../BaseComponents/BaseSlider";
import BaseLink from "../../BaseComponents/BaseLink";

const CategoriesSection = () => {
	const store = useStore();
	return (
		<section className="container-layout">
			<BaseSlider
				slides={store.content.categories}
				slidesPerView={7}
				spaceBetween={20}
				showNavigation={true}
				showPagination={false}
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
