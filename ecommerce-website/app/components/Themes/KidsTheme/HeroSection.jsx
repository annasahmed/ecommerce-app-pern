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
			showNavigation={false}
			showPagination={false}
			arrowsPosition="inside"
			breakpoints={{
				768: {
					showNavigation: true,
				},
			}}
			renderSlide={(slide, idx) => (
				<BaseImage
					src={slide.img}
					key={idx}
					className="w-full h-auto max-md:min-h-[25vh] max-md:object-cover"
				/>
			)}
		/>
	);
};

export default HeroSection;
