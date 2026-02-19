import { useEffect, useMemo, useRef, useState } from "react";
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
import SliderArrows from "../BaseComponents/SliderArrows";

export default function ProductImageSlider({ images, selectedVariant }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const swiperRef = useRef(null);
	const uniqueImages = useMemo(() => {
		return [...new Set(images || [])];
	}, [images]);

	const variantImage = selectedVariant?.image;
	useEffect(() => {
		if (!swiperRef.current) return;
		if (!variantImage) {
			swiperRef.current.slideToLoop(0);
		}
		const index = uniqueImages.findIndex((img) => img === variantImage);

		if (index !== -1) {
			// because loop is enabled
			swiperRef.current.slideToLoop(index);
		}
	}, [variantImage, uniqueImages]);

	useEffect(() => {
		if (swiperRef.current && prevRef.current && nextRef.current) {
			const swiper = swiperRef.current;
			swiper.params.navigation.prevEl = prevRef.current;
			swiper.params.navigation.nextEl = nextRef.current;

			swiper.navigation.destroy();
			swiper.navigation.init();
			swiper.navigation.update();
		}
	}, []);

	return (
		<section className="md:flex flex-row-reverse gap-4 md:col-span-3 relative">
			<div className="md:flex/ flex-1 mb-2 flex-row-reverse gap-4 md:col-span-3 relative md:w-[calc(100%-112px)]">
				<Swiper
					style={{
						"--swiper-navigation-color": "#525252",
						"--swiper-pagination-color": "#000000",
					}}
					spaceBetween={10}
					navigation={{
						prevEl: prevRef.current,
						nextEl: nextRef.current,
					}}
					onSwiper={(swiper) => (swiperRef.current = swiper)} // ✅ save swiper instance
					effect={"fade"}
					loop
					thumbs={{ swiper: thumbsSwiper }}
					modules={[FreeMode, Navigation, Thumbs]}
					className="mySwiper2 flex-1 mb-2 md:h-[568px]/">
					{uniqueImages?.map((v, idx) => {
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
				<SliderArrows prevRef={prevRef} nextRef={nextRef} position={"inside"} />
			</div>

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
				className="mySwiper md:min-w-24 md:max-h-95">
				{uniqueImages?.map((v, idx) => (
					<SwiperSlide key={`product-images-${idx}`}>
						<BaseImage
							src={v ? ENV_VARIABLES.IMAGE_BASE_URL + v : null}
							width={500}
							height={500}
							className="w-full h-auto max-h-30 object-cover cursor-pointer border"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
