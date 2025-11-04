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

export default function BaseSliderWithThumbnails({ images }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<section>
			<Swiper
				style={{
					"--swiper-navigation-color": "#a9a9a9",
					"--swiper-pagination-color": "#a9a9a9",
				}}
				spaceBetween={10}
				navigation={true}
				loop
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper2 mb-2">
				{images?.map((v, idx) => (
					<SwiperSlide key={`product-images-${idx}`}>
						<div className="w-full border">
							<BaseImage src={v} className="mx-auto h-full max-h-80 object-contain" />
						</div>
					</SwiperSlide>
				))}
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
							src={v}
							className="w-full h-auto max-h-30 object-cover cursor-pointer active:border border-dark"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
