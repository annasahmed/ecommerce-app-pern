"use client";
import { useStore } from "@/app/providers/StoreProvider";
import BaseImage from "../../BaseComponents/BaseImage";
import BaseSlider from "../../BaseComponents/BaseSlider";

const CategoriesSection = () => {
	const store = useStore();
	return (
		<section className="container-layout section-layout">
			<BaseSlider
				slides={store.content.categories}
				slidesPerView={7}
				spaceBetween={20}
				showNavigation={true}
				showPagination={false}
				renderSlide={(category, idx) => (
					<BaseImage
						src={category.icon}
						key={idx}
						className="w-full rounded-full h-auto border-2 border-dotted p-1 border-secondary"
					/>
				)}
			/>
		</section>
	);
};
export default CategoriesSection;
