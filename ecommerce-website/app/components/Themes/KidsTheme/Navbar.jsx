"use client";
import { useEffect, useState } from "react";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import Logo from "@/app/components/Shared/Logo";
import { useStore } from "@/app/providers/StoreProvider";
import { useCartStore } from "@/app/store/cartStore";
import { Heart, ShoppingCartIcon, User, Menu, X, Search } from "lucide-react";
import SearchInput from "../../Shared/form/SearchInput";
import NavigationMenu from "./NavigationMenu";
import { useAuth } from "@/app/providers/AuthProvider";
import CartDrawer from "@/app/[locale]/(pages)/cart/cartDrawer";
import AuthDrawer from "../../Shared/AuthDrawer";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
	const [authDrawerOpen, setAuthDrawerOpen] = useState(false);
	const [showMobileSearch, setShowMobileSearch] = useState(false);

	const store = useStore();
	const { cart, favourites } = useCartStore();

	const { isAuthenticated, user } = useAuth();

	const cartCount = cart?.length || 0;
	const favCount = favourites?.length || 0;

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isMenuOpen]);

	return (
		<>
			{/* Top Header */}
			<header className="text-headerText bg-header w-full py-2 text-center p4">
				<p className="container-layout">{store.content.header.text}</p>
			</header>
			<div className="sticky top-0 z-40">
				{/* Main Navbar */}
				<div className="border-b border-border-color py-3 sm:py-5 bg-light relative">
					<section className="flex container-layout items-center justify-between gap-3 sm:gap-10">
						{/* Left Section */}
						<div className="flex items-center gap-3 flex-1">
							{/* Mobile Menu Button */}
							<button
								className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition"
								onClick={() => setIsMenuOpen((prev) => !prev)}>
								{isMenuOpen ? <X size={22} /> : <Menu size={22} />}
							</button>
							<Logo
								src={store.content.logo}
								className="w-40 max-md:w-28 h-auto object-contain mx-auto max-md:hidden"
							/>
						</div>
						{/* Logo */}
						<div className="flex-1 md:flex-2">
							{/* Desktop Search */}
							<div className="hidden md:block flex-1 md:w-3/4/">
								<SearchInput className="w-full" />
							</div>
							<Logo
								src={store.content.logo}
								className="w-40 max-md:w-28 h-auto object-contain mx-auto md:hidden"
							/>
						</div>
						{/* Right Section (Icons) */}
						<div className="flex flex-1 justify-end items-center gap-4 sm:gap-6 relative">
							{/* Search Icon for Mobile */}
							<button
								className="sm:hidden"
								onClick={() => setShowMobileSearch((prev) => !prev)}>
								<Search className="cursor-pointer hover:text-primary transition" />
							</button>

							{/* Favourites */}
							<BaseLink href="/favourites" className="relative hidden sm:block">
								<Heart className="cursor-pointer hover:text-primary transition stroke-1" />
								{favCount > 0 && (
									<span className="absolute -top-2 -right-2 bg-primary text-light text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
										{favCount}
									</span>
								)}
							</BaseLink>

							{/* Cart */}
							<button
								// href="/cart"
								onClick={() => {
									setIsCartDrawerOpen(true);
								}}
								className="relative">
								<ShoppingCartIcon className="cursor-pointer hover:text-primary transition stroke-1" />
								{cartCount > 0 && (
									<span className="absolute -top-2 -right-2 bg-primary text-light text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
										{cartCount}
									</span>
								)}
							</button>

							{/* User */}

							<button
								onClick={() => {
									setAuthDrawerOpen(true);
								}}
								// href={!isAuthenticated ? "/login" : "/profile"}
							>
								<User className="cursor-pointer hover:text-primary transition hidden sm:block stroke-1" />
							</button>
						</div>
					</section>

					{/* Mobile Search Dropdown */}
					{showMobileSearch && (
						<div className="absolute left-0 top-full w-full bg-white border-t border-gray-200 px-4 py-3 shadow-md sm:hidden z-50">
							<SearchInput
								className="w-full"
								placeholder="Search products..."
							/>
						</div>
					)}
				</div>

				<AuthDrawer open={authDrawerOpen} setOpen={setAuthDrawerOpen} />
				<CartDrawer open={isCartDrawerOpen} setOpen={setIsCartDrawerOpen} />
				{/* Navigation Menu */}
				<NavigationMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			</div>
		</>
	);
};

export default Navbar;
