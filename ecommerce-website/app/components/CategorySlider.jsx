import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import BaseLink from "./BaseComponents/BaseLink";
import BaseImage from "./BaseComponents/BaseImage";
import { useStore } from "../providers/StoreProvider";

export default function App({ data = [] }) {
	const store = useStore();
	const slidesData = [...store.content.categories, ...store.content.categories];
	return (
		<>
			<Swiper
				loop={true}
				effect={"coverflow"}
				grabCursor={true}
				centeredSlides={true}
				slidesPerView={"auto"}
				coverflowEffect={{
					rotate: 0,
					stretch: 0,
					depth: 150,
					modifier: 1,
					slideShadows: false,
				}}
				pagination={{
					clickable: true,

					// renderBullet: function (index, className) {
					// 	// calculate the max 7 dots
					// 	const totalSlides = slidesData.length;
					// 	const maxDots = 7;
					// 	const step = Math.ceil(totalSlides / maxDots); // how many slides per dot

					// 	// only create dots for multiples of step
					// 	if (index % step === 0 || index === totalSlides - 1) {
					// 		return `<span class="${className}"></span>`;
					// 	} else {
					// 		return "";
					// 	}
					// },
				}}
				modules={[EffectCoverflow, Pagination]}
				className="flat-coverflow-slider">
				{slidesData.map((category, idx) => (
					<SwiperSlide key={idx}>
						<div key={idx} className="bg-white shadow-xl rounded-xl pb-3">
							<BaseLink href={`/products?category=${category.slug}`}>
								<BaseImage
									src={category.icon}
									key={idx}
									className="w-full h-auto object-cover rounded-t-xl"
								/>
								<h3 className="max-md:hidden h3 text-center capitalize mt-2 font-medium">
									{category.title}
								</h3>
								<h4 className="md:hidden h5 text-center capitalize mt-2 font-normal">
									{category.title}
								</h4>
							</BaseLink>
						</div>
						{/* <img src={`https://swiperjs.com/demos/images/nature-${img}.jpg`} /> */}
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
