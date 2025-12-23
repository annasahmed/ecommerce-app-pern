import requests from "./httpServices";

const ProductServices = {
	getLatestProducts: async (themeName) => {
		try {
			const data = await requests.get("/product?sort=latest");
			console.log(data, "chkking data111");

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
};

export default ProductServices;
