import BaseLink from "@/app/components/BaseComponents/BaseLink";
import { useStore } from "@/app/providers/StoreProvider";
import { useState } from "react";

const NavigationMenu = ({ isMenuOpen }) => {
	const store = useStore();
	const [activeMenu, setActiveMenu] = useState(false);
	return (
		<nav className="bg-primary text-light shadow-sm ">
			{/* Desktop Nav */}
			<ul className="hidden sm:flex flex-wrap items-center justify-between gap-4 pt-4 container-layout">
				{store.content.navCategories.map((item, index) => (
					<li
						key={index}
						className="text-sm sm:text-base font-medium relative pb-4"
						onMouseEnter={() => setActiveMenu(index)}
						onMouseLeave={() => setActiveMenu(null)}>
						<BaseLink
							href={`${item.to || `/products?category=${item.slug}`}`}
							className="uppercase hover:underline px-4 py-1 rounded-full transition">
							{item.title}
						</BaseLink>

						{item.categories?.length > 0 && (
							<div
								className={`
								absolute
								top-10
								left-0
								min-w-160
								bg-primary
								py-5
								px-2
								transition-all
								duration-300
								ease-out
								transform
								${
									activeMenu === index
										? "opacity-100 translate-y-0/ translate-y-0 scale-100 pointer-events-auto"
										: "opacity-0 translate-y-4/ translate-y-2 scale-95 pointer-events-none"
								}
							`}>
								{item.categories?.length > 0 && (
									<ul className="flex">
										{item.categories.map((cat, i) => (
											<li key={i} className="px-4 flex-1">
												<h3 className="font-normal h7 uppercase text-light border-b border-border-color whitespace-nowrap pb-1 mb-4">
													{cat.title}
												</h3>

												<ul className="space-y-1">
													{cat.subCategories?.map((subCat, idx) => (
														<li
															key={idx}
															className="text-light hover:text-secondary cursor-pointer transition-colors">
															{subCat}
														</li>
													))}
												</ul>
											</li>
										))}
									</ul>
								)}
							</div>
						)}
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
