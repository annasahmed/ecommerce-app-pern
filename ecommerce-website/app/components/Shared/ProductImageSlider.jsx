import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import BaseImage from "../BaseComponents/BaseImage";
import { ENV_VARIABLES } from "@/app/constants/env_variables";

export default function BaseSliderWithThumbnails({ images }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<section>
			<Swiper
				style={{
					"--swiper-navigation-color": "#525252",
					"--swiper-pagination-color": "#000000",
				}}
				spaceBetween={10}
				navigation={true}
				loop
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper2 mb-2">
				{images?.map((v, idx) => {
					return (
						<SwiperSlide key={`product-images-${idx}`}>
							<div className="w-full border">
								<BaseImage
									src={v ? ENV_VARIABLES.IMAGE_BASE_URL + v : null}
									width={500}
									height={500}
									className="mx-auto/ w-full max-h-80/ object-cover"
								/>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={3}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper">
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
