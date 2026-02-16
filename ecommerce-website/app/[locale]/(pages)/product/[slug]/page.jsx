import React from "react";
import ProductDetailsPage from ".";
import Layout from "@/app/components/Shared/layout/Layout";
import requests from "@/app/services/httpServices";
import { ENV_VARIABLES } from "@/app/constants/env_variables";

// export async function generateMetadata({ params }) {
// 	const { slug } = params;
// 	const data = await requests.get(`/product/${slug}`);

// 	console.log("Product data for metadata:", data);

// 	const title = data.title;
// 	const image = data.thumbnail
// 		? [`${ENV_VARIABLES.IMAGE_BASE_URL}${data.thumbnail}`]
// 		: [];
// 	const description = data.excerpt;

// 	return {
// 		openGraph: {
// 			images: image,
// 			title,
// 			description,
// 		},
// 		twitter: {
// 			images: image,
// 			title,
// 			description,
// 		},
// 	};
// }

const Products = () => {
	return (
		<Layout>
			<ProductDetailsPage />
		</Layout>
	);
};

export default Products;
