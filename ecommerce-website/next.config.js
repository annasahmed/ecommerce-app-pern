const createNextIntlPlugin = require("next-intl/plugin");
// import './app/i18n/request'

const withNextIntl = createNextIntlPlugin("./app/i18n/request.js");

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
