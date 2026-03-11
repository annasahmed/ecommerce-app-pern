"use client";

import { useAuth } from "@/app/providers/AuthProvider";
import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiHeart,
  FiSearch,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

export default function MobileBottomNav() {
  const { cart, favourites } = useCartStore();
  const cartCount = cart?.length || 0;
  const favCount = favourites?.length || 0;
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const getActive = () => {
    if (pathname.includes("favourites")) return "wishlist";
    if (pathname.includes("cart")) return "cart";
    if (pathname.includes("products")) return "search";
    if (
      pathname.includes("login") ||
      pathname.includes("signup") ||
      pathname.includes("profile")
    )
      return "account";
    return "shop";
  };

  const active = getActive();

  return (
    <nav className="pt-2 pb-1 fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 sm:hidden pb-[env(safe-area-inset-bottom)]/">
      <ul className="container-layout flex justify-between items-center">
        <NavItem
          href="/"
          icon={FiGrid}
          label="Shop"
          active={active === "shop"}
        />
        <NavItem
          href="/favourites"
          icon={FiHeart}
          label="Wishlist"
          count={favCount}
          active={active === "wishlist"}
        />
        <NavItem
          href="/cart"
          icon={FiShoppingCart}
          label="Cart"
          count={cartCount}
          active={active === "cart"}
        />
        <NavItem
          href={isAuthenticated ? "/profile" : "/login"}
          icon={FiUser}
          label="Account"
          active={active === "account"}
        />
        <NavItem
          href="/products"
          icon={FiSearch}
          label="Search"
          active={active === "search"}
        />
      </ul>
    </nav>
  );
}

function NavItem({ href, icon: Icon, label, count, active }) {
  return (
    <li>
      <Link
        href={href}
        className="flex flex-col items-center gap-1 text-xs transition-all active:scale-90"
      >
        <div
          className={`relative text-xl ${
            active ? "text-secondary/ text-primary" : "text-gray-400/ text-secondary "
          }`}
        >
          <Icon />
          {count > 0 && (
            <span className="absolute -top-1 -right-2 bg-secondary text-white text-[10px] rounded-full w-3 h-3 flex justify-center items-center leading-0">
              {count}
            </span>
          )}
        </div>
        <span
          className={`${
            active ? "text-secondary/ text-primary font-medium" : "text-gray-400/ text-secondary "
          }`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
