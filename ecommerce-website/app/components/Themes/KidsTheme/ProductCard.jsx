"use client";

import { ENV_VARIABLES } from "@/app/constants/env_variables";
import useWindowSize from "@/app/hooks/useWindowSize";
import { useCartStore } from "@/app/store/cartStore";
import { Heart, Repeat, ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import BaseImage from "../../BaseComponents/BaseImage";
import BasePrice from "../../BaseComponents/BasePrice";
import Overlay from "../../Shared/Overlay";
import PrimaryButton from "../../Shared/PrimaryButton";
import Ratings from "../../Shared/Ratings";

const MOBILE_NAV_DELAY = 500; // ms
const LONG_PRESS_DURATION = 1; // ms

const ProductCard = ({ product }) => {
	const [isLongPressed, setIsLongPressed] = useState(false);
	const pressTimer = useRef(null);
	const longPressTriggered = useRef(false);
	const windowSize = useWindowSize();
	const isMobile = windowSize?.width < 768;
	const [isHoverActive, setIsHoverActive] = useState(false);
	const navTimer = useRef(null);
	const router = useRouter();
	const { addToCart, toggleFavourite, favourites } = useCartStore();

	const isFavourite = favourites?.some((f) => f.id === product.id);

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

	const startPress = () => {
		if (!isMobile) return;

		longPressTriggered.current = false;

		pressTimer.current = setTimeout(() => {
			setIsLongPressed(true);
			longPressTriggered.current = true;
		}, LONG_PRESS_DURATION);
	};

	const endPress = () => {
		if (!isMobile) return;

		clearTimeout(pressTimer.current);

		// hide after release
		setTimeout(() => {
			setIsLongPressed(false);
		}, 1500);
	};

	// const handleClick = () => {
	// 	if (isMobile && longPressTriggered.current) return;

	// 	router.push(`/product/${product.slug || product.id}`);
	// };
	const handleClick = () => {
		if (isMobile) {
			// Show hover effect immediately
			setIsHoverActive(true);

			// Delay navigation
			navTimer.current = setTimeout(() => {
				router.push(`/product/${product.slug || product.id}`);
			}, 400);
		} else {
			// Desktop: navigate immediately
			router.push(`/product/${product.slug || product.id}`);
		}
	};

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

	if (!product) return null;

	return (
		<div
			className="
				relative w-full h-full overflow-hidden
				rounded-md border border-gray-200 bg-light
				shadow-sm hover:shadow-md transition-all duration-300
				flex flex-col hover:border-2 hover:border-secondary active:border-2 active:border-secondary
				
			">
			{/* Product Image */}
			<div
				className="
					group relative w-full aspect-square overflow-hidden cursor-pointer
					select-none [-webkit-tap-highlight-color:transparent] 
				"
				onClick={handleClick}
				onTouchStart={startPress}
				onTouchEnd={endPress}
				onTouchCancel={endPress}>
				{/* Default image */}
				<BaseImage
					src={thumbnailImage}
					alt={product.title}
					width={600}
					height={600}
					className={`
						absolute inset-0 w-full h-full object-cover rounded-t-md
						transition-opacity duration-1000 ease-in-out
						${isLongPressed ? "opacity-0" : "opacity-100"}
						md:group-hover:opacity-0
					`}
				/>

				{/* Hover image (fade + zoom) */}
				<BaseImage
					src={hoverImage}
					alt={product.title}
					width={600}
					height={600}
					className={`
						absolute inset-0 w-full h-full object-cover rounded-t-md
						transition-all duration-1000 ease-in-out transform
						${isLongPressed ? "opacity-100 scale-110" : "opacity-0 scale-100"}
						md:group-hover:opacity-100 md:group-hover:scale-110
					`}
				/>

				{/* Overlay (desktop only, does not block hover) */}
				{/* <div
					className={`
						absolute inset-0 transition-opacity duration-300
						${
							isLongPressed
								? "opacity-100 pointer-events-auto"
								: "opacity-0 pointer-events-none"
						}
						md:group-hover:opacity-100 md:group-hover:pointer-events-auto
					`}>
					<Overlay />
				</div> */}

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
						py-2 px-3 max-md:pt-2.5 max-md:pb-1.5 max-md:px-2
						p6 font-normal konnect-font text-white
						shadow-md
						select-none
						text-center
						flex flex-col justify-center items-center
						max-md:leading-none!
					">
						<p>{product.base_discount_percentage}%</p>
						<p className="max-md:leading-2.5!">OFF</p>
					</div>
				)}
			</div>

			{/* Product Info */}
			<div className="flex-1 flex flex-col gap-3 max-md:gap-1 px-4 py-3 border-t border-gray-100 max-md:px-2 max-md:py-2">
				<h5
					onClick={() => {
						router.push(`/product/${product.slug || product.id}`);
					}}
					className="flex-1 h7 font-normal line-clamp-1 capitalize text-headingLight hover:text-secondary cursor-pointer transition-colors duration-300">
					{product.title.toLowerCase()}
				</h5>

				<h6 className="flex font-normal gap-1 h7">
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
						onClick={() => {
							handleAddToCart();
						}}
						className="w-full mt-4 flex items-center justify-between gap-2 bg-transparent border-primary text-primary border"
						justifyContent="justify-between"
						>
						Add To Cart{" "}
						<ShoppingCartIcon
							style={{
								width: "20px",
							}}
						/>
					</PrimaryButton>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
