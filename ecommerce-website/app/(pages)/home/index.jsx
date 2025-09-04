"use client";
import BaseImage from "@/app/components/BaseComponents/BaseImage";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import HeroSection from "@/app/components/Themes/SportsTheme/HeroSection";
import {
	categories,
	storeSettingsSportsTheme,
} from "@/app/data/storeSettingsSportsTheme";
import React from "react";

const HomePage = () => {
	return (
		<main>
			<HeroSection />
			<section className="section-layout container-layout flex flex-col gap-10">
				<h2 className="h2 text-center font-bold">Shop By Categories</h2>
				<div className="grid grid-cols-3 gap-6 gap-y-12 justify-between items-center">
					{categories?.map((category, idx) => {
						return (
							<BaseLink
								href={`/products/${category.slug}`}
								key={idx}
								className="flex flex-col gap-6">
								<BaseImage
									src={category.image}
									alt={category.title}
									width={500}
									height={500}
									className="w-full h-auto object-contain bg-cardsBg px-4 pt-4"
									style={{
										mixBlendMode: "multiply",
									}}
								/>
								<h6 className="h5 font-semibold text-center">
									{category.title}
								</h6>
							</BaseLink>
						);
					})}
				</div>
			</section>
		</main>
	);
};

export default HomePage;
