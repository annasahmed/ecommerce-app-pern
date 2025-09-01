import logo from "@/app/assets/themes/sportsTheme/logo.png";
import logoWhite from "@/app/assets/themes/sportsTheme/logo-white.png";
import heroBanner from "@/app/assets/themes/sportsTheme/hero-banner.png";

export const storeSettings = {
	name: "3legant",
	theme: {
		header: "#38CB89",
		footer: "#000000",
		light: "#FEFEFE",
		secondary: "#9333EA",
		background: "#F9FAFB",
		text: "#111827",
	},
	content: {
		header: {
			text: "30% off storewide — Limited time! Shop Now",
			link: "/shop",
		},
		logo,
		heroBanner,
		nav: [
			{
				link: "/",
				text: "Home",
			},
			{
				link: "/shop",
				text: "Shop",
			},
			{
				link: "/prodcuts",
				text: "Products",
			},
			{
				link: "/contact",
				text: "Contact Us",
			},
		],
		footer: {
			logo: logoWhite,
			text: "More than just a game. It's a lifestyle.",
			sections: [
				{
					title: "Page",
					links: [
						{
							link: "/",
							text: "home",
						},
						{
							link: "/shop",
							text: "shop",
						},
						{
							link: "/product",
							text: "product",
						},
						{
							link: "/articles",
							text: "articles",
						},
						{
							link: "/contact",
							text: "contact us",
						},
					],
				},
				{
					title: "info",
					links: [
						{
							link: "/shipping-policy",
							text: "shipping policy",
						},
						{
							link: "/return-and-refund",
							text: "return & refund",
						},
						{
							link: "/support",
							text: "support",
						},
						{
							link: "/faqs",
							text: "faqs",
						},
					],
				},
			],
		},
	},
	socialLinks: {
		instagram: "www.instagram.com",
		facebook: "www.facebook.com",
		youtube: "www.youtube.com",
		email: "example@gmail.com",
	},
	details: {
		address: "43111 Hai Trieu street, District 1, HCMC Vietnam",
		contact: "84-756-3237",
	},
};
