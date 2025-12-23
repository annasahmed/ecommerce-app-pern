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
	// base_discount_percentage
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

	const discountedPrice = (
		(product.base_price || product.price) *
		(1 - (product.base_discount_percentage || 0) / 100)
	).toFixed(2);

	const thumbnailImage = product.thumbnail
		? ENV_VARIABLES.IMAGE_BASE_URL + product.thumbnail
		: product.image || null;

	const hoverImage =
		product.images?.length > 1
			? ENV_VARIABLES.IMAGE_BASE_URL + product.images[1]
			: product.thumbnail
			? ENV_VARIABLES.IMAGE_BASE_URL + product.thumbnail
			: product.image || null;

	return (
		<div
			className="
				relative w-full h-full overflow-hidden
				rounded-md border border-gray-200 bg-light
				shadow-sm hover:shadow-md transition-all duration-300
				flex flex-col
				
			"
			onClick={() => {
				router.push(`/product/${product.slug || product.id}`);
			}}>
			{/* Product Image */}
			<div className="group relative w-full aspect-square overflow-hidden cursor-pointer">
				{/* Default image */}
				{/* Default image */}
				<BaseImage
					src={thumbnailImage}
					alt={product.title}
					className="
						absolute inset-0 w-full h-full object-cover rounded-t-md
						opacity-100 group-hover:opacity-0
						transition-opacity duration-1000 ease-in-out
					"
					width={0}
					height={0}
					sizes={100}
				/>

				{/* Hover image (fade + zoom) */}
				<BaseImage
					src={hoverImage}
					alt={product.title}
					className="
						absolute inset-0 w-full h-full object-cover rounded-t-md
						opacity-0 group-hover:opacity-100
						transform scale-100 group-hover:scale-110
						transition-all duration-1000 ease-in-out
						max-md:hidden
					"
					width={0}
					height={0}
					sizes={100}
				/>

				{/* Overlay (desktop only, does not block hover) */}
				<div
					className="
						absolute inset-0
						opacity-0 group-hover:opacity-100
						pointer-events-none group-hover:pointer-events-auto
						transition-opacity duration-300
						max-md:hidden
					">
					<Overlay />
				</div>

				{/* Action buttons */}
				<div className="flex flex-col gap-1 md:gap-2 absolute top-2 right-2 md:top-3 md:right-3">
					<button
						title="Add to Favorites"
						onClick={(e) => {
							e.stopPropagation();
							handleFavourite();
						}}
						className="bg-light rounded-full p-1 md:p-2 shadow hover:brightness-95 transition">
						<Heart
							className={`size-3.5 md:size-4 ${
								isFavourite ? "fill-red-500 text-red-500" : ""
							}`}
						/>
					</button>

					<button
						title="Compare"
						onClick={(e) => e.stopPropagation()}
						className="bg-light rounded-full p-1 md:p-2 shadow hover:brightness-95 transition">
						<Repeat className="size-3.5 md:size-4" />
					</button>
				</div>
				{/* Discount Badge */}
				{product.base_discount_percentage > 0 && (
					<div
						className="
			absolute top-2 left-2 md:top-3 md:left-3
			z-20
			rounded-full
			bg-secondary
			px-2.5 py-1 md:px-3 md:py-1
			p6
			font-medium text-white
			shadow-md
			select-none
		">
						{product.base_discount_percentage}% OFF
					</div>
				)}
			</div>

			{/* Product Info */}
			<div className="flex-1 flex flex-col gap-2 max-md:gap-1 px-4 py-3 border-t border-gray-100 max-md:px-2 max-md:py-2">
				<h5
					onClick={() => {
						router.push(`/product/${product.slug || product.id}`);
					}}
					className="flex-1 h7 font-semibold line-clamp-2 text-headingLight hover:text-secondary cursor-pointer transition-colors duration-300">
					{product.title}
				</h5>

				<h6 className="flex font-semibold gap-1 h7">
					{product.base_discount_percentage > 0 && (
						<BasePrice
							className="text-muted line-through"
							price={product.base_price}
						/>
					)}
					<BasePrice className="text-secondary" price={discountedPrice} />
				</h6>

				<Ratings rating={4} />

				<div className="flex flex-col gap-0.5">
					<PrimaryButton
						onClick={(e) => {
							e.stopPropagation();
							handleAddToCart();
						}}
						className="w-full mt-1.5 flex items-center justify-center gap-1">
						Add To Cart
					</PrimaryButton>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
