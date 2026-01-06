import BaseLink from "@/app/components/BaseComponents/BaseLink";
import { useStore } from "@/app/providers/StoreProvider";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const NavigationMenu = ({ isMenuOpen, setIsMenuOpen }) => {
	const store = useStore();
	const [activeMenu, setActiveMenu] = useState(false);
	const [openIndex, setOpenIndex] = useState(null);
	return (
		<nav className="bg-primary text-light shadow-sm overflow-auto">
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

			{/* dark overlay */}
			{/* {isMenuOpen && (
				<div
					className="fixed inset-0 bg-black/40 z-40 sm:hidden"
					onClick={() => setIsMenuOpen(false)}
				/>
			)} */}

			{/* Mobile Nav */}
			<div
				className={`sm:hidden fixed top-0 left-0 w-full bg-primary z-50
				transition-transform duration-300
				${isMenuOpen ? "translate-y-25" : "-translate-y-full"}
				h-full max-h-[calc(100vh-100px)] overflow-y-auto`}>
				<ul className="p-4/ space-y-2/">
					{store.content.navCategories.map((item, index) => (
						<li key={index}>
							<div
								onClick={() => setOpenIndex(openIndex === index ? null : index)}
								className={`flex items-center justify-between py-4 px-4
								transition-colors cursor-pointer
								${openIndex === index ? "bg-secondary/5" : "bg-transparent"}
								border-b border-border-color/70`}>
								<BaseLink
									href={item.to || `/products?category=${item.slug}`}
									onClick={() => setIsMenuOpen(false)}
									className="uppercase text-sm font-semibold tracking-wide">
									{item.title}
								</BaseLink>

								{item.categories?.length > 0 && (
									<ChevronDown
										size={18}
										className={`transition-transform duration-300
										${openIndex === index ? "rotate-180 text-secondary" : "text-light/70"}`}
									/>
								)}
							</div>

							{item.categories?.length > 0 && (
								<div
									className={`overflow-hidden transition-all duration-300
									${openIndex === index ? "max-h-[800px] mt-2" : "max-h-0"}`}>
									{item.categories.map((cat, i) => (
										<div
											key={i}
											className="ml-3/ pl-3/ py-3 border-b border-border-color/25">
											<h4 className="text-sm font-medium uppercase mb-3 tracking-wider border-b border-border-color/25 pl-6 pb-2 text-light/80">
												{cat.title}
											</h4>

											<ul className="space-y-2 pl-8">
												{cat.subCategories?.map((subCat, idx) => (
													<li
														key={idx}
														className="text-sm text-light/70 hover:text-secondary transition-colors cursor-pointer">
														{subCat}
													</li>
												))}
											</ul>
										</div>
									))}
								</div>
							)}
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default NavigationMenu;
