"use client";
import { loadThemeComponents } from "@/app/components/Themes/autoLoader";
import { useStore } from "@/app/providers/StoreProvider";
import WhatsAppButton from "../WhatsAppButton";
import MobileBottomNav from "../MobileBottomNav";

const Layout = ({ children }) => {
	const store = useStore();
	const { Navbar, Footer } = loadThemeComponents(store.themeName);
	return (
		<>
			<Navbar />
			{children}
			<WhatsAppButton />
			<MobileBottomNav />
			<Footer />
		</>
	);
};

export default Layout;
