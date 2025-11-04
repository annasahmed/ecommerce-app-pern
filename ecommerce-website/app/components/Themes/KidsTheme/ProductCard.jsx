"use client";

import { Eye, Heart, Repeat } from "lucide-react";
import BaseImage from "../../BaseComponents/BaseImage";
import BasePrice from "../../BaseComponents/BasePrice";
import Overlay from "../../Shared/Overlay";
import { ENV_VARIABLES } from "@/app/constants/env_variables";
import { useCartStore } from "@/app/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import PrimaryButton from "../../Shared/PrimaryButton";
import Ratings from "../../Shared/Ratings";

const ProductCard = ({ product }) => {
	const router = useRouter();
	const { addToCart, toggleFavourite, favourites } = useCartStore();

	if (!product) return null;

	const isFavourite = favourites?.some((f) => f.id === product.id);

	const handleAddToCart = () => {
		addToCart(product);
		toast.success("Added to cart!");
	};

	const handleFavourite = () => {
		toggleFavourite(product);
		toast.success(
			isFavourite ? "Removed from favourites!" : "Added to favourites!",
		);
	};

	return (
		<div
			className="
				group relative w-full h-full overflow-hidden 
				rounded-md border border-gray-200 bg-light
				shadow-sm/ hover:shadow-lg/ transition-all duration-300 
				hover:-translate-y-1
			">
			{/* Product Image */}
			<div className="relative w-full aspect-square overflow-hidden">
				<BaseImage
					src={
						product.thumbnail
							? ENV_VARIABLES.IMAGE_BASE_URL + product.thumbnail
							: product.image || null
					}
					alt={product.title}
					className="
						w-full h-full object-cover p-2/ rounded-t-md 
						transform group-hover:scale-105 transition-transform duration-500 ease-in-out
					"
					width={0}
					height={0}
					sizes={100}
				/>
				{/* Overlay on hover */}
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<Overlay />
				</div>
				{/* Top-right icons (appear on hover) */}
				<div className="absolute top-3 right-3 max-md:right-1.5 flex flex-col gap-2 max-md:gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
					{/* View Details */}
					<button
						title="View Details"
						onClick={() =>
							router.push(`/product/${product.slug || product.id}`)
						}
						className="bg-light rounded-full p-2 max-md:p-1 shadow hover:brightness-95 transition">
						<Eye className="size-5 max-md:size-4" />
					</button>
					{/* Compare (not functional yet) */}
					<button
						title="Compare"
						className="bg-light rounded-full p-2 max-md:p-1 shadow hover:brightness-95 transition">
						<Repeat className="size-5 max-md:size-4" />
					</button>
					{/* Add to Favourites */}
					<button
						title="Add to Favorites"
						onClick={handleFavourite}
						className="bg-light rounded-full p-2 max-md:p-1 shadow hover:brightness-95 transition">
						<Heart
							className={`size-5 max-md:size-4 ${
								isFavourite ? "fill-red-500 text-red-500" : ""
							}`}
						/>
					</button>
				</div>
				{/* Add to Cart button */}
				<PrimaryButton
					onClick={handleAddToCart}
					className="
						absolute bottom-3 max-md:bottom-2 w-[90%] left-1/2 -translate-x-1/2 
						opacity-0 group-hover:opacity-100 translate-y-3 max-md:translate-y-2 group-hover:translate-y-0
						transition-all duration-300
						rounded-fulls
					">
					Add to Cart
				</PrimaryButton>
			</div>

			{/* Product Info */}
			<div className="flex flex-col gap-2 px-4 py-3 max-md:px-2 max-md:py-1 border-t border-gray-100">
				<h5
					className="
						h6 font-semibold line-clamp-2
						transition-colors duration-300
					">
					{product.title}
				</h5>
				<div className="flex justify-between items-center">
					<BasePrice
						className="p3 font-semibold text-secondary"
						price={product.base_price || product.price}
					/>
					<Ratings rating={4} />
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
