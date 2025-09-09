"use client";
import { loadThemeComponents } from "@/app/components/Themes/autoLoader";
import { useStore } from "@/app/providers/StoreProvider";

const Layout = ({ children }) => {
	const store = useStore();
	const { Navbar, Footer } = loadThemeComponents(store.themeName);
	return (
		<>
			<Navbar />
			{/* <main className="w-full min-h-[50vh]"></main> */}
			{children}
			<Footer />
		</>
	);
};

export default Layout;
