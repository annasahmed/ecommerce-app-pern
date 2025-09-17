import { useTranslations } from "next-intl";

export default function ProductPage({ params }) {
	const t = useTranslations("ProductPage");
	const { id } = params;

	return (
		<div>
			<h1>{t("title")}</h1>
			<p>Product ID: {id}</p>
			<div>
				<span>{t("price")}: $99</span>
			</div>
			<div>
				<p>{t("description")}: This is a great product...</p>
			</div>
			<button>{t("addToCart")}</button>
		</div>
	);
}
