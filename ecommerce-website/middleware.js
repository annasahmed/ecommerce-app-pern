import createMiddleware from "next-intl/middleware";

export default createMiddleware({
	// A list of all locales that are supported
	locales: ["en", "ur", "fr"],

	// Used when no locale matches
	defaultLocale: "en",

	// When using the "as" prefix mode, the locale prefix
	// is omitted for the default locale
	localePrefix: "as-needed",
});

export const config = {
	// Match only internationalized pathnames
	matcher: ["/", "/(ur|fr|en)/:path*"],
};
