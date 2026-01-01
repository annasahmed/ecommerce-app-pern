import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { ENV_VARIABLES } from "@/app/constants/env_variables";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import BaseImage from "../BaseComponents/BaseImage";
import SideZoomImage from "./ImageZoom";

export default function BaseSliderWithThumbnails({ images }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<section className="md:flex flex-row-reverse gap-4 md:col-span-3">
			<Swiper
				style={{
					"--swiper-navigation-color": "#525252",
					"--swiper-pagination-color": "#000000",
				}}
				spaceBetween={10}
				navigation={true}
				effect={"fade"}
				loop
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper2 mb-2 flex-1 md:h-[568px]">
				{images?.map((v, idx) => {
					return (
						<SwiperSlide key={`product-images-${idx}`}>
							<div className="h-full w-full bg-light/">
								<SideZoomImage
									src={v ? ENV_VARIABLES.IMAGE_BASE_URL + v : null}
								/>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				direction="horizontal"
				spaceBetween={10}
				slidesPerView={3}
				freeMode={true}
				watchSlidesProgress={true}
				breakpoints={{
					768: {
						direction: "vertical",
					},
				}}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper md:w-24 md:max-h-95">
				{images?.map((v, idx) => (
					<SwiperSlide key={`product-images-${idx}`}>
						<BaseImage
							src={v ? ENV_VARIABLES.IMAGE_BASE_URL + v : null}
							width={500}
							height={500}
							className="w-full h-auto max-h-30 object-cover cursor-pointer active:border border-dark"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
