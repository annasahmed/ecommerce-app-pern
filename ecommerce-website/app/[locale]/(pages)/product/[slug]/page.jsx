import React from "react";
import ProductDetailsPage from ".";
import Layout from "@/app/components/Shared/layout/Layout";
import requests from "@/app/services/httpServices";
import { ENV_VARIABLES } from "@/app/constants/env_variables";

export async function generateMetadata({ params }) {
	const { slug } = await params;
	let title;
	let image;
	let description;
	await requests.get(`/product/${slug}`).then((data) => {
		title = data.title;
		image = data.thumbnail
			? `${ENV_VARIABLES.IMAGE_BASE_URL}${data.thumbnail}`
			: null;
		description = data.excerpt;
	});
	return {
		openGraph: {
			images: image,
			title: title,
			description: description,
		},
		twitter: {
			images: image,
			title: title,
			description: description,
		},
	};
}

const Products = () => {
	return (
		<Layout>
			<ProductDetailsPage />
		</Layout>
	);
};

export default Products;
