"use client";
import useWindowSize from "@/app/hooks/useWindowSize";
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
	const swiperRef = useRef(null);

	const windowSize = useWindowSize();
	const shouldShowNavigation =
		(windowSize?.width > 768 && breakpoints?.[768]?.showNavigation) ||
		showNavigation;

	// ✅ Properly reinitialize navigation after Swiper + Refs mount
	useEffect(() => {
		if (
			swiperRef.current &&
			prevRef.current &&
			nextRef.current &&
			shouldShowNavigation
		) {
			const swiper = swiperRef.current;
			swiper.params.navigation.prevEl = prevRef.current;
			swiper.params.navigation.nextEl = nextRef.current;

			swiper.navigation.destroy();
			swiper.navigation.init();
			swiper.navigation.update();
		}
	}, [shouldShowNavigation, windowSize.width]);

	return (
		<div className="relative w-full">
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={spaceBetween}
				slidesPerView={slidesPerView}
				loop={loop}
				lazy={`true`}
				onSwiper={(swiper) => (swiperRef.current = swiper)} // ✅ save swiper instance
				pagination={showPagination ? { clickable: true } : false}
				autoplay={
					autoPlay
						? {
								delay: autoPlayDelay,
								disableOnInteraction: false,
						  }
						: false
				}
				navigation={false} // disable default init, we handle it manually
				breakpoints={breakpoints}
				className={className}>
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

			{/* ✅ Custom Arrows */}
			{shouldShowNavigation && (
				<>
					<div
						ref={prevRef}
						className={`absolute ${
							arrowsPosition === "outside" ? "-left-12" : "left-8 max-md:left-2"
						} top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-dark bg-light rounded-full p-1 max-md:p-0.5 text-xl select-none`}>
						<ChevronRight className="rotate-180 size-5 max-md:size-3" />
					</div>
					<div
						ref={nextRef}
						className={`absolute ${
							arrowsPosition === "outside"
								? "-right-12"
								: "right-8 max-md:right-2"
						} top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-dark bg-light rounded-full p-1 max-md:p-0.5 text-xl select-none`}>
						<ChevronRight className="size-5 max-md:size-3" />
					</div>
				</>
			)}
		</div>
	);
};

export default BaseSlider;
