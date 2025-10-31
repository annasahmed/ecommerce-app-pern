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
import { useCartStore } from "@/app/store/cartStore";

const Navbar = () => {
	const store = useStore();
	const { cart, favourites } = useCartStore();
	const cartCount = cart?.length || 0;
	const favCount = favourites?.length || 0;
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
					<div className="flex-1 flex items-center justify-end gap-5 relative">
						{/* Favorites */}
						<BaseLink href="/favourites" className="relative">
							<Heart className="cursor-pointer hover:text-primary transition" />
							{favCount > 0 && (
								<span className="absolute -top-2 -right-2 bg-primary text-light p6 font-medium rounded-full w-4 h-4 flex items-center justify-center">
									{favCount}
								</span>
							)}
						</BaseLink>

						{/* Cart */}
						<BaseLink href="/cart" className="relative">
							<ShoppingCartIcon className="cursor-pointer hover:text-primary transition" />
							{cartCount > 0 && (
								<span className="absolute -top-2 -right-2 bg-primary text-light p6 font-medium rounded-full w-4 h-4 flex items-center justify-center">
									{cartCount}
								</span>
							)}
						</BaseLink>

						{/* User */}
						<div className="relative">
							<User className="cursor-pointer hover:text-primary transition" />
						</div>
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
