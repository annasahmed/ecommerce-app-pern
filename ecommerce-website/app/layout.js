import "@/app/styles/headings.css";
import "@/app/styles/layout.css";
import "@/app/styles/paragraphs.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import some common Google Fonts (extend this list as needed)
import "./globals.css";

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<body cz-shortcut-listen="true">{children}</body>
		</html>
	);
}
