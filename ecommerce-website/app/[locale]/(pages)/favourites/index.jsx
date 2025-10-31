"use client";
import {
	default as Button,
	default as PrimaryButton,
} from "@/app/components/Shared/PrimaryButton";
import ProductCard from "@/app/components/Themes/KidsTheme/ProductCard";
import { useCartStore } from "@/app/store/cartStore";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

export default function FavouritesPage() {
	const { favourites, clearFavourites } = useCartStore();

	return (
		<section className="max-w-7xl mx-auto px-4 py-10">
			<h1 className="h4 font-semibold mb-6">My Favourites</h1>

			{favourites.length === 0 ? (
				<div className="text-center py-20 text-muted">
					<p>You don&apos;t have any favorite items yet.</p>
					<Button className="mt-4 bg-primary text-light flex items-center gap-2">
						<ArrowLeft size={18} />
						Browse Products
					</Button>
				</div>
			) : (
				<div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
					{favourites.map((product) => {
						return (
							<ProductCard
								key={`favourite-product-${product.id}`}
								product={product}
							/>
						);
					})}
				</div>
			)}
			{favourites.length > 0 && (
				<div className="text-right mt-8">
					<PrimaryButton
						onClick={() => {
							clearFavourites();
							toast.info("Favourites cleared");
						}}
						className="bg-gray-200 text-dark">
						Clear All Favourites
					</PrimaryButton>
				</div>
			)}
		</section>
	);
}
