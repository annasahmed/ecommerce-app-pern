import heroSliderSlide from "@/app/assets/themes/kidsTheme/hero-slider-slide.jpg";
import babaCat from "@/app/assets/themes/kidsTheme/categories/baba.png";
import babyCat from "@/app/assets/themes/kidsTheme/categories/baby.png";
import bathCat from "@/app/assets/themes/kidsTheme/categories/bath.png";
import feedingCat from "@/app/assets/themes/kidsTheme/categories/feeding.png";
import softToysCat from "@/app/assets/themes/kidsTheme/categories/soft-toys.png";
import nurseryCat from "@/app/assets/themes/kidsTheme/categories/nursery.png";
import shoesCat from "@/app/assets/themes/kidsTheme/categories/shoes.png";
import socksCat from "@/app/assets/themes/kidsTheme/categories/socks.jpeg";
import bootiesCat from "@/app/assets/themes/kidsTheme/categories/booties.webp";
import sandalsCat from "@/app/assets/themes/kidsTheme/categories/sandals.png";
import p1 from "@/app/assets/themes/kidsTheme/products/p1.png";
import p2 from "@/app/assets/themes/kidsTheme/products/p2.png";
import p3 from "@/app/assets/themes/kidsTheme/products/p3.png";
import p4 from "@/app/assets/themes/kidsTheme/products/p4.png";
import p5 from "@/app/assets/themes/kidsTheme/products/p5.png";
import p6 from "@/app/assets/themes/kidsTheme/products/p6.png";
import p7 from "@/app/assets/themes/kidsTheme/products/p7.png";
import p8 from "@/app/assets/themes/kidsTheme/products/p8.png";
import p9 from "@/app/assets/themes/kidsTheme/products/p9.png";
import p10 from "@/app/assets/themes/kidsTheme/products/p10.png";
import p11 from "@/app/assets/themes/kidsTheme/products/p11.png";
import p12 from "@/app/assets/themes/kidsTheme/products/p12.png";
import p13 from "@/app/assets/themes/kidsTheme/products/p13.png";
import p14 from "@/app/assets/themes/kidsTheme/products/p14.png";
import p15 from "@/app/assets/themes/kidsTheme/products/p5.png";
import p16 from "@/app/assets/themes/kidsTheme/products/p16.png";

import returnFeatureIcon from "@/app/assets/themes/kidsTheme/return.png";
import securePaymentFeatureIcon from "@/app/assets/themes/kidsTheme/secure-payment.png";
import certifiedFeatureIcon from "@/app/assets/themes/kidsTheme/certified.png";
import shippingFeatureIcon from "@/app/assets/themes/kidsTheme/fast-shipping.png";
import trendingCategory from "@/app/assets/themes/kidsTheme/trending-category.png";
import bestSellerCategory from "@/app/assets/themes/kidsTheme/best-seller-category.png";
import comfortableClothesCategory from "@/app/assets/themes/kidsTheme/comfortable-clothes-category.png";

