"use client";
import { useState } from "react";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import Logo from "@/app/components/Shared/Logo";
import { useStore } from "@/app/providers/StoreProvider";
import { useCartStore } from "@/app/store/cartStore";
import { Heart, ShoppingCartIcon, User, Menu, X, Search } from "lucide-react";
import SearchInput from "../../Shared/form/SearchInput";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showMobileSearch, setShowMobileSearch] = useState(false);

	const store = useStore();
	const { cart, favourites } = useCartStore();

	const cartCount = cart?.length || 0;
	const favCount = favourites?.length || 0;

	return (
		<>
			{/* Top Header */}
			<header className="text-headerText bg-header w-full py-2 text-center text-sm sm:text-base">
				<BaseLink href={store.content.header.link} className="container-layout">
					{store.content.header.text}
				</BaseLink>
			</header>

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
						{/* Desktop Search */}
						<div className="hidden md:block flex-1 md:w-3/4">
							<SearchInput className="w-full" />
						</div>
					</div>
					{/* Logo */}
					<div className="flex-1">
						<Logo
							src={store.content.logo}
							className="w-40 max-md:w-28 h-auto object-contain mx-auto"
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
							<Heart className="cursor-pointer hover:text-primary transition" />
							{favCount > 0 && (
								<span className="absolute -top-2 -right-2 bg-primary text-light text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
									{favCount}
								</span>
							)}
						</BaseLink>

						{/* Cart */}
						<BaseLink href="/cart" className="relative">
							<ShoppingCartIcon className="cursor-pointer hover:text-primary transition" />
							{cartCount > 0 && (
								<span className="absolute -top-2 -right-2 bg-primary text-light text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
									{cartCount}
								</span>
							)}
						</BaseLink>

						{/* User */}
						<User className="cursor-pointer hover:text-primary transition hidden sm:block" />
					</div>
				</section>

				{/* Mobile Search Dropdown */}
				{showMobileSearch && (
					<div className="absolute left-0 top-full w-full bg-white border-t border-gray-200 px-4 py-3 shadow-md sm:hidden z-50">
						<SearchInput className="w-full" placeholder="Search products..." />
					</div>
				)}
			</div>

			{/* Navigation Menu */}
			<nav className="bg-light shadow-sm sticky top-0 z-40">
				{/* Desktop Nav */}
				<ul className="hidden sm:flex flex-wrap items-center justify-between gap-4 py-4 container-layout">
					{store.content.navCategories.map((item, index) => (
						<li key={index} className="text-sm sm:text-base font-medium">
							<BaseLink
								href={`${item.to || `/products?category=${item.slug}`}`}
								className="uppercase hover:bg-primary hover:text-light px-4 py-1 rounded-full transition">
								{item.title}
							</BaseLink>
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
		</>
	);
};

export default Navbar;
