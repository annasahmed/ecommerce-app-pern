import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className="w-full min-h-[50vh]">{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
