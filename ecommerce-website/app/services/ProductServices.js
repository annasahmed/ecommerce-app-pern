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
	getLatestProducts: async (themeName) => {
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
