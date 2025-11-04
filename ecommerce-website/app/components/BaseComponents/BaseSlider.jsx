"use client";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
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
	arrowsPosition = "outside",
}) => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	useEffect(() => {
		// Swiper requires refs to be assigned after mount
	}, []);

	return (
		<div className="relative w-full">
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={spaceBetween}
				slidesPerView={slidesPerView}
				loop={loop}
				lazy={"true"}
				pagination={showPagination ? { clickable: true } : false}
				autoplay={
					autoPlay
						? {
								delay: autoPlayDelay,
								disableOnInteraction: false,
						  }
						: false
				}
				navigation={
					showNavigation
						? {
								prevEl: prevRef.current,
								nextEl: nextRef.current,
						  }
						: false
				}
				onSwiper={(swiper) => {
					setTimeout(() => {
						if (
							showNavigation &&
							prevRef?.current &&
							nextRef?.current &&
							swiper.params.navigation
						) {
							swiper.params.navigation.prevEl = prevRef.current;
							swiper.params.navigation.nextEl = nextRef.current;
							swiper.navigation.init();
							swiper.navigation.update();
						}
					});
				}}
				breakpoints={breakpoints}
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

			{/* Optional Custom Arrows */}
			{showNavigation && (
				<>
					<div
						ref={prevRef}
						className={`absolute ${
							arrowsPosition === "outside" ? "-left-12" : "left-8 max-md:left-2"
						} top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-dark  bg-light rounded-full p-1 max-md:p-0.5 text-xl select-none`}>
						<ChevronRight className="rotate-180 text-base size-5 max-md:size-3" />
					</div>
					<div
						ref={nextRef}
						className={`absolute ${
							arrowsPosition === "outside" ? "-right-12" : "right-8 max-md:right-2"
						} top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-dark  bg-light rounded-full p-1 max-md:p-0.5 text-xl select-none`}>
						<ChevronRight  className="size-5 max-md:size-3" />
					</div>
				</>
			)}
		</div>
	);
};

export default BaseSlider;
