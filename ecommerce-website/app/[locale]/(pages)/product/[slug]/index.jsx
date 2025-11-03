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
			<section className="container-layout mx-auto px-4 section-layout grid md:grid-cols-2 gap-10">
				{/* Left Section - Image Slider */}
				<ProductImageSlider
					images={product.images}
					isNew={product.isNew}
					discount={product.discount}
				/>

				{/* Right Section - Product Info */}
				<div className="flex flex-col">
					<h1 className="h3 font-bold mb-2">{product.title}</h1>

					{/* Rating */}
					<div className="flex items-center gap-2 mb-4">
						<div className="flex text-yellow-500">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									size={18}
									fill={
										i < Math.floor(product.rating) ? "currentColor" : "none"
									}
								/>
							))}
						</div>
						<span className="p5 text-muted">
							({product.reviewsCount} reviews)
						</span>
					</div>

					{/* Price */}
					<div className="flex items-center gap-3 mb-5">
						<span className="h3 font-bold text-secondary">
							${discountedPrice}
						</span>
						{product.discount > 0 && (
							<span className="text-muted h5 line-through">
								${product.price.toFixed(2)}
							</span>
						)}
					</div>

					{/* Description */}
					<p className="leading-relaxed mb-6 pb-6 border-b p4">
						{product.description}
					</p>

					{/* Quantity Selector */}
					<div className="flex items-center gap-3 mb-6 p4">
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
					<div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b">
						<Button
							className="flex items-center gap-2 bg-primary text-light"
							onClick={handleAddToCart}>
							<ShoppingCart size={18} />
							Add to Cart
						</Button>
						<Button className="bg-dark text-light">Buy Now</Button>
						<Button
							variant="outline"
							className="flex items-center gap-2"
							onClick={handleFavourite}>
							<Heart
								size={18}
								className={isFavourite ? "fill-red-500 text-red-500" : ""}
							/>
							Add to Wishlist
						</Button>
					</div>

					{/* SKU and Categories */}
					<div className="mb-4 p4 text-gray-600 space-y-1">
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
					<SocialShare />
				</div>

				{/* Tabs Section */}
				<div className="col-span-2 mt-12 border-t pt-6">
					<div className="flex gap-8 mb-4 border-b pb-6">
						{["description", "reviews", "additional"].map((tab) => (
							<button
								key={tab}
								className={`capitalize font-medium h6 pb-1/ ${
									activeTab === tab
										? "border-b-2 border-dark text-dark"
										: " text-muted"
								}`}
								onClick={() => setActiveTab(tab)}>
								{tab}
							</button>
						))}
					</div>

					{/* Tab Content */}
					{activeTab === "description" && (
						<p className="leading-relaxed">{product.description}</p>
					)}

					{activeTab === "reviews" && (
						<div>
							<h3 className="font-semibold mb-3">Customer Reviews</h3>
							{product.reviews.map((r, i) => (
								<div key={i} className="border-b py-3">
									<p className="font-medium">{r.user}</p>
									<div className="flex text-yellow-500">
										{[...Array(5)].map((_, j) => (
											<Star
												key={j}
												size={16}
												fill={j < r.rating ? "currentColor" : "none"}
											/>
										))}
									</div>
									<p className="text-dark/60 text-sm mt-1">{r.comment}</p>
								</div>
							))}
						</div>
					)}

					{activeTab === "additional" && (
						<div className="grid grid-cols-1 gap-4">
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
			<section className="container-layout section-layout-bottom">
				<ProductsSlider
					productsData={store.content.allProducts.slice(8, 12)}
					isSlider={false}
					title="Recently View Products"
					columns={4}
				/>
			</section>
		</main>
	);
}
