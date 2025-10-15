"use client";
import { useStore } from "@/app/providers/StoreProvider";
import BaseImage from "../../BaseComponents/BaseImage";
import BaseSlider from "../../BaseComponents/BaseSlider";

const HeroSection = () => {
	const store = useStore();
	return (
		<BaseSlider
			slides={store.content.heroSlider}
			slidesPerView={1}
			spaceBetween={0}
			showNavigation={true}
			showPagination={false}
			arrowsPosition="inside"
			renderSlide={(slide, idx) => (
				<BaseImage src={slide.img} key={idx} className="w-full h-auto" />
			)}
		/>
	);
};

export default HeroSection;
