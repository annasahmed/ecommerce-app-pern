import requests from "./httpServices";

const ProductServices = {
	getProducts: async ({
		themeName = "KidsTheme",
		categoryId,
		sort = "latest",
		limit,
		page,
	}) => {
		try {
			const params = { sort };

			if (categoryId) params.categoryId = categoryId;
			if (limit) params.limit = limit;
			if (page) params.page = page;

			// Pass params to requests.get without hardcoding query string
			const data = await requests.get("/product", { params });

			if (data && data.records?.length > 0) {
				return data;
			}
		} catch (err) {
			console.error("API error:", err);
		}

		const dataModule = await import(`../data/${themeName}/data`);
		// const dataModule  = await import(`./${themeName}/data.js`);
		return dataModule.latestProducts;
	},
	getLatestProducts: async (themeName = "KidsTheme") => {
		try {
			const data = await requests.get("/product?sort=latest");
			if (data && data.records?.length > 0) {
				return data;
			}
		} catch (err) {
			console.error("API error:", err);
		}

		const dataModule = await import(`../data/${themeName}/data`);
		// const dataModule  = await import(`./${themeName}/data.js`);
		return dataModule.latestProducts;
	},

	// example filters
	// 	{
	// 	categories: [165, 153],
	// 	brands: [26, 14],
	// 	price: { min: 100, max: 200 },
	// 	size: "18-24m",
	// 	color: "brown"
	// 	}
	getFilteredProducts: async ({ themeName = "KidsTheme", filters }) => {
		const params = {
			sort: "latest",
			...buildFilterParams(filters),
		};

		try {
			const data = await requests.get("/product", { params });
			if (data) return data;
		} catch (err) {
			console.error("API error:", err);
		}

		const dataModule = await import(`../data/${themeName}/data`);
		// const dataModule  = await import(`./${themeName}/data.js`);
		return dataModule.latestProducts;
	},
	getProductBySlug: async (themeName, slug) => {
		try {
			const data = await requests.get(`/product/${slug}`);
			return data;
		} catch (err) {
			console.error("API error:", err);
		}

		const dataModule = await import(`../data/${themeName}/data`);
		// const dataModule  = await import(`./${themeName}/data.js`);
		return dataModule.latestProducts;
	},
};

export default ProductServices;

const buildFilterParams = (filters = {}) => {
	const params = {};

	// categories → repeated categoryId
	if (filters.categories?.length) {
		params.categoryId = filters.categories; // array
	}

	// brands → repeated brandId
	if (filters.brands?.length) {
		params.brandId = filters.brands; // array
	}

	// price
	if (filters.price?.min != null) {
		params.minPrice = filters.price.min;
	}

	if (filters.price?.max != null) {
		params.maxPrice = filters.price.max;
	}

	// single values
	if (filters.color) {
		params.color = filters.color;
	}

	if (filters.size) {
		params.size = filters.size;
	}

	return params;
};
