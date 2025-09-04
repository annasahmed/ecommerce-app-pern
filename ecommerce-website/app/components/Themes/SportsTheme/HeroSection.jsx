import { storeSettingsSportsTheme } from "@/app/data/storeSettingsSportsTheme";
import React from "react";
import BaseLink from "../../BaseComponents/BaseLink";

const HeroSection = () => {
	const heroSectionData = storeSettingsSportsTheme.content.heroSection;
	return (
		<section
			className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: `url(${heroSectionData.image.src})`,
			}}>
			<div className="container-layout flex flex-col min-h-screen gap-8 justify-center text-light">
				<h1 className="main-h1 font-medium md:w-[35%]">
					{heroSectionData.heading}
				</h1>
				{heroSectionData.text && (
					<p className="p2 md:w-[35%]">{heroSectionData.text}</p>
				)}
				{heroSectionData.button &&
					(heroSectionData.link ? (
						<BaseLink
							href={heroSectionData.link}
							className="bg-header text-dark max-w-fit md:w-[35%] px-10 py-2 rounded-md">
							{heroSectionData.button}
						</BaseLink>
					) : (
						<button className="bg-header text-dark max-w-fit px-10 py-2 rounded-md">
							{heroSectionData.button}
						</button>
					))}
			</div>
		</section>
	);
};

export default HeroSection;
