import { getMessages } from "next-intl/server";
import { Locale, hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({ children, params }) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	// Enable static rendering
	setRequestLocale(locale);

	return (
		<html lang={locale} dir={locale === "ur" ? "rtl" : "ltr"}>
			<body>
				<NextIntlClientProvider>
					<nav>
						<a href={`/${locale === "en" ? "" : locale}`}>Home</a>
						<a href={`/${locale === "en" ? "" : locale}/products/123`}>
							Product 123
						</a>
						{/* Language Switcher */}
						<div>
							<a href="/products/123">English</a>
							<a href="/ur/products/123">اردو</a>
						</div>
					</nav>
					<main className="border border-red-500">{children}</main>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}

export function generateStaticParams() {
	return [{ locale: "en" }, { locale: "ur" }];
}
