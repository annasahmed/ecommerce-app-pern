const createNextIntlPlugin = require("next-intl/plugin");

// const withNextIntl = createNextIntlPlugin("./app/i18n/request.js");
const withNextIntl = createNextIntlPlugin("./src/app/i18n/request.js");
// const withNextIntl = require("next-intl/plugin")(
// 	"./src/i18n/request.js", // <- This path was missing
// );

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
				search: "",
			},
		],
	},
};

module.exports = withNextIntl(nextConfig);
