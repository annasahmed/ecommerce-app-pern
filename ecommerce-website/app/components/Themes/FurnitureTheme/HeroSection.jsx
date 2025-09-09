import { useStore } from "@/app/providers/StoreProvider";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import OverlayContainer from "@/app/components/Shared/OverlayContainer";

const HeroSection = () => {
	const store = useStore();
	const heroSectionData = store.content.heroSection;
	return (
		<section
			className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative"
			style={{
				backgroundImage: `url(${heroSectionData.image.src})`,
			}}>
			<OverlayContainer opacity={0.5} />
			<div className="container-layout flex flex-col min-h-screen gap-8 justify-center text-light relative">
				<h1 className="main-h1 font-medium md:w-[40%]">
					{heroSectionData.heading}
				</h1>
				{heroSectionData.text && (
					<p className="p2 md:w-[40%]">{heroSectionData.text}</p>
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
