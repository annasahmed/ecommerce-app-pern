import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ProductsPage() {
	const t = useTranslations("ProductPage");
	const nav = useTranslations("Navigation");

	return (
		<div>
			<nav style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
				<Link href="/" style={{ marginRight: "20px" }}>
					{nav("home")}
				</Link>
				<Link href="/products" style={{ marginRight: "20px" }}>
					{nav("products")}
				</Link>
			</nav>

			<main style={{ padding: "20px" }}>
				<h1>{t("title")}</h1>
				<p>{t("description")}</p>
			</main>
		</div>
	);
}
