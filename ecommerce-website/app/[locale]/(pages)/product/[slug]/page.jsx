import Layout from "@/app/components/Shared/layout/Layout";
import { instanceWithoutCredentials } from "@/app/services/httpServices";
import ProductDetailsPage from "./ProductDetailsPage";

export async function generateMetadata({ params }) {
	const { slug } = await params;
	console.log("Product data slug:", slug);

	try {
		// Get the full response object first
		const response = await instanceWithoutCredentials.get(`/product/${slug}`);

		// Then extract data from response
		const data = response.data;

		console.log("Product data for metadata:", data);

		const title = data.title || "Default Title";
		const image = data.thumbnail
			? [`https://api.babiesnbaba.com${data.thumbnail}`]
			: [];
		const description = data.excerpt || "Default description";

		return {
			title,
			description,
			openGraph: {
				images: image,
				title,
				description,
			},
			twitter: {
				images: image,
				title,
				description,
			},
		};
	} catch (error) {
		console.error("Error fetching product metadata:", error);

		return {
			title: "Product Not Found",
			description: "Product details",
		};
	}
}

const Products = () => (
	<Layout>
		<ProductDetailsPage />
	</Layout>
);

export default Products;
