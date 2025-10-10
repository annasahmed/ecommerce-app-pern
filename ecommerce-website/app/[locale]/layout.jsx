import Layout from "@/app/components/Shared/layout/Layout";
import { getTheme } from "@/app/lib/getTheme";
import { StoreProvider } from "@/app/providers/StoreProvider";
import "@/app/styles/headings.css";
import "@/app/styles/layout.css";
import "@/app/styles/paragraphs.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NextIntlClientProvider } from "next-intl";
// Import some common Google Fonts (extend this list as needed)
import { Geist, Inter, Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";

import ReactQueryProvider from "@/app/providers/ReactQueryProvider";

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist",
});

const roboto = Roboto({
	subsets: ["latin"],
	variable: "--font-roboto",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

let cachedTheme = null;

// to avoid duplicate API calls
async function getCachedTheme() {
	if (!cachedTheme) cachedTheme = await getTheme();
	return cachedTheme;
}

export async function generateMetadata() {
	const store = await getCachedTheme();

	const meta = store?.metaTags || {};

	return {
		title: meta.title || "Default Title",
		description: meta.description || "Default description",
		keywords: meta.keywords || "shop, ecommerce, default",
		openGraph: {
			title: meta.ogTitle || meta.title,
			description: meta.ogDescription || meta.description,
			images: meta.ogImage ? [meta.ogImage] : [],
		},
		twitter: {
			card: "summary_large_image",
			title: meta.twitterTitle || meta.title,
			description: meta.twitterDescription || meta.description,
			images: meta.twitterImage ? [meta.twitterImage] : [],
		},
		icons: {
			icon: store.favicon || "/favicon.ico", // fallback
		},
	};
}

export default async function RootLayout({ children }) {
	const store = await getCachedTheme();

	const fontMap = {
		geist: geist.variable,
		roboto: roboto.variable,
		inter: inter.variable,
	};

	const fontClass = fontMap[store?.fontFamily?.toLowerCase()] || fontMap.inter;

	const colors = store.theme || {
		primary: "#1E40AF",
		secondary: "#9333EA",
		background: "#F9FAFB",
		text: "#111827",
	};

	return (
		<html lang="en">
			<body
				className={`${fontClass} antialiased`}
				style={{
					// need to define theme colors here and in app/globals.css in @theme <-- for new colors
					["--color-header"]: colors.header,
					["--color-headerText"]: colors.headerText,
					["--color-primary"]: colors.primary,
					["--color-footer"]: colors.footer,
					["--color-cardsBg"]: colors.cardsBg,
					["--color-secondary"]: colors.secondary,
					["--color-background"]: colors.background,
					["--color-text"]: colors.text,
				}}
				cz-shortcut-listen="true">
				<ToastContainer />
				<ReactQueryProvider>
					<NextIntlClientProvider>
						<StoreProvider value={store}>
							<Layout>{children}</Layout>
						</StoreProvider>
					</NextIntlClientProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
