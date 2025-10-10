"use client";
import { useStore } from "@/app/providers/StoreProvider";
import {
	Heart,
	Search,
	ShoppingCart,
	ShoppingCartIcon,
	User,
	UserRound,
} from "lucide-react";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import Logo from "@/app/components/Shared/Logo";
import SearchInput from "../../Shared/form/SearchInput";

const Navbar = () => {
	const store = useStore();
	return (
		<>
			<header className="text-headerText bg-header w-full py-2 text-center font-normal">
				<BaseLink
					href={store.content.header.link}
					className="container-layout p4">
					{store.content.header.text}
				</BaseLink>
			</header>
			<div className="border border-border-color py-6">
				<section className="flex container-layout items-center justify-between gap-20">
					<SearchInput className="flex-1" />
					<div className="flex-1">
						<Logo
							src={store.content.logo}
							className={`w-28 h-auto object-contain mx-auto`}
						/>
					</div>
					<div className="flex-1 flex items-center justify-end gap-5">
						<Heart />
						<ShoppingCartIcon />
						<User />
					</div>
				</section>
			</div>

			<nav className=" py-5 shadow-sm sticky top-0 bg-light z-100">
				<ul className="flex-1 flex items-center justify-center gap-10 container-layout">
					{store.content.navCategories.map((item, index) => (
						<li key={index} className="p4 font-medium">
							<BaseLink
								href={`/${item.slug}`}
								className={`uppercase hover:bg-primary hover:text-light px-4 py-1 rounded-full`}>
								{item.title}
							</BaseLink>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
};

export default Navbar;
