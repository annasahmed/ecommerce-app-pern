import requests from "./httpServices";

const ProductServices = {
	getLatestProducts: async (themeName) => {
		try {
			const data = await requests.get("/product?sort=latest");
			if (data && data.records?.length > 0) {
				return data;
			}
		} catch (err) {
			console.error("API error:", err);
		}

		const module = await import(`../data/${themeName}/data`);
		// const module = await import(`./${themeName}/data.js`);
		return module.latestProducts;
	},
};

export default ProductServices;
