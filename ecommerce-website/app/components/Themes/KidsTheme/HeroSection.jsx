"use client";
import { useStore } from "@/app/providers/StoreProvider";
import BaseImage from "../../BaseComponents/BaseImage";
import BaseSlider from "../../BaseComponents/BaseSlider";

const HeroSection = ({ images, autoplay = false }) => {
	return (
		<BaseSlider
			slides={images}
			slidesPerView={1}
			spaceBetween={0}
			showNavigation={false}
			showPagination={false}
			autoPlay={autoplay}
			arrowsPosition="inside"
			breakpoints={{
				768: {
					showNavigation: true,
				},
			}}
			renderSlide={(slide, idx) => (
				<BaseImage
					src={slide}
					key={idx}
					// width={1000}
					// height={1000}
					// sizes={100}
					className="w-full h-auto max-md:min-h-[25vh] max-md:object-cover"
				/>
			)}
		/>
	);
};

export default HeroSection;
