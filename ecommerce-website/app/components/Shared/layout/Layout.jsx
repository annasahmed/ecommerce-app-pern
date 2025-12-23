"use client";
import { loadThemeComponents } from "@/app/components/Themes/autoLoader";
import { useStore } from "@/app/providers/StoreProvider";
import WhatsAppButton from "../WhatsAppButton";

const Layout = ({ children }) => {
	const store = useStore();
	const { Navbar, Footer } = loadThemeComponents(store.themeName);
	return (
		<>
			<Navbar />
			{children}
			<WhatsAppButton />
			<Footer />
		</>
	);
};

export default Layout;
