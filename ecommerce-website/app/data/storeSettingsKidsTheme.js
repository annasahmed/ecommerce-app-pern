import logo from "@/app/assets/themes/kidsTheme/logo.png";
import logoWhite from "@/app/assets/themes/kidsTheme/footer-logo.png";
import footerBg from "@/app/assets/themes/kidsTheme/footer-bg.png";
import heroBanner from "@/app/assets/themes/furnitureTheme/hero-banner.png";

// category images
import golfBat from "@/app/assets/themes/sportsTheme/categories/golf-bat.png";
import golfBall from "@/app/assets/themes/sportsTheme/categories/golf-ball.png";
import golfBag from "@/app/assets/themes/sportsTheme/categories/golf-bag.png";
import tshirt from "@/app/assets/themes/sportsTheme/categories/t-shirt.png";
import shoes from "@/app/assets/themes/sportsTheme/categories/shoes.png";
import gloves from "@/app/assets/themes/sportsTheme/categories/gloves.png";
import { KIDSTHEME_DATA } from "./KidsTheme/data";

export const storeSettingsKidsTheme = {
	themeName: "KidsTheme",
	name: "Babiesnbaba",
	currency: "Rs.",
	theme: {
		header: "#5DABEA",
		headerText: "#f5f5f5",
		footer: "#5DABEA",
		light: "#f5f5f5",
		dark: "#000000",
		cardsBg: "#F3F5F7",
		primary: "#5DABEA",
		secondary: "#E95CA7",
		// secondary: "#9333EA",
		// background: "#F9FAFB",
		// text: "#111827",
	},
	content: {
		header: {
			text: "Spend 500 or more and get free shipping for 12 months!",
			link: "/shop",
		},
		logo,
		heroSection: {
			image: heroBanner,
			heading: "Simply Unique Simply Better.",
			text: "3legant is a gift & decorations store based in HCMC, Vietnam. Est since 2019.",
			button: "Shop Now",
			link: "/shop",
		},
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
			background: footerBg,
			sections: [
				{
					title: "Contact",
					links: [
						{
							text: "Monday to Friday 8 a.m - 5 p.m",
						},
						{
							text: "+01 456 789",
						},
						{
							text: "+01 456 789",
						},
						{
							text: "contact@kidify.com",
							link: "mailto:contact@kidify.com",
						},
					],
				},
				{
					title: "Company",
					links: [
						{
							text: "about us",
							link: "/about-us",
						},
						{
							text: "our experts",
							link: "/our-experts",
						},
						{
							text: "services & price",
							link: "/services-and-price",
						},
						{
							text: "latest news",
							link: "/latest-news",
						},
						{
							text: "support center",
							link: "/support-center",
						},
					],
				},
				{
					title: "Customers",
					links: [
						{
							text: "contact us",
							link: "/contact-us",
						},
						{
							text: "payment & tax",
							link: "/payment-and-tax",
						},
						{
							text: "bonus point",
							link: "/bonus-point",
						},
						{
							text: "supply chain",
							link: "/supply-chain",
						},
						{
							text: "student discount",
							link: "/student-discount",
						},
					],
				},
				{
					title: "Support",
					links: [
						{
							text: "shipping info",
							link: "/shipping-info",
						},
						{
							text: "returns",
							link: "/returns",
						},
						{
							text: "refund",
							link: "/refund",
						},
						{
							text: "how to order",
							link: "/how-to-order",
						},
						{
							text: "how to track",
							link: "/how-to-track",
						},
					],
				},
			],
		},

		...KIDSTHEME_DATA,
	},
	socialLinks: {
		instagram: "https://www.instagram.com",
		facebook: "https://www.facebook.com",
		youtube: "https://www.youtube.com",
		email: "example@gmail.com",
		pinterest: "https://www.pinterest.com/",
	},
	details: {
		address: "43111 Hai Trieu street, District 1, HCMC Vietnam",
		contact: "84-756-3237",
	},
};

export const categories = [
	{
		title: "Golf Clubs",
		image: golfBat,
	},
	{
		title: "Golf Balls",
		image: golfBall,
	},
	{
		title: "Golf Bags",
		image: golfBag,
	},
	{
		title: "Clothing & Rainwear",
		image: tshirt,
	},
	{
		title: "Footwaer",
		image: shoes,
	},
	{
		title: "Accessories",
		image: gloves,
	},
];
