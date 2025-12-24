import livingRoom from "@/app/assets/themes/furnitureTheme/sofa.png";
import bedRoom from "@/app/assets/themes/furnitureTheme/drawers.png";
import kitchen from "@/app/assets/themes/furnitureTheme/blender.png";

export const parentCategories = {
	total: 3,
	records: [
		{
			id: 5,
			title: "Living Room",
			description: null,
			slug: "living-room",
			icon: null,
			created_at: "2025-08-12T15:50:55.964Z",
			// medium can be null
			medium: {
				id: 1,
				url: "/image/upload/v1757454591/sofa_boh7yn.png",
				title: "sofa.png",
				size: 1698,
				user_id: 1,
				created_at: "2025-08-12T16:02:13.728Z",
				updated_at: "2025-08-12T16:02:13.728Z",
			},
			categories: [
				{
					id: 1,
					slug: "category2",
					title: "Category2",
					description: "Category1 Description",
				},
				{
					id: 2,
					slug: "aeawm",
					title: "new category",
					description: "sdfkemdeke",
				},
			],
		},
		{
			id: 6,
			title: "Bedroom",
			description: null,
			slug: "bedroom",
			icon: null,
			created_at: "2025-08-12T15:50:55.964Z",
			// medium can be null
			medium: {
				id: 2,
				url: "/image/upload/v1757454602/drawers_apq8xt.png",
				title: "drawer.png",
				size: 1698,
				user_id: 1,
				created_at: "2025-08-12T16:02:13.728Z",
				updated_at: "2025-08-12T16:02:13.728Z",
			},
			categories: [
				{
					id: 1,
					slug: "category2",
					title: "Category2",
					description: "Category1 Description",
				},
				{
					id: 2,
					slug: "aeawm",
					title: "new category",
					description: "sdfkemdeke",
				},
			],
		},
		{
			id: 5,
			title: "Kitchen",
			description: null,
			slug: "kitchen",
			icon: null,
			created_at: "2025-08-12T15:50:55.964Z",
			// medium can be null
			medium: {
				id: 1,
				url: "/image/upload/v1757454603/blender_rx13af.png",
				title: "blender.png",
				size: 1698,
				user_id: 1,
				created_at: "2025-08-12T16:02:13.728Z",
				updated_at: "2025-08-12T16:02:13.728Z",
			},
			categories: [
				{
					id: 1,
					slug: "category2",
					title: "Category2",
					description: "Category1 Description",
				},
				{
					id: 2,
					slug: "aeawm",
					title: "new category",
					description: "sdfkemdeke",
				},
			],
		},
	],
	limit: 100,
	page: 1,
};
export const latestProducts = {
	total: 10,
	records: [
		{
			id: 3,
			sku: "SOFA001",
			slug: "loveseat-sofa",
			thumbnail: 3,
			is_featured: true,
			meta_title: "Loveseat Sofa",
			meta_description: "Comfortable modern loveseat sofa",
			created_at: "2025-08-20T10:15:00.000Z",
			categories: [
				{
					title: "Furniture",
					description: "Living room and home furniture",
					id: 3,
					slug: "furniture",
				},
			],
			usps: [
				{
					title: "Durable Fabric",
					description: "Made with premium quality fabric",
					id: 2,
					slug: "durable-fabric",
				},
			],
			vendors: [
				{
					name: "Sofa World",
					address: "Lahore, Pakistan",
					country: "Pakistan",
					id: 2,
				},
			],
			product_variants: [
				{
					id: 16,
					sku: "SOFAGRY",
					attributes: {
						color: "Grey",
						size: "2-Seater",
					},
					medium: {
						url: "/image/upload/v1757464609/sofa_nacpiz.png",
						title: "sofa.jpg",
						size: 45230,
					},
					branches: [
						{
							name: "Main Showroom",
							address: "Lahore",
							country: "Pakistan",
							id: 2,
							code: "branchcode2",
							phone: "03212345678",
							email: "sofa.showroom@gmail.com",
							latitude: 10121.12121,
							longitude: 20221.12121,
							is_main_branch: true,
							pvb: {
								cost_price: 25000,
								stock: 50,
								low_stock: 5,
								reorder_quantity: 10,
								sale_price: 28000,
								discount_percentage: 10,
							},
						},
					],
				},
			],
			images: [],
			thumbnailImage: {
				url: "/image/upload/v1757464609/sofa_nacpiz.png",
				title: "sofa.jpg",
				size: 45230,
			},
			product_translations: [
				{
					title: "Modern Loveseat Sofa",
					excerpt: "A stylish and comfortable loveseat sofa for modern homes.",
					description:
						"Perfect for compact living spaces with durable cushions and elegant design.",
				},
			],
		},
		{
			id: 4,
			sku: "LAMP001",
			slug: "table-lamp",
			thumbnail: 4,
			is_featured: false,
			meta_title: "Table Lamp",
			meta_description: "Stylish modern table lamp",
			created_at: "2025-08-21T12:30:00.000Z",
			categories: [
				{
					title: "Lighting",
					description: "Indoor lighting collection",
					id: 4,
					slug: "lighting",
				},
			],
			usps: [
				{
					title: "Energy Efficient",
					description: "Consumes less power with LED bulb support",
					id: 3,
					slug: "energy-efficient",
				},
			],
			vendors: [
				{
					name: "Bright Lights",
					address: "Karachi, Pakistan",
					country: "Pakistan",
					id: 3,
				},
			],
			product_variants: [
				{
					id: 17,
					sku: "LAMPNAT",
					attributes: {
						color: "White",
						size: "Standard",
					},
					medium: {
						url: "image//image/upload/v1757464608/lamp-light_fjxkj2.png",
						title: "tablelamp.jpg",
						size: 18200,
					},
					branches: [
						{
							name: "Lighting Hub",
							address: "Karachi",
							country: "Pakistan",
							id: 3,
							code: "branchcode3",
							phone: "03312349876",
							email: "info@brightlights.com",
							latitude: 14141.12121,
							longitude: 14141.12121,
							is_main_branch: true,
							pvb: {
								cost_price: 2000,
								stock: 100,
								low_stock: 10,
								reorder_quantity: 50,
								sale_price: 2500,
								discount_percentage: null,
							},
						},
					],
				},
			],
			images: [],
			thumbnailImage: {
				url: "/image/upload/v1757464608/lamp-light_fjxkj2.png",
				title: "tablelamp.jpg",
				size: 18200,
			},
			product_translations: [
				{
					title: "Classic Table Lamp",
					excerpt: "Perfect for study and bedroom lighting.",
					description: "Compact design with long-lasting performance.",
				},
			],
		},
		{
			id: 5,
			sku: "LAMP002",
			slug: "beige-table-lamp",
			thumbnail: 5,
			is_featured: false,
			meta_title: "Beige Table Lamp",
			meta_description: "Elegant beige table lamp",
			created_at: "2025-08-22T11:00:00.000Z",
			categories: [
				{
					title: "Lighting",
					description: "Indoor lighting collection",
					id: 4,
					slug: "lighting",
				},
			],
			usps: [
				{
					title: "Modern Style",
					description: "Adds elegance to your room",
					id: 4,
					slug: "modern-style",
				},
			],
			vendors: [
				{
					name: "Home Decor Lights",
					address: "Islamabad, Pakistan",
					country: "Pakistan",
					id: 4,
				},
			],
			product_variants: [
				{
					id: 18,
					sku: "LAMBEIGE",
					attributes: {
						color: "Beige",
						size: "Medium",
					},
					medium: {
						url: "/image/upload/v1757464607/lamp_a6577b.png",
						title: "beigelamp.jpg",
						size: 19000,
					},
					branches: [
						{
							name: "Decor Hub",
							address: "Islamabad",
							country: "Pakistan",
							id: 4,
							code: "branchcode4",
							phone: "03412349876",
							email: "support@decorhub.com",
							latitude: 15151.12121,
							longitude: 15151.12121,
							is_main_branch: true,
							pvb: {
								cost_price: 2200,
								stock: 80,
								low_stock: 8,
								reorder_quantity: 30,
								sale_price: 2700,
								discount_percentage: 5,
							},
						},
					],
				},
			],
			images: [],
			thumbnailImage: {
				url: "/image/upload/v1757464607/lamp_a6577b.png",
				title: "beigelamp.jpg",
				size: 19000,
			},
			product_translations: [
				{
					title: "Beige Table Lamp",
					excerpt: "Elegant beige lamp for modern interiors.",
					description: "Soft lighting with chic beige design.",
				},
			],
		},
		{
			id: 6,
			sku: "BASK001",
			slug: "bamboo-basket",
			thumbnail: 6,
			is_featured: false,
			meta_title: "Bamboo Basket",
			meta_description: "Eco-friendly bamboo storage basket",
			created_at: "2025-08-23T09:45:00.000Z",
			categories: [
				{
					title: "Home Decor",
					description: "Handmade and natural home decor",
					id: 5,
					slug: "home-decor",
				},
			],
			usps: [
				{
					title: "Eco-Friendly",
					description: "Made from 100% natural bamboo",
					id: 5,
					slug: "eco-friendly",
				},
			],
			vendors: [
				{
					name: "Nature Crafts",
					address: "Karachi, Pakistan",
					country: "Pakistan",
					id: 5,
				},
			],
			product_variants: [
				{
					id: 19,
					sku: "BASKM",
					attributes: {
						color: "Natural",
						size: "Medium",
					},
					medium: {
						url: "/image/upload/v1757464611/basket_oygmjj.png",
						title: "bamboo.jpg",
						size: 16000,
					},
					branches: [
						{
							name: "Crafts Outlet",
							address: "Karachi",
							country: "Pakistan",
							id: 5,
							code: "branchcode5",
							phone: "03112349876",
							email: "naturecrafts@gmail.com",
							latitude: 16161.12121,
							longitude: 16161.12121,
							is_main_branch: true,
							pvb: {
								cost_price: 800,
								stock: 200,
								low_stock: 20,
								reorder_quantity: 100,
								sale_price: 1200,
								discount_percentage: null,
							},
						},
					],
				},
			],
			images: [],
			thumbnailImage: {
				url: "/image/upload/v1757464611/basket_oygmjj.png",
				title: "bamboo.jpg",
				size: 16000,
			},
			product_translations: [
				{
					title: "Handmade Bamboo Basket",
					excerpt: "Perfect for storage and decoration.",
					description: "Crafted with eco-friendly bamboo material.",
				},
			],
		},
		{
			id: 7,
			sku: "TOAST001",
			slug: "toaster",
			thumbnail: 7,
			is_featured: true,
			meta_title: "Toaster",
			meta_description: "Electric bread toaster",
			created_at: "2025-08-24T08:00:00.000Z",
			categories: [
				{
					title: "Kitchen Appliances",
					description: "Appliances for modern kitchens",
					id: 6,
					slug: "kitchen-appliances",
				},
			],
			usps: [
				{
					title: "Quick Heating",
					description: "Toasts bread in seconds",
					id: 6,
					slug: "quick-heating",
				},
			],
			vendors: [
				{
					name: "Kitchen Store",
					address: "Karachi, Pakistan",
					country: "Pakistan",
					id: 6,
				},
			],
			product_variants: [
				{
					id: 20,
					sku: "TOAST2S",
					attributes: {
						color: "Silver",
						size: "2-Slice",
					},
					medium: {
						url: "/image/upload/v1757454603/blender_rx13af.png",
						title: "toaster.jpg",
						size: 21000,
					},
					branches: [
						{
							name: "Appliance Hub",
							address: "Karachi",
							country: "Pakistan",
							id: 6,
							code: "branchcode6",
							phone: "03012349876",
							email: "support@kitchenstore.com",
							latitude: 17171.12121,
							longitude: 17171.12121,
							is_main_branch: true,
							pvb: {
								cost_price: 4000,
								stock: 60,
								low_stock: 10,
								reorder_quantity: 20,
								sale_price: 5000,
								discount_percentage: 15,
							},
						},
					],
				},
			],
			images: [],
			thumbnailImage: {
				url: "/image/upload/v1757454603/blender_rx13af.png",
				title: "toaster.jpg",
				size: 21000,
			},
			product_translations: [
				{
					title: "Electric Bread Toaster",
					excerpt: "Fast and efficient toaster for your kitchen.",
					description: "Features adjustable heating with 2-slice capacity.",
				},
			],
		},
		{
			id: 3,
			sku: "SOFA001",
			slug: "loveseat-sofa",
			thumbnail: 3,
			is_featured: true,
			meta_title: "Loveseat Sofa",
			meta_description: "Comfortable modern loveseat sofa",
			created_at: "2025-08-20T10:15:00.000Z",
			categories: [
				{
					title: "Furniture",
					description: "Living room and home furniture",
					id: 3,
					slug: "furniture",
				},
			],
			usps: [
				{
					title: "Durable Fabric",
					description: "Made with premium quality fabric",
					id: 2,
					slug: "durable-fabric",
				},
			],
			vendors: [
				{
					name: "Sofa World",
					address: "Lahore, Pakistan",
					country: "Pakistan",
					id: 2,
				},
			],
			product_variants: [
				{
					id: 16,
					sku: "SOFAGRY",
					attributes: {
						color: "Grey",
						size: "2-Seater",
					},
					medium: {
						url: "/image/upload/v1757464609/sofa_nacpiz.png",
						title: "sofa.jpg",
						size: 45230,
					},
					branches: [
						{
							name: "Main Showroom",
							address: "Lahore",
							country: "Pakistan",
							id: 2,
							code: "branchcode2",
							phone: "03212345678",
							email: "sofa.showroom@gmail.com",
							latitude: 10121.12121,
							longitude: 20221.12121,
							is_main_branch: true,
							pvb: {
								cost_price: 25000,
								stock: 50,
								low_stock: 5,
								reorder_quantity: 10,
								sale_price: 28000,
								discount_percentage: 10,
							},
						},
					],
				},
			],
			images: [],
			thumbnailImage: {
				url: "/image/upload/v1757464609/sofa_nacpiz.png",
				title: "sofa.jpg",
				size: 45230,
			},
			product_translations: [
				{
					title: "Modern Loveseat Sofa",
					excerpt: "A stylish and comfortable loveseat sofa for modern homes.",
					description:
						"Perfect for compact living spaces with durable cushions and elegant design.",
				},
			],
		},
		{
			id: 4,
			sku: "LAMP001",
			slug: "table-lamp",
			thumbnail: 4,
			is_featured: false,
			meta_title: "Table Lamp",
			meta_description: "Stylish modern table lamp",
			created_at: "2025-08-21T12:30:00.000Z",
			categories: [
				{
					title: "Lighting",
					description: "Indoor lighting collection",
					id: 4,
					slug: "lighting",
				},
			],
			usps: [
				{
					title: "Energy Efficient",
					description: "Consumes less power with LED bulb support",
					id: 3,
					slug: "energy-efficient",
				},
			],
			vendors: [
				{
					name: "Bright Lights",
					address: "Karachi, Pakistan",
					country: "Pakistan",
					id: 3,
				},
			],
			product_variants: [
				{
					id: 17,
					sku: "LAMPNAT",
					attributes: {
						color: "White",
						size: "Standard",
					},
					medium: {
						url: "image//image/upload/v1757464608/lamp-light_fjxkj2.png",
						title: "tablelamp.jpg",
						size: 18200,
					},
					branches: [
						{
							name: "Lighting Hub",
							address: "Karachi",
							country: "Pakistan",
							id: 3,
							code: "branchcode3",
							phone: "03312349876",
							email: "info@brightlights.com",
							latitude: 14141.12121,
							longitude: 14141.12121,
							is_main_branch: true,
							pvb: {
								cost_price: 2000,
								stock: 100,
								low_stock: 10,
								reorder_quantity: 50,
								sale_price: 2500,
								discount_percentage: null,
							},
						},
					],
				},
			],
			images: [],
			thumbnailImage: {
				url: "/image/upload/v1757464608/lamp-light_fjxkj2.png",
				title: "tablelamp.jpg",
				size: 18200,
			},
			product_translations: [
				{
					title: "Classic Table Lamp",
					excerpt: "Perfect for study and bedroom lighting.",
					description: "Compact design with long-lasting performance.",
				},
			],
		},
		{
			id: 5,
			sku: "LAMP002",
			slug: "beige-table-lamp",
			thumbnail: 5,
			is_featured: false,
			meta_title: "Beige Table Lamp",
			meta_description: "Elegant beige table lamp",
			created_at: "2025-08-22T11:00:00.000Z",
			categories: [
				{
					title: "Lighting",
					description: "Indoor lighting collection",
					id: 4,
					slug: "lighting",
				},
			],
			usps: [
				{
					title: "Modern Style",
					description: "Adds elegance to your room",
					id: 4,
					slug: "modern-style",
				},
			],
			vendors: [
				{
					name: "Home Decor Lights",
					address: "Islamabad, Pakistan",
					country: "Pakistan",
					id: 4,
				},
			],
			product_variants: [
				{
					id: 18,
					sku: "LAMBEIGE",
					attributes: {
						color: "Beige",
						size: "Medium",
					},
					medium: {
						url: "/image/upload/v1757464607/lamp_a6577b.png",
						title: "beigelamp.jpg",
						size: 19000,
					},
					branches: [
						{
							name: "Decor Hub",
							address: "Islamabad",
							country: "Pakistan",
							id: 4,
							code: "branchcode4",
							phone: "03412349876",
							email: "support@decorhub.com",
							latitude: 15151.12121,
							longitude: 15151.12121,
							is_main_branch: true,
							pvb: {
								cost_price: 2200,
								stock: 80,
								low_stock: 8,
								reorder_quantity: 30,
								sale_price: 2700,
								discount_percentage: 5,
							},
						},
					],
				},
			],
			images: [],
			thumbnailImage: {
				url: "/image/upload/v1757464607/lamp_a6577b.png",
				title: "beigelamp.jpg",
				size: 19000,
			},
			product_translations: [
				{
					title: "Beige Table Lamp",
					excerpt: "Elegant beige lamp for modern interiors.",
					description: "Soft lighting with chic beige design.",
				},
			],
		},
		{
			id: 6,
			sku: "BASK001",
			slug: "bamboo-basket",
			thumbnail: 6,
			is_featured: false,
			meta_title: "Bamboo Basket",
			meta_description: "Eco-friendly bamboo storage basket",
			created_at: "2025-08-23T09:45:00.000Z",
			categories: [
				{
					title: "Home Decor",
					description: "Handmade and natural home decor",
					id: 5,
					slug: "home-decor",
				},
			],
			usps: [
				{
					title: "Eco-Friendly",
					description: "Made from 100% natural bamboo",
					id: 5,
					slug: "eco-friendly",
				},
			],
			vendors: [
				{
					name: "Nature Crafts",
					address: "Karachi, Pakistan",
					country: "Pakistan",
					id: 5,
				},
			],
			product_variants: [
				{
					id: 19,
					sku: "BASKM",
					attributes: {
						color: "Natural",
						size: "Medium",
					},
					medium: {
						url: "/image/upload/v1757464611/basket_oygmjj.png",
						title: "bamboo.jpg",
						size: 16000,
					},
					branches: [
						{
							name: "Crafts Outlet",
							address: "Karachi",
							country: "Pakistan",
							id: 5,
							code: "branchcode5",
							phone: "03112349876",
							email: "naturecrafts@gmail.com",
							latitude: 16161.12121,
							longitude: 16161.12121,
							is_main_branch: true,
							pvb: {
								cost_price: 800,
								stock: 200,
								low_stock: 20,
								reorder_quantity: 100,
								sale_price: 1200,
								discount_percentage: null,
							},
						},
					],
				},
			],
			images: [],
			thumbnailImage: {
				url: "/image/upload/v1757464611/basket_oygmjj.png",
				title: "bamboo.jpg",
				size: 16000,
			},
			product_translations: [
				{
					title: "Handmade Bamboo Basket",
					excerpt: "Perfect for storage and decoration.",
					description: "Crafted with eco-friendly bamboo material.",
				},
			],
		},
		{
			id: 7,
			sku: "TOAST001",
			slug: "toaster",
			thumbnail: 7,
			is_featured: true,
			meta_title: "Toaster",
			meta_description: "Electric bread toaster",
			created_at: "2025-08-24T08:00:00.000Z",
			categories: [
				{
					title: "Kitchen Appliances",
					description: "Appliances for modern kitchens",
					id: 6,
					slug: "kitchen-appliances",
				},
			],
			usps: [
				{
					title: "Quick Heating",
					description: "Toasts bread in seconds",
					id: 6,
					slug: "quick-heating",
				},
			],
			vendors: [
				{
					name: "Kitchen Store",
					address: "Karachi, Pakistan",
					country: "Pakistan",
					id: 6,
				},
			],
			product_variants: [
				{
					id: 20,
					sku: "TOAST2S",
					attributes: {
						color: "Silver",
						size: "2-Slice",
					},
					medium: {
						url: "/image/upload/v1757454603/blender_rx13af.png",
						title: "toaster.jpg",
						size: 21000,
					},
					branches: [
						{
							name: "Appliance Hub",
							address: "Karachi",
							country: "Pakistan",
							id: 6,
							code: "branchcode6",
							phone: "03012349876",
							email: "support@kitchenstore.com",
							latitude: 17171.12121,
							longitude: 17171.12121,
							is_main_branch: true,
							pvb: {
								cost_price: 4000,
								stock: 60,
								low_stock: 10,
								reorder_quantity: 20,
								sale_price: 5000,
								discount_percentage: 15,
							},
						},
					],
				},
			],
			images: [],
			thumbnailImage: {
				url: "/image/upload/v1757454603/blender_rx13af.png",
				title: "toaster.jpg",
				size: 21000,
			},
			product_translations: [
				{
					title: "Electric Bread Toaster",
					excerpt: "Fast and efficient toaster for your kitchen.",
					description: "Features adjustable heating with 2-slice capacity.",
				},
			],
		},
	],
	limit: 100,
	page: 1,
};

