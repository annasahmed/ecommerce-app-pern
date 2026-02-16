import {
	FiGrid,
	FiUsers,
	FiUser,
	FiCompass,
	FiSettings,
	FiSlack,
	FiGlobe,
	FiTarget,
	FiGitBranch,
	FiImage,
} from "react-icons/fi";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
	{
		path: "/dashboard", // the url
		icon: FiGrid, // icon
		name: "Dashboard", // name that appear in Sidebar
	},

	{
		icon: FiSlack,
		name: "Filters",
		routes: [
			{
				icon: FiSlack,
				path: "/categories",
				name: "Categories",
			},
			// {
			// 	icon: FiSlack,
			// 	path: "/usp",
			// 	name: "Usps",
			// },
			{
				icon: FiSlack,
				path: "/brand",
				name: "Brands",
			},
			// {
			// 	icon: FiSlack,
			// 	path: "/size-chart",
			// 	name: "SizeChart",
			// },
			{
				icon: FiSlack,
				path: "/attributes",
				name: "Attributes",
			},
		],
	},

	{
		icon: FiSlack,
		path: "/products",
		name: "Products",
	},
	{
		path: "/orders",
		icon: FiCompass,
		name: "Orders",
	},
	{
		path: "/returned",
		icon: FiCompass,
		name: "Return Requests",
	},

	{
		icon: FiSlack,
		path: "/homepage",
		name: "Homepage",
	},
	// {
	// 	path: "/coupons",
	// 	name: "Coupons",
	// },
	// 	],
	// },

	{
		path: "/media",
		icon: FiImage,
		name: "Media",
	},
	// {
	// 	path: "/branches",
	// 	icon: FiGitBranch,
	// 	name: "Branches",
	// },
	// {
	// 	path: "/vendors",
	// 	icon: FiUser,
	// 	name: "Vendors",
	// },
	{
		path: "/customers",
		icon: FiUsers,
		name: "Customers",
	},
	{
		path: "/roles",
		icon: FiUsers,
		name: "Roles",
	},

	{
		path: "/user",
		icon: FiUser,
		name: "Users",
	},
	{
		path: "/subscriber",
		icon: FiUser,
		name: "Subscribers",
	},

	// {
	// 	path: "/settings?settingTab=common-settings",
	// 	icon: FiSettings,
	// 	name: "Settings",
	// },
	// {
	// 	icon: FiGlobe,
	// 	name: "International",
	// 	routes: [
	// 		{
	// 			path: "/languages",
	// 			name: "Languages",
	// 		},
	// 		{
	// 			path: "/currencies",
	// 			name: "Currencies",
	// 		},
	// 	],
	// },
	// {
	// 	icon: FiTarget,
	// 	name: "OnlineStore",
	// 	routes: [
	// 		{
	// 			name: "ViewStore",
	// 			path: "/store",
	// 			outside: "store",
	// 		},

	// 		{
	// 			path: "/store/customization",
	// 			name: "StoreCustomization",
	// 		},
	// 		{
	// 			path: "/store/store-settings",
	// 			name: "StoreSettings",
	// 		},
	// 	],
	// },

	// {
	// 	icon: FiSlack,
	// 	name: "Pages",
	// 	routes: [
	// 		// submenu

	// 		{
	// 			path: "/404",
	// 			name: "404",
	// 		},
	// 		{
	// 			path: "/coming-soon",
	// 			name: "Coming Soon",
	// 		},
	// 	],
	// },
];

export default sidebar;