export const KIDSTHEME_DATA = {
	navCategories: [
		{
			to: "/",
			title: "Home",
		},
		{
			slug: "fashion",
			title: "Fashion",
			categories: [
				{
					title: "Baby Accessories",
					subCategories: [
						"Swaddles",
						"Blankets",
						"Wrapping Sheets",
						"Towels",
						"Bibs, Caps & Hats",
						"Mittens & Gloves",
						"Socks & Booties",
						"Gift Sets",
					],
				},
				{
					title: "Baby",
					subCategories: [
						"Bodysuits & Rompers",
						"Sleepwear",
						"Tops",
						"Bottoms",
						"Dresses",
						"Innerwear",
						"Outerwear",
						"Costumes",
						"Accessories",
					],
				},
				{
					title: "Footwear",
					subCategories: ["Socks", "Booties", "Casual Wear", "Sandals"],
				},
			],
		},
		{
			slug: "gear",
			title: "Gear",
			categories: [
				{
					title: "Shop By Category",
					subCategories: [
						"Strollers & Prams",
						"Walkers & Push Along",
						"Car Seats Carrycots & Carriers",
						"Bouncers Rockers & Swings",
						"Highchair & Booster Seats",
						"Playmats & Playgyms",
						"Tricycles & Bicycles",
						"Rideons & Scooters",
						"Travel Bags",
					],
				},
				{
					title: "Popular Brands",
					subCategories: [
						"Sunshine",
						"Ingenuity",
						"Junior",
						"Tinnies",
						"Mastela",
						"Infantes",
						"Little Sparks",
					],
				},
			],
		},
		{
			slug: "feeding",
			title: "feeding",
		},
		{
			slug: "bath-and-shower",
			title: "bath & shower",
		},
		{
			slug: "safety-toys",
			title: "safety toys",
		},
		{
			slug: "diapering",
			title: "diapering",
		},
		{
			slug: "nursery",
			title: "nursery",
		},
		{
			slug: "moms",
			title: "moms",
		},
		{
			slug: "sale",
			title: "sale",
		},
		// {
		// 	slug: "/new-arrival",
		// 	title: "new arrival",
		// },
	],

	heroSlider: [
		{
			img: heroSliderSlide,
		},
		{
			img: heroSliderSlide,
		},
		{
			img: heroSliderSlide,
		},
		{
			img: heroSliderSlide,
		},
	],

	features: [
		{
			icon: returnFeatureIcon,
			title: "30 DAY RETURNS",
			description: "No-nonsense return policy if you are not happy",
		},
		{
			icon: shippingFeatureIcon,
			title: "FAST SHIPING",
			description: "Your precious package is expedited and insured",
		},
		{
			icon: certifiedFeatureIcon,
			title: "GLOBAL CERTIFIED",
			description: "5 star reviews from reputable units around the world",
		},
		{
			icon: securePaymentFeatureIcon,
			title: "SECURE PAYMENT",
			description: "Pay with the smartest and most secure apps",
		},
	],

	categories: [
		{ title: "baba", icon: babaCat, slug: "baba" },
		{ title: "baby", icon: babyCat, slug: "baby" },
		{ title: "bath", icon: bathCat, slug: "bath" },
		{ title: "feeding", icon: feedingCat, slug: "feeding" },
		{ title: "shoes", icon: shoesCat, slug: "shoes" },
		{ title: "nursery", icon: nurseryCat, slug: "nursery" },
		{ title: "soft toys", icon: softToysCat, slug: "toys" },
	],

	parentCatgores: [
		{ title: "booties", icon: bootiesCat, slug: "booties" },
		{ title: "shoes", icon: shoesCat, slug: "shoes" },
		{ title: "socks", icon: socksCat, slug: "socks" },
		{ title: "sandals", icon: sandalsCat, slug: "sandals" },
		{ title: "shoes", icon: shoesCat, slug: "shoes" },
	],

	popularTabs: [
		{
			label: "Kidzo",
			products: [
				{
					id: 106,
					sku: "100078",
					title: "Baby adjustable swaddle doted blue | Kidzo",
					excerpt:
						"Soft, breathable, and adjustable blue swaddle by Kidzo—designed to keep your baby safe, cozy, and comfortably wrapped all night.",
					slug: "baby-adjustable-swaddle-blue-kidzo",
					base_price: 400,
					base_discount_percentage: 25,
					thumbnail:
						"/image/upload/v1766382009/baby-adjustable-swaddle-blue-kidzo_1_vf8ndr.jpg",
					images: [
						"/image/upload/v1766382009/baby-adjustable-swaddle-blue-kidzo_1_vf8ndr.jpg",
						"/image/upload/v1766382010/baby-adjustable-swaddle-blue-kidzo_2_owhmul.jpg",
						"/image/upload/v1766382008/baby-adjustable-swaddle-blue-kidzo_3_pd298y.jpg",
					],
				},
				{
					id: 107,
					title: "Baby adjustable swaddle doted white | Kidzo",
					slug: "baby-adjustable-swaddle-white-kidzo",
					base_price: 400,
					base_discount_percentage: 25,
					thumbnail:
						"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_1_uo8qmz.jpg",

					price: 400,
					discount: 25,
					sku: "100077",

					images: [
						"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_1_uo8qmz.jpg",
						"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_2_uvkzkq.jpg",
						"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_3_abjnfw.jpg",
						"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_4_y90i7c.jpg",
					],
				},
				{
					id: 108,
					title: "Baby adjustable swaddle doted pink | Kidzo",
					slug: "baby-adjustable-swaddle-pink-kidzo",
					base_price: 400,
					base_discount_percentage: 25,
					thumbnail:
						"/image/upload/v1766384414/baby-adjustable-swaddle-pink-kidzo_3_vak8x3.jpg",

					price: 400,
					discount: 25,
					sku: "100075",
					images: [
						"/image/upload/v1766384414/baby-adjustable-swaddle-pink-kidzo_3_vak8x3.jpg",
						"/image/upload/v1766384414/baby-adjustable-swaddle-pink-kidzo_2_vdmy9b.jpg",
						"/image/upload/v1766384414/baby-adjustable-swaddle-pink-kidzo_1_t79laq.jpg",
					],
				},
				{
					id: 109,
					title: "Baby adjustable swaddle bear white | Kidzo",
					slug: "baby-adjustable-swaddle-bear-white-kidzo",
					base_price: 400,
					base_discount_percentage: 25,
					thumbnail:
						"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_1_qbopwg.jpg",

					price: 400,
					discount: 25,
					sku: "100078",
					images: [
						"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_1_qbopwg.jpg",
						"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_2_bg8g2c.jpg",
						"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_3_qzmzrb.jpg",
						"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_4_cfclk3.jpg",
						"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_5_wse9cv.jpg",
						"/image/upload/v1766384743/Baby-adjustable-swaddle-bear-white-Kidzo_6_p0rcp9.jpg",
						"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_7_jg3vvj.jpg",
					],
				},
				{
					id: 110,
					title: "Baby adjustable swaddle box baby pink | Kidzo",
					slug: "baby-adjustable-swaddle-box-baby-pink-kidzo",
					sku: "100083",
					base_price: 400,
					base_discount_percentage: 25,
					thumbnail:
						"/image/upload/v1766384962/baby-adjustable-swaddle-box-baby-pink-kidzo_1_xjoztl.jpg",

					price: 400,
					discount: 25,
					images: [
						"/image/upload/v1766384962/baby-adjustable-swaddle-box-baby-pink-kidzo_1_xjoztl.jpg",
						"/image/upload/v1766384962/baby-adjustable-swaddle-box-baby-pink-kidzo_2_gm5jjl.jpg",
					],
				},
				{
					id: 1,
					image: p1,
					title: "Little Stars Dress",
					base_price: 16.0,
				},
				{
					id: 2,
					image: p2,
					title: "Baby Bear Hoodie",
					base_price: 16.0,
				},
				{
					id: 3,
					image: p3,
					title: "Junior Jogger Pants",
					base_price: 16.0,
				},
				{
					id: 4,
					image: p4,
					title: "Mini Denim Jacket",
					base_price: 16.0,
				},
				{
					id: 5,
					image: p5,
					title: "Petite Plaid Skirt",
					base_price: 16.0,
				},
				// // {
				// // 	id: 6,
				// // 	image: p6,
				// // 	title: "Little Ladybug Overalls",
				// // 	base_price: 16.0,
				// // },
				// {
				// 	id: 7,
				// 	image: p7,
				// 	title: "Junior Jersey Dress",
				// 	base_price: 16.0,
				// },
			],
		},
		{
			label: "Boys' Clothing",
			products: [
				{
					id: 1,
					image: p1,
					title: "Little Stars Dress",
					base_price: 16.0,
				},
				{
					id: 2,
					image: p2,
					title: "Baby Bear Hoodie",
					base_price: 16.0,
				},
				{
					id: 3,
					image: p3,
					title: "Junior Jogger Pants",
					base_price: 16.0,
				},
				{
					id: 4,
					image: p4,
					title: "Mini Denim Jacket",
					base_price: 16.0,
				},
				{
					id: 5,
					image: p5,
					title: "Petite Plaid Skirt",
					base_price: 16.0,
				},
				{
					id: 6,
					image: p6,
					title: "Little Ladybug Overalls",
					base_price: 16.0,
				},
				{
					id: 7,
					image: p7,
					title: "Junior Jersey Dress",
					base_price: 16.0,
				},
				{
					id: 8,
					image: p8,
					title: "Toddler Tutu Dress",
					base_price: 16.0,
				},
				{
					id: 4,
					image: p4,
					title: "Mini Denim Jacket",
					base_price: 16.0,
				},
				{
					id: 5,
					image: p5,
					title: "Petite Plaid Skirt",
					base_price: 16.0,
				},
			],
		},
		{
			label: "Accessories",
			products: [
				{
					id: 1,
					image: p1,
					title: "Little Stars Dress",
					base_price: 16.0,
				},
				{
					id: 2,
					image: p2,
					title: "Baby Bear Hoodie",
					base_price: 16.0,
				},
				{
					id: 3,
					image: p3,
					title: "Junior Jogger Pants",
					base_price: 16.0,
				},
				{
					id: 4,
					image: p4,
					title: "Mini Denim Jacket",
					base_price: 16.0,
				},
				{
					id: 5,
					image: p5,
					title: "Petite Plaid Skirt",
					base_price: 16.0,
				},
				{
					id: 6,
					image: p6,
					title: "Little Ladybug Overalls",
					base_price: 16.0,
				},
				{
					id: 7,
					image: p7,
					title: "Junior Jersey Dress",
					base_price: 16.0,
				},
				{
					id: 8,
					image: p8,
					title: "Toddler Tutu Dress",
					base_price: 16.0,
				},
				{
					id: 3,
					image: p3,
					title: "Junior Jogger Pants",
					base_price: 16.0,
				},
				{
					id: 4,
					image: p4,
					title: "Mini Denim Jacket",
					base_price: 16.0,
				},
			],
		},
	],
	trendingCategories: [
		{
			title: "Latest Trending",
			description: "Holiday Deals On Fashion Clothes",
			query: "trending",
			image: trendingCategory,
		},
		{
			title: "Best Seller",
			description: "Spring & Summer Accessories Trend",
			query: "best-seller",
			image: bestSellerCategory,
		},
		{
			title: "Comfortable Clothes",
			description: "Practical Clothes For Your Kids",
			query: "clothes",
			image: comfortableClothesCategory,
		},
	],
	bestSellingProducts: [
		{
			id: 106,
			sku: "100078",
			title: "Baby adjustable swaddle doted blue | Kidzo",
			excerpt:
				"Soft, breathable, and adjustable blue swaddle by Kidzo—designed to keep your baby safe, cozy, and comfortably wrapped all night.",
			slug: "baby-adjustable-swaddle-blue-kidzo",
			base_price: 400,
			base_discount_percentage: 25,
			thumbnail:
				"/image/upload/v1766382009/baby-adjustable-swaddle-blue-kidzo_1_vf8ndr.jpg",
			images: [
				"/image/upload/v1766382009/baby-adjustable-swaddle-blue-kidzo_1_vf8ndr.jpg",
				"/image/upload/v1766382010/baby-adjustable-swaddle-blue-kidzo_2_owhmul.jpg",
				"/image/upload/v1766382008/baby-adjustable-swaddle-blue-kidzo_3_pd298y.jpg",
			],
		},
		{
			id: 107,
			title: "Baby adjustable swaddle doted white | Kidzo",
			slug: "baby-adjustable-swaddle-white-kidzo",
			base_price: 400,
			base_discount_percentage: 25,
			thumbnail:
				"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_1_uo8qmz.jpg",

			price: 400,
			discount: 25,
			sku: "100077",

			images: [
				"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_1_uo8qmz.jpg",
				"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_2_uvkzkq.jpg",
				"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_3_abjnfw.jpg",
				"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_4_y90i7c.jpg",
			],
		},
		{
			id: 108,
			title: "Baby adjustable swaddle doted pink | Kidzo",
			slug: "baby-adjustable-swaddle-pink-kidzo",
			base_price: 400,
			base_discount_percentage: 25,
			thumbnail:
				"/image/upload/v1766384414/baby-adjustable-swaddle-pink-kidzo_3_vak8x3.jpg",

			price: 400,
			discount: 25,
			sku: "100075",
			images: [
				"/image/upload/v1766384414/baby-adjustable-swaddle-pink-kidzo_3_vak8x3.jpg",
				"/image/upload/v1766384414/baby-adjustable-swaddle-pink-kidzo_2_vdmy9b.jpg",
				"/image/upload/v1766384414/baby-adjustable-swaddle-pink-kidzo_1_t79laq.jpg",
			],
		},
		{
			id: 109,
			title: "Baby adjustable swaddle bear white | Kidzo",
			slug: "baby-adjustable-swaddle-bear-white-kidzo",
			base_price: 400,
			base_discount_percentage: 25,
			thumbnail:
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_1_qbopwg.jpg",

			price: 400,
			discount: 25,
			sku: "100078",
			images: [
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_1_qbopwg.jpg",
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_2_bg8g2c.jpg",
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_3_qzmzrb.jpg",
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_4_cfclk3.jpg",
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_5_wse9cv.jpg",
				"/image/upload/v1766384743/Baby-adjustable-swaddle-bear-white-Kidzo_6_p0rcp9.jpg",
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_7_jg3vvj.jpg",
			],
		},
		{
			id: 110,
			title: "Baby adjustable swaddle box baby pink | Kidzo",
			slug: "baby-adjustable-swaddle-box-baby-pink-kidzo",
			sku: "100083",
			base_price: 400,
			base_discount_percentage: 25,
			thumbnail:
				"/image/upload/v1766384962/baby-adjustable-swaddle-box-baby-pink-kidzo_1_xjoztl.jpg",

			price: 400,
			discount: 25,
			images: [
				"/image/upload/v1766384962/baby-adjustable-swaddle-box-baby-pink-kidzo_1_xjoztl.jpg",
				"/image/upload/v1766384962/baby-adjustable-swaddle-box-baby-pink-kidzo_2_gm5jjl.jpg",
			],
		},
		{
			id: 1,
			image: p9,
			title: "Little Stars Dress",
			base_price: 16.0,
		},
		{
			id: 2,
			image: p10,
			title: "Baby Bear Hoodie",
			base_price: 16.0,
		},
		{
			id: 3,
			image: p11,
			title: "Junior Jogger Pants",
			base_price: 16.0,
		},
		{
			id: 4,
			image: p12,
			title: "Mini Denim Jacket",
			base_price: 16.0,
		},
		{
			id: 5,
			image: p13,
			title: "Petite Plaid Skirt",
			base_price: 16.0,
		},
		{
			id: 6,
			image: p14,
			title: "Little Ladybug Overalls",
			base_price: 16.0,
		},
		{
			id: 7,
			image: p15,
			title: "Junior Jersey Dress",
			base_price: 16.0,
		},
		{
			id: 8,
			image: p16,
			title: "Toddler Tutu Dress",
			base_price: 16.0,
		},
	],
	saleProducts: [
		{
			id: 5,
			image: p13,
			title: "Petite Plaid Skirt",
			base_price: 16.0,
		},
		{
			id: 6,
			image: p14,
			title: "Little Ladybug Overalls",
			base_price: 16.0,
		},
		{
			id: 7,
			image: p15,
			title: "Junior Jersey Dress",
			base_price: 16.0,
		},
		{
			id: 8,
			image: p16,
			title: "Toddler Tutu Dress",
			base_price: 16.0,
		},
		{
			id: 1,
			image: p9,
			title: "Little Stars Dress",
			base_price: 16.0,
		},
		{
			id: 2,
			image: p10,
			title: "Baby Bear Hoodie",
			base_price: 16.0,
		},
		{
			id: 3,
			image: p11,
			title: "Junior Jogger Pants",
			base_price: 16.0,
		},
		{
			id: 4,
			image: p12,
			title: "Mini Denim Jacket",
			base_price: 16.0,
		},
	],
	allProducts: [
		{
			id: 1,
			image: p1,
			title: "Little Stars Dress",
			base_price: 16.0,
		},
		{
			id: 2,
			image: p2,
			title: "Baby Bear Hoodie",
			base_price: 16.0,
		},
		{
			id: 3,
			image: p3,
			title: "Junior Jogger Pants",
			base_price: 16.0,
		},
		{
			id: 4,
			image: p4,
			title: "Mini Denim Jacket",
			base_price: 16.0,
		},
		{
			id: 5,
			image: p5,
			title: "Petite Plaid Skirt",
			base_price: 16.0,
		},
		{
			id: 6,
			image: p6,
			title: "Little Ladybug Overalls",
			base_price: 16.0,
		},
		{
			id: 7,
			image: p7,
			title: "Junior Jersey Dress",
			base_price: 16.0,
		},
		{
			id: 8,
			image: p8,
			title: "Toddler Tutu Dress",
			base_price: 16.0,
		},
		{
			id: 9,
			image: p13,
			title: "Petite Plaid Skirt",
			base_price: 16.0,
		},
		{
			id: 10,
			image: p14,
			title: "Little Ladybug Overalls",
			base_price: 16.0,
		},
		{
			id: 11,
			image: p15,
			title: "Junior Jersey Dress",
			base_price: 16.0,
		},
		{
			id: 12,
			image: p16,
			title: "Toddler Tutu Dress",
			base_price: 16.0,
		},
		{
			id: 13,
			image: p9,
			title: "Little Stars Dress",
			base_price: 16.0,
		},
		{
			id: 14,
			image: p10,
			title: "Baby Bear Hoodie",
			base_price: 16.0,
		},
		{
			id: 15,
			image: p11,
			title: "Junior Jogger Pants",
			base_price: 16.0,
		},
	],
	filters: {
		categories: [
			{
				id: 1,
				title: "girls",
			},
			{
				id: 2,
				title: "boys clothing",
			},
			{
				id: 3,
				title: "baby care",
			},
			{
				id: 4,
				title: "safety equipment",
			},
			{
				id: 5,
				title: "activity and gear",
			},
			{
				id: 6,
				title: "baby shoes",
			},
			{
				id: 7,
				title: "children's shoes",
			},
			{
				id: 8,
				title: "family outlet",
			},
		],
		prize: [
			{ id: 1, title: "Rs. 100 - Rs. 200", min: 100, max: 200 },
			{ id: 2, title: "Rs. 200 - Rs. 400", min: 200, max: 400 },
			{ id: 3, title: "Rs. 400 - Rs. 600", min: 400, max: 600 },
			{ id: 4, title: "Rs. 600 - Rs. 800", min: 600, max: 800 },
			{ id: 5, title: "over Rs. 1000", min: 1000, max: 0 },
		],
		size: [
			{ id: 1, title: "XS" },
			{ id: 2, title: "S" },
			{ id: 3, title: "M" },
			{ id: 4, title: "L" },
			{ id: 5, title: "XL" },
		],
	},
	productDetails: [
		{
			id: 106,
			title: "Baby adjustable swaddle doted blue | Kidzo",
			slug: "baby-adjustable-swaddle-blue-kidzo",
			description:
				"The Kidzo Baby Adjustable Swaddle in Blue is made with ultra-soft, breathable cotton to provide your newborn with maximum comfort and security. Its adjustable Velcro wings ensure a perfect fit, helping prevent startle reflex and promoting longer, more peaceful sleep. Ideal for newborns and infants, this swaddle keeps your baby snug, warm, and safely wrapped throughout the night.",
			price: 400,
			discount: 25,
			rating: 4.7,
			reviewsCount: 86,
			sku: "100078",
			categories: ["Baby Care", "Baby Accessories", "Swaddles", "Kidzo"],
			tags: ["Baby Care", "Baby Accessories", "Swaddles", "Kidzo"],
			// tags: ["modern", "black", "metal", "round table"],
			images: [
				"/image/upload/v1766382009/baby-adjustable-swaddle-blue-kidzo_1_vf8ndr.jpg",
				"/image/upload/v1766382010/baby-adjustable-swaddle-blue-kidzo_2_owhmul.jpg",
				"/image/upload/v1766382008/baby-adjustable-swaddle-blue-kidzo_3_pd298y.jpg",
			],
			// additionalInfo: {
			// 	material: "Metal Frame + MDF Top",
			// 	dimensions: "45 x 45 x 50 cm",
			// 	weight: "5.2 kg",
			// 	color: "Black",
			// 	madeIn: "Turkey",
			// },
			reviews: [
				{
					user: "Sarah Ahmed",
					rating: 5,
					comment: "Perfect size for my living room! Sturdy and stylish.",
				},
				{
					user: "Ali Raza",
					rating: 4,
					comment: "Good value for money. Easy to assemble.",
				},
			],
		},
		{
			id: 108,
			title: "Baby adjustable swaddle doted pink | Kidzo",
			slug: "baby-adjustable-swaddle-pink-kidzo",
			description:
				"The Kidzo Baby Adjustable Swaddle in Pink is made from ultra-soft, breathable cotton to provide maximum comfort for newborns. Its adjustable Velcro wings offer a snug and secure fit, helping reduce the startle reflex and allowing babies to enjoy longer, peaceful sleep. Ideal for everyday use, this swaddle keeps your little one warm, cozy, and safely wrapped.",
			price: 400,
			discount: 25,
			rating: 4.7,
			reviewsCount: 86,
			sku: "100075",
			categories: ["Baby Care", "Baby Accessories", "Swaddles", "Kidzo"],
			tags: ["Baby Care", "Baby Accessories", "Swaddles", "Kidzo"],
			// tags: ["modern", "black", "metal", "round table"],
			images: [
				"/image/upload/v1766384414/baby-adjustable-swaddle-pink-kidzo_3_vak8x3.jpg",
				"/image/upload/v1766384414/baby-adjustable-swaddle-pink-kidzo_2_vdmy9b.jpg",
				"/image/upload/v1766384414/baby-adjustable-swaddle-pink-kidzo_1_t79laq.jpg",
			],
			// additionalInfo: {
			// 	material: "Metal Frame + MDF Top",
			// 	dimensions: "45 x 45 x 50 cm",
			// 	weight: "5.2 kg",
			// 	color: "Black",
			// 	madeIn: "Turkey",
			// },
			reviews: [
				{
					user: "Sarah Ahmed",
					rating: 5,
					comment: "Perfect size for my living room! Sturdy and stylish.",
				},
				{
					user: "Ali Raza",
					rating: 4,
					comment: "Good value for money. Easy to assemble.",
				},
			],
		},
		{
			id: 107,
			title: "Baby adjustable swaddle doted white | Kidzo",
			slug: "baby-adjustable-swaddle-white-kidzo",
			description:
				"The Kidzo Baby Adjustable Swaddle in White is crafted from gentle, breathable cotton to ensure maximum comfort for newborns. Its adjustable Velcro wings provide a secure and customized fit, reducing the startle reflex and helping babies sleep longer and more peacefully. Perfect for daily use, this swaddle keeps your baby snug, warm, and safely wrapped throughout the night.",
			price: 400,
			discount: 25,
			rating: 4.7,
			reviewsCount: 86,
			sku: "100077",
			categories: ["Baby Care", "Baby Accessories", "Swaddles", "Kidzo"],
			tags: ["Baby Care", "Baby Accessories", "Swaddles", "Kidzo"],
			// tags: ["modern", "black", "metal", "round table"],
			images: [
				"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_1_uo8qmz.jpg",
				"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_2_uvkzkq.jpg",
				"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_3_abjnfw.jpg",
				"/image/upload/v1766383549/baby-adjustable-swaddle-white-kidzo_4_y90i7c.jpg",
			],
			// additionalInfo: {
			// 	material: "Metal Frame + MDF Top",
			// 	dimensions: "45 x 45 x 50 cm",
			// 	weight: "5.2 kg",
			// 	color: "Black",
			// 	madeIn: "Turkey",
			// },
			reviews: [
				{
					user: "Sarah Ahmed",
					rating: 5,
					comment: "Perfect size for my living room! Sturdy and stylish.",
				},
				{
					user: "Ali Raza",
					rating: 4,
					comment: "Good value for money. Easy to assemble.",
				},
			],
		},
		{
			id: 109,
			title: "Baby adjustable swaddle bear white | Kidzo",
			slug: "baby-adjustable-swaddle-bear-white-kidzo",
			description:
				"The Kidzo Baby Adjustable Swaddle in Bear White features a soft, breathable cotton fabric with an adorable bear print, offering comfort and style together. Its adjustable Velcro wings allow a secure and customized fit, helping reduce the startle reflex and promoting longer, peaceful sleep. Perfect for newborns, this swaddle keeps your baby warm, snug, and safely wrapped throughout the night.",
			price: 400,
			discount: 25,
			rating: 4.7,
			reviewsCount: 86,
			sku: "100078",
			categories: ["Baby Care", "Baby Accessories", "Swaddles", "Kidzo"],
			tags: ["Baby Care", "Baby Accessories", "Swaddles", "Kidzo"],
			// tags: ["modern", "black", "metal", "round table"],
			images: [
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_1_qbopwg.jpg",
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_2_bg8g2c.jpg",
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_3_qzmzrb.jpg",
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_4_cfclk3.jpg",
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_5_wse9cv.jpg",
				"/image/upload/v1766384743/Baby-adjustable-swaddle-bear-white-Kidzo_6_p0rcp9.jpg",
				"/image/upload/v1766384742/Baby-adjustable-swaddle-bear-white-Kidzo_7_jg3vvj.jpg",
			],
			// additionalInfo: {
			// 	material: "Metal Frame + MDF Top",
			// 	dimensions: "45 x 45 x 50 cm",
			// 	weight: "5.2 kg",
			// 	color: "Black",
			// 	madeIn: "Turkey",
			// },
			reviews: [
				{
					user: "Sarah Ahmed",
					rating: 5,
					comment: "Perfect size for my living room! Sturdy and stylish.",
				},
				{
					user: "Ali Raza",
					rating: 4,
					comment: "Good value for money. Easy to assemble.",
				},
			],
		},
		{
			id: 110,
			title: "Baby adjustable swaddle box baby pink | Kidzo",
			slug: "baby-adjustable-swaddle-box-baby-pink-kidzo",
			description:
				"The Kidzo Baby Adjustable Swaddle in Box Baby Pink is made from soft, breathable cotton and features a charming box pattern for a sweet and stylish look. Its adjustable Velcro wings provide a secure and customized fit that helps reduce the startle reflex, allowing babies to enjoy longer, peaceful sleep. Ideal for everyday use, this swaddle keeps your little one warm, snug, and safely wrapped throughout the night.",
			price: 400,
			discount: 25,
			rating: 4.7,
			reviewsCount: 86,
			sku: "100083",
			categories: ["Baby Care", "Baby Accessories", "Swaddles", "Kidzo"],
			tags: ["Baby Care", "Baby Accessories", "Swaddles", "Kidzo"],
			// tags: ["modern", "black", "metal", "round table"],
			images: [
				"/image/upload/v1766384962/baby-adjustable-swaddle-box-baby-pink-kidzo_1_xjoztl.jpg",
				"/image/upload/v1766384962/baby-adjustable-swaddle-box-baby-pink-kidzo_2_gm5jjl.jpg",
			],
			// additionalInfo: {
			// 	material: "Metal Frame + MDF Top",
			// 	dimensions: "45 x 45 x 50 cm",
			// 	weight: "5.2 kg",
			// 	color: "Black",
			// 	madeIn: "Turkey",
			// },
			reviews: [
				{
					user: "Sarah Ahmed",
					rating: 5,
					comment: "Perfect size for my living room! Sturdy and stylish.",
				},
				{
					user: "Ali Raza",
					rating: 4,
					comment: "Good value for money. Easy to assemble.",
				},
			],
		},
	],
	cartData: {
		items: [
			{
				id: 6,
				sku: "PRD1",
				title: "Test Product 1",
				excerpt: "Test product excerpt",
				description: "adasdas",
				slug: "product-1",
				meta_title: "sample product 3 meta title",
				meta_description: "test product meta description",
				base_price: 150,
				base_discount_percentage: null,
				thumbnail: "ecommerce/uploads/tshirt_1755265091408.jpg",

				// id: 1,
				// name: "Little Stars Dress",
				// price: 120,
				// discount: 50,
				// quantity: 1,
				// image: p1,
			},
			{
				id: 1,
				name: "Little Stars Dress",
				price: 120,
				discount: 50,
				quantity: 1,
				image: p1,
			},
			{
				id: 2,
				name: "Baby Bear Hoodie",
				price: 80,
				discount: 0,
				quantity: 2,
				image: p2,
			},
		],
		shipping: 10,
	},
};
