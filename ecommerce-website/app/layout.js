import "@/app/styles/headings.css";
import "@/app/styles/layout.css";
import "@/app/styles/paragraphs.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";
import localFont from "next/font/local";

const champagne = localFont({
	//changing font family its not champagne itlaic
	src: [
		{
			path: "./fonts/Champagne-and-Limousines/Champagne-and-Limousines-Bold-Italic.ttf",
			weight: "700",
			style: "italic",
		},
		{
			path: "./fonts/Champagne-and-Limousines/Champagne-and-Limousines-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/Champagne-and-Limousines/Champagne-and-Limousines-Italic.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "./fonts/Champagne-and-Limousines/Champagne-and-Limousines-Bold.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-champagne", // CSS Variable
	display: "swap",
});

const konnect = localFont({
	//changing font family its not konnect itlaic
	src: [
		{
			path: "./fonts/Konnect/KonnectRegular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/Konnect/KonnectItalic.otf",
			weight: "400",
			style: "italic",
		},
		{
			path: "./fonts/Konnect/KonnectMedium.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/Konnect/KonnectMediumItalic.otf",
			weight: "500",
			style: "italic",
		},
		{
			path: "./fonts/Konnect/KonnectLight.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "./fonts/Konnect/KonnectLightItalic.otf",
			weight: "300",
			style: "italic",
		},
		{
			path: "./fonts/Konnect/KonnectSemiBold.otf",
			weight: "600",
			style: "normal",
		},
		{
			path: "./fonts/Konnect/KonnectSemiBoldItalic.otf",
			weight: "600",
			style: "italic",
		},
		{
			path: "./fonts/Konnect/KonnectBold.otf",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/Konnect/KonnectBoldItalic.otf",
			weight: "700",
			style: "italic",
		},
	],
	variable: "--font-konnect", // CSS Variable
	display: "swap",
});

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				cz-shortcut-listen="true"
				className={`${champagne.variable} ${konnect.variable}`}>
				{children}
			</body>
		</html>
	);
}
