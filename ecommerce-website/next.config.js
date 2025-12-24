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
			{
				protocol: "http",
				hostname: "72.61.149.213",
				port: "4000",
				pathname: "/**",
				search: "",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "4000",
				pathname: "/**",
				search: "",
			},
		],
	},
};

module.exports = withNextIntl(nextConfig);
