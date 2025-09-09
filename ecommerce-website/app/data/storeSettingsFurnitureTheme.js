import logo from "@/app/assets/themes/furnitureTheme/logo.png";
import logoWhite from "@/app/assets/themes/furnitureTheme/logo-white.png";
import heroBanner from "@/app/assets/themes/furnitureTheme/hero-banner.png";

// category images
import golfBat from "@/app/assets/themes/sportsTheme/categories/golf-bat.png";
import golfBall from "@/app/assets/themes/sportsTheme/categories/golf-ball.png";
import golfBag from "@/app/assets/themes/sportsTheme/categories/golf-bag.png";
import tshirt from "@/app/assets/themes/sportsTheme/categories/t-shirt.png";
import shoes from "@/app/assets/themes/sportsTheme/categories/shoes.png";
import gloves from "@/app/assets/themes/sportsTheme/categories/gloves.png";

export const storeSettingsFurnitureTheme = {
	themeName: "FurnitureTheme",
	name: "3legant",
	theme: {
		header: "#F3F5F7",
		footer: "#000000",
		light: "#ffffff",
		cardsBg: "#F3F5F7",
		// secondary: "#9333EA",
		// background: "#F9FAFB",
		// text: "#111827",
	},
	content: {
		header: {
			text: "30% off storewide — Limited time! Shop Now",
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
