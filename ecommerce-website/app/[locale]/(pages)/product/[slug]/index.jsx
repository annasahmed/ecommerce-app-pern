"use client";
import BasePrice from "@/app/components/BaseComponents/BasePrice";
import Loader from "@/app/components/Shared/Loader";
import PrimaryButton from "@/app/components/Shared/PrimaryButton";
import ProductImageSlider from "@/app/components/Shared/ProductImageSlider";
import Ratings from "@/app/components/Shared/Ratings";
import SocialShare from "@/app/components/Shared/SocialShare";
import ProductsSlider from "@/app/components/Themes/KidsTheme/ProductsSlider";
import { useFetchReactQuery } from "@/app/hooks/useFetchReactQuery";
import { useStore } from "@/app/providers/StoreProvider";
import ProductServices from "@/app/services/ProductServices";
import { useCartStore } from "@/app/store/cartStore";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductDetailsPage() {
	const { slug } = useParams();
	const store = useStore();
	const { addToCart, toggleFavourite, favourites } = useCartStore();
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState("description");
	const [selectedColor, setSelectedColor] = useState(null);
	const [selectedSize, setSelectedSize] = useState(null);

	const { data: latestProducts, isLoading: latestProdductsLoading } =
		useFetchReactQuery(
			() => ProductServices.getLatestProducts(store.themeName),
			["latestProducts", store.themeName],
			{ enabled: !!store.themeName },
		);

	let { data: product, isLoading } = useFetchReactQuery(
		() => ProductServices.getProductBySlug(store.themeName, slug),
		["latestProducts", store.themeName, slug],
		{ enabled: !!store.themeName },
	);

	// product = store.content.productDetails[1];

	if (isLoading || latestProdductsLoading) return <Loader />;
	if (!product)
		return <h1 className="py-10 text-center h3">Product Not Found</h1>;

	// const product =
	// 	store.content.productDetails.find((v) => v.id == slug || v.slug === slug) ||
	// 	store.content.productDetails[0];
	const discountedPrice = (
		(product.base_price || product.price) *
		(1 - (product.discount || product.base_discount_percentage) / 100)
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
			<section className="container-layout section-layout grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10">
				{/* Left Section - Image Slider */}
				<ProductImageSlider
					images={[product.thumbnail, ...product.images]}
					discount={product.discount}
				/>

				{/* Right Section - Product Info */}
				<div className="flex flex-col">
					<h1 className="h4 capitalize text-title-color font-medium mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl">
						{product.title.toLowerCase()}
					</h1>

					{/* Rating */}
					<div className="flex items-center gap-2 mb-4">
						<Ratings />
						<span className="p5 text-muted text-sm sm:text-base">
							({product.reviewsCount || 100} reviews)
						</span>
					</div>

					{/* Price */}
					<div className="flex items-center gap-3 mb-5 flex-wrap">
						{(product.discount || product.base_discount_percentage) > 0 && (
							<BasePrice
								className="text-muted h5 line-through text-sm md:text-base"
								price={product.base_price || product.price}
							/>
						)}
						<BasePrice
							className="h3 font-bold text-secondary text-xl md:text-2xl"
							price={discountedPrice}
						/>

						{/* discount badge */}
						{(product.discount || product.base_discount_percentage) > 0 && (
							<p className="p5 konnect-font text-light bg-primary px-2 pt-1 pb-0.5 rounded-sm flex justify-center items-center">
								SAVE {product.discount || product.base_discount_percentage}%
							</p>
						)}
					</div>

					{/* Description */}
					<p className="leading-relaxed mb-6 pb-6 border-b p4 text-sm md:text-base text-[#999999]">
						{product.excerpt || product.description}
						{/* {product.description} */}
					</p>

					{/* Color Guide */}
					{/* <div className="flex flex-wrap items-center gap-3 mb-6 p4 text-sm md:text-base">
						<span className="font-medium">Color:</span>
						<div className="flex flex-wrap gap-3">
							{[
								{ name: "Red", color: "bg-red-500" },
								{ name: "Green", color: "bg-green-500" },
								{ name: "Orange", color: "bg-orange-500" },
								{ name: "Yellow", color: "bg-yellow-400" },
								{ name: "Blue", color: "bg-blue-500" },
								{ name: "Gray", color: "bg-gray-400" },
							].map(({ name, color }) => (
								<div
									key={name}
									onClick={() => setSelectedColor(name)}
									className={`relative w-6 h-6 rounded-full cursor-pointer border-2 ${
										selectedColor === name
											? "border-dark"
											: "border-transparent"
									} ${color}`}>
									{selectedColor === name && (
										<Check
											className="absolute inset-0 m-auto text-light"
											size={14}
										/>
									)}
								</div>
							))}
						</div>
					</div> */}
					{/* Size Guide */}
					{/* <div className="flex flex-wrap items-center gap-3 mb-6 p4 text-sm md:text-base">
						<span className="font-medium">Size:</span>
						<div className="flex gap-1">
							{["XS", "S", "M", "XL", "XXL"].map((size) => (
								<button
									key={size}
									className={`border text-sm px-3 py-1 rounded-md hover:border-dark hover:shadow-2xl ${
										selectedSize === size
											? "border-dark border-2 shadow-2xl"
											: ""
									}`}
									onClick={() => setSelectedSize(size)}>
									{size}
								</button>
							))}
						</div>
					</div> */}
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
							className="flex-1 bg-transparent border border-primary text-primary"
							onClick={handleAddToCart}>
							Add to Cart
						</PrimaryButton>
						{/* <PrimaryButton className="flex-1">Buy Now</PrimaryButton> */}
						<PrimaryButton className="flex-1" onClick={handleFavourite}>
							Add to Wishlist
						</PrimaryButton>
					</div>

					{/* SKU and Categories */}
					<div className="mb-4 p4 text-gray-600 space-y-1 text-sm md:text-base">
						<p>
							<span className="font-medium">SKU:</span> {product.sku}
						</p>
						{product.categories.length > 0 && (
							<p>
								<span className="font-medium">Categories:</span>{" "}
								{product.categories.join(", ")}
							</p>
						)}
						{/* <p>
							<span className="font-medium">Usps:</span>{" "}
							{product.tags.join(", ")}
						</p> */}
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
						{["description", "reviews"].map((tab) => (
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
						<p className="leading-relaxed text-sm md:text-base text-[#999999]">
							{product.description}
						</p>
					)}

					{activeTab === "reviews" && (
						<div>
							<h3 className="font-semibold mb-3 text-base md:text-lg">
								Customer Reviews
							</h3>
							{product.reviews?.length > 0 ? (
								product.reviews.map((r, i) => (
									<div key={i} className="border-b py-3">
										<p className="font-medium">{r.user}</p>
										<Ratings rating={r.rating} />
										<p className="text-dark/60 text-sm mt-1">{r.comment}</p>
									</div>
								))
							) : (
								<p>No Reviews Yet</p>
							)}
						</div>
					)}

					{activeTab === "additional" && product.additionalInfo && (
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
					productsData={
						latestProducts?.records?.length > 0
							? latestProducts?.records.slice(0, 5)
							: store.content.allProducts.slice(7, 12)
					}
					isSlider={false}
					title="Recently Viewed Products"
					columns={5}
				/>
			</section>
		</main>
	);
}
