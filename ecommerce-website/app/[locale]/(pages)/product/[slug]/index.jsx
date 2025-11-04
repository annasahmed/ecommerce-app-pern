"use client";
import { useState } from "react";
import { Heart, Share2, ShoppingCart, Star } from "lucide-react";
import ProductImageSlider from "@/app/components/Shared/ProductImageSlider";
import Button from "@/app/components/Shared/PrimaryButton";
import Image from "next/image";
import { useStore } from "@/app/providers/StoreProvider";
import SocialShare from "@/app/components/Shared/SocialShare";
import ProductsSlider from "@/app/components/Themes/KidsTheme/ProductsSlider";
import { useCartStore } from "@/app/store/cartStore";
import { toast } from "react-toastify";
import PrimaryButton from "@/app/components/Shared/PrimaryButton";
import Ratings from "@/app/components/Shared/Ratings";

export default function ProductDetailsPage() {
	const store = useStore();
	const { addToCart, toggleFavourite, favourites } = useCartStore();
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState("description");

	const product = store.content.productDetails;
	const discountedPrice = (
		product.base_price || product.price * (1 - product.discount / 100)
	).toFixed(2);

	const handleAddToCart = () => {
		addToCart(product);
		toast.success("Added to cart!");
	};
	const isFavourite = favourites?.some((f) => f.id === product.id);

	const handleFavourite = () => {
		toggleFavourite(product);
		toast.success(
			isFavourite ? "Removed from favourites!" : "Added to favourites!",
		);
	};

	return (
		<main>
			{/* Product Section */}
			<section className="container-layout section-layout grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
				{/* Left Section - Image Slider */}
				<ProductImageSlider
					images={product.images}
					isNew={product.isNew}
					discount={product.discount}
				/>

				{/* Right Section - Product Info */}
				<div className="flex flex-col">
					<h1 className="h3 font-bold mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl">
						{product.title}
					</h1>

					{/* Rating */}
					<div className="flex items-center gap-2 mb-4">
						<Ratings />
						<span className="p5 text-muted text-sm sm:text-base">
							({product.reviewsCount} reviews)
						</span>
					</div>

					{/* Price */}
					<div className="flex items-center gap-3 mb-5 flex-wrap">
						<span className="h3 font-bold text-secondary text-xl md:text-2xl">
							${discountedPrice}
						</span>
						{product.discount > 0 && (
							<span className="text-muted h5 line-through text-sm md:text-base">
								${product.price.toFixed(2)}
							</span>
						)}
					</div>

					{/* Description */}
					<p className="leading-relaxed mb-6 pb-6 border-b p4 text-sm md:text-base">
						{product.description}
					</p>

					{/* Quantity Selector */}
					<div className="flex flex-wrap items-center gap-3 mb-6 p4 text-sm md:text-base">
						<span className="font-medium">Quantity:</span>
						<div className="flex items-center border rounded-md">
							<button
								onClick={() => setQuantity((q) => Math.max(1, q - 1))}
								className="px-3 py-1 border-r text-lg">
								-
							</button>
							<span className="px-4">{quantity}</span>
							<button
								onClick={() => setQuantity((q) => q + 1)}
								className="px-3 py-1 border-l text-lg">
								+
							</button>
						</div>
					</div>

					{/* Buttons */}
					<div className="flex md:items-center gap-3 max-md:gap-1 mb-6 pb-6 border-b">
						<PrimaryButton
							className="flex-1 flex items-center justify-center gap-2 max-md:gap-0.5"
							onClick={handleAddToCart}>
							<ShoppingCart className="size-6 max-md:size-4" />
							Add to Cart
						</PrimaryButton>
						<PrimaryButton className="flex-1">Buy Now</PrimaryButton>
						<PrimaryButton
							variant="outline"
							className="flex-1 flex items-center justify-center gap-2 max-md:gap-0.5"
							onClick={handleFavourite}>
							<Heart
								className={`size-6 max-md:size-4 min-w-8 ${
									isFavourite ? "fill-red-500 text-red-500" : ""
								}`}
							/>
							Add to Wishlist
						</PrimaryButton>
					</div>

					{/* SKU and Categories */}
					<div className="mb-4 p4 text-gray-600 space-y-1 text-sm md:text-base">
						<p>
							<span className="font-medium">SKU:</span> {product.sku}
						</p>
						<p>
							<span className="font-medium">Categories:</span>{" "}
							{product.categories.join(", ")}
						</p>
						<p>
							<span className="font-medium">Usps:</span>{" "}
							{product.tags.join(", ")}
						</p>
					</div>

					{/* Social Share */}
					<div className="mt-4">
						<SocialShare />
					</div>
				</div>

				{/* Tabs Section */}
				<div className="col-span-1 md:col-span-2 mt-12/ border-t pt-4">
					{/* Tabs */}
					<div className="flex flex-wrap gap-6 md:gap-8 mb-4 border-b pb-4 md:pb-6 md:justify-start">
						{["description", "reviews", "additional"].map((tab) => (
							<button
								key={tab}
								className={`capitalize font-medium text-sm sm:text-base h6 pb-1 ${
									activeTab === tab
										? "border-b-2 border-dark text-dark"
										: "text-muted"
								}`}
								onClick={() => setActiveTab(tab)}>
								{tab}
							</button>
						))}
					</div>

					{/* Tab Content */}
					{activeTab === "description" && (
						<p className="leading-relaxed text-sm md:text-base">
							{product.description}
						</p>
					)}

					{activeTab === "reviews" && (
						<div>
							<h3 className="font-semibold mb-3 text-base md:text-lg">
								Customer Reviews
							</h3>
							{product.reviews.map((r, i) => (
								<div key={i} className="border-b py-3">
									<p className="font-medium">{r.user}</p>
									<Ratings rating={r.rating} />
									<p className="text-dark/60 text-sm mt-1">{r.comment}</p>
								</div>
							))}
						</div>
					)}

					{activeTab === "additional" && (
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
							{Object.entries(product.additionalInfo).map(([key, value]) => (
								<p key={key}>
									<span className="font-medium capitalize">{key}: </span>
									{value}
								</p>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Recently Viewed Products */}
			<section className="container-layout section-layout-bottom">
				<ProductsSlider
					productsData={store.content.allProducts.slice(8, 12)}
					isSlider={false}
					title="Recently Viewed Products"
					columns={4}
				/>
			</section>
		</main>
	);
}
