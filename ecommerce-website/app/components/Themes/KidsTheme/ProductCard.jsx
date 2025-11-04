"use client";

import { Eye, Heart, Plus, Repeat } from "lucide-react";
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
				shadow-sm hover:shadow-md/ transition-all duration-300 
				hover:-translate-y-1
				flex flex-col
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
						w-full h-full object-cover rounded-t-md 
						transform group-hover:scale-105 transition-transform duration-500 ease-in-out
					"
					width={0}
					height={0}
					sizes={100}
				/>

				{/* Overlay only visible on desktop hover */}
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-md:hidden">
					<Overlay />
				</div>

				<div className="flex flex-col gap-1 md:gap-2 absolute top-2 right-2 md:top-3 md:right-3 transition-all duration-300">
					<button
						title="Add to Favorites"
						onClick={handleFavourite}
						className="transition bg-light rounded-full p-1 md:p-2 shadow hover:brightness-95">
						<Heart
							className={`size-3.5 md:size-4 ${
								isFavourite ? "fill-red-500 text-red-500" : ""
							}`}
						/>
					</button>
					<button
						title="Compare"
						// onClick={handleFavourite}
						className="transition bg-light rounded-full p-1 md:p-2 shadow hover:brightness-95">
						<Repeat className={`size-3.5 md:size-4`} />
					</button>
				</div>
			</div>

			{/* Product Info */}
			<div className="flex-1 flex flex-col gap-2 max-md:gap-1 px-4 py-3 border-t border-gray-100 max-md:px-2 max-md:py-2">
				<h5
					className="
						h6 font-semibold line-clamp-2
						transition-colors duration-300
					">
					{product.title}
				</h5>

				<div className="flex-1 flex md:justify-between md:items-center max-md:flex-col gap-2 max-md:gap-1.5">
					<BasePrice
						className="p3 font-semibold text-secondary"
						price={product.base_price || product.price}
					/>
					<Ratings rating={4} />
				</div>
				<div className="flex flex-col gap-0.5/">
					<PrimaryButton
						onClick={handleAddToCart}
						className="w-full mt-1.5 flex items-center justify-center gap-1">
						Add To Cart
					</PrimaryButton>
					<PrimaryButton
						onClick={() =>
							router.push(`/product/${product.slug || product.id}`)
						}
						className="w-full mt-1.5 flex items-center justify-center gap-1 bg-transparent border border-primary text-primary">
						View Details
					</PrimaryButton>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
