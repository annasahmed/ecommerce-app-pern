"use client";
import { useState } from "react";
import BaseSlider from "@/app/components/BaseComponents/BaseSlider";
import Image from "next/image";

export default function ProductImageSlider({
	images = [],
	isNew = false,
	discount = 0,
}) {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="w-full">
			{/* --- Main Image Slider --- */}
			<div className="relative bg-gray-50 rounded-md overflow-hidden">
				{/* Badges */}
				<div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
					{isNew && (
						<span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
							NEW
						</span>
					)}
					{discount > 0 && (
						<span className="bg-[#00B67A]/10 text-[#00B67A] text-xs font-semibold px-2 py-1 rounded">
							-{discount}%
						</span>
					)}
				</div>

				{/* Main Slider */}
				<BaseSlider
					slides={images}
					showPagination={false}
					showNavigation={true}
					slidesPerView={1}
					className="w-full"
					renderSlide={(img, index) => (
						<div
							className="flex justify-center items-center w-full h-[400px] bg-white cursor-pointer transition-all"
							onClick={() => setActiveIndex(index)}>
							<Image
								src={img}
								alt={`product-${index}`}
								width={400}
								height={400}
								className="object-contain max-h-[400px]"
							/>
						</div>
					)}
				/>
			</div>

			{/* --- Thumbnails --- */}
			<div className="grid grid-cols-3 gap-2 mt-3">
				{images.map((img, index) => (
					<div
						key={index}
						onClick={() => setActiveIndex(index)}
						className={`border rounded-md overflow-hidden cursor-pointer ${
							activeIndex === index
								? "border-black"
								: "border-gray-200 hover:border-gray-400"
						}`}>
						<Image
							src={img}
							alt={`thumb-${index}`}
							width={120}
							height={120}
							className="w-full h-[100px] object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