export const features = {
	total: 4,
	records: [
		{
			id: 5,
			title: "Living Room",
			description: null,
			slug: "living-room",
			icon: null,
			created_at: "2025-08-12T15:50:55.964Z",
			// medium can be null
			medium: {
				id: 1,
				url: "/image/upload/v1757454591/sofa_boh7yn.png",
				title: "sofa.png",
				size: 1698,
				user_id: 1,
				created_at: "2025-08-12T16:02:13.728Z",
				updated_at: "2025-08-12T16:02:13.728Z",
			},
			categories: [
				{
					id: 1,
					slug: "category2",
					title: "Category2",
					description: "Category1 Description",
				},
				{
					id: 2,
					slug: "aeawm",
					title: "new category",
					description: "sdfkemdeke",
				},
			],
		},
		{
			id: 6,
			title: "Bedroom",
			description: null,
			slug: "bedroom",
			icon: null,
			created_at: "2025-08-12T15:50:55.964Z",
			// medium can be null
			medium: {
				id: 2,
				url: "/image/upload/v1757454602/drawers_apq8xt.png",
				title: "drawer.png",
				size: 1698,
				user_id: 1,
				created_at: "2025-08-12T16:02:13.728Z",
				updated_at: "2025-08-12T16:02:13.728Z",
			},
			categories: [
				{
					id: 1,
					slug: "category2",
					title: "Category2",
					description: "Category1 Description",
				},
				{
					id: 2,
					slug: "aeawm",
					title: "new category",
					description: "sdfkemdeke",
				},
			],
		},
		{
			id: 5,
			title: "Kitchen",
			description: null,
			slug: "kitchen",
			icon: null,
			created_at: "2025-08-12T15:50:55.964Z",
			// medium can be null
			medium: {
				id: 1,
				url: "/image/upload/v1757454603/blender_rx13af.png",
				title: "blender.png",
				size: 1698,
				user_id: 1,
				created_at: "2025-08-12T16:02:13.728Z",
				updated_at: "2025-08-12T16:02:13.728Z",
			},
			categories: [
				{
					id: 1,
					slug: "category2",
					title: "Category2",
					description: "Category1 Description",
				},
				{
					id: 2,
					slug: "aeawm",
					title: "new category",
					description: "sdfkemdeke",
				},
			],
		},
	],
	limit: 100,
	page: 1,
};
