import BaseLink from "@/app/components/BaseComponents/BaseLink";
import { useStore } from "@/app/providers/StoreProvider";
import { useState } from "react";

const NavigationMenu = ({ isMenuOpen }) => {
	const store = useStore();
	const [activeMenu, setActiveMenu] = useState(false);
	return (
		<nav className="bg-light shadow-sm ">
			{/* Desktop Nav */}
			<ul className="hidden sm:flex flex-wrap items-center justify-between gap-4 py-4 container-layout">
				{store.content.navCategories.map((item, index) => (
					<li
						key={index}
						className="text-sm sm:text-base font-medium relative"
						onMouseEnter={() => setActiveMenu(index)}
						onMouseLeave={() => setActiveMenu(false)}>
						<BaseLink
							href={`${item.to || `/products?category=${item.slug}`}`}
							className="uppercase hover:bg-primary hover:text-light px-4 py-1 rounded-full transition">
							{item.title}
						</BaseLink>

						{/* {activeMenu === index && (
							<div className="absolute top-40 left-0 w-full h-40 bg-black"></div>
						)} */}
					</li>
				))}
			</ul>

			{/* Mobile Nav */}
			{isMenuOpen && (
				<ul className="flex flex-col items-center gap-3 py-4 sm:hidden bg-light border-t border-border-color">
					{store.content.navCategories.map((item, index) => (
						<li key={index} className="w-full text-center">
							<BaseLink
								href={`${item.to || `/products?category=${item.slug}`}`}
								className="block w-full py-2 uppercase font-medium hover:bg-primary hover:text-light transition">
								{item.title}
							</BaseLink>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
};

export default NavigationMenu;
