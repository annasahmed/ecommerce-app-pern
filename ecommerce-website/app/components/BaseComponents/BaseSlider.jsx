"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BaseSlider = ({
	slides = [],
	showNavigation = true,
	showPagination = true,
	autoPlay = false,
	autoPlayDelay = 3000,
	slidesPerView = 1,
	spaceBetween = 10,
	loop = true,
	className = "",
	renderSlide,
	breakpoints = {},
}) => {
	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay]}
			spaceBetween={spaceBetween}
			slidesPerView={slidesPerView}
			loop={loop}
			navigation={showNavigation}
			pagination={showPagination ? { clickable: true } : false}
			autoplay={
				autoPlay
					? {
							delay: autoPlayDelay,
							disableOnInteraction: false,
					  }
					: false
			}
			breakpoints={breakpoints} // ✅ responsive support
			className={className}>
			{slides.map((item, index) => (
				<SwiperSlide key={index}>
					{renderSlide ? (
						renderSlide(item, index)
					) : (
						<img src={item} alt={`slide-${index}`} />
					)}
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default BaseSlider;
