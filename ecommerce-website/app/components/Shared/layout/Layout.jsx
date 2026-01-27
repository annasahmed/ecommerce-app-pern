"use client";
import { loadThemeComponents } from "@/app/components/Themes/autoLoader";
import { useStore } from "@/app/providers/StoreProvider";
import WhatsAppButton from "../WhatsAppButton";
import MobileBottomNav from "../MobileBottomNav";
import BackToTop from "../BackToTop";

const Layout = ({ children }) => {
	const store = useStore();
	const { Navbar, Footer } = loadThemeComponents(store.themeName);
	return (
		<>
			<Navbar />
			{children}
			<WhatsAppButton />
			<BackToTop />
			<MobileBottomNav />
			<Footer />
		</>
	);
};

export default Layout;
