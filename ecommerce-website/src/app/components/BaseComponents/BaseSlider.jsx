"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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
		<>
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={spaceBetween}
				slidesPerView={slidesPerView}
				loop={loop}
				lazy={true}
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
				className={`${className}`}>
				{slides.map((item, index) => (
					<SwiperSlide key={index} className="!h-auto">
						{renderSlide ? (
							renderSlide(item, index)
						) : (
							<img src={item} alt={`slide-${index}`} />
						)}
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default BaseSlider;
