import { Eye, Heart, Repeat } from "lucide-react";
import BaseImage from "../../BaseComponents/BaseImage";
import BasePrice from "../../BaseComponents/BasePrice";
import PrimaryButton from "./PrimaryButton";
import Overlay from "../../Shared/Overlay";

const ProductCard = ({ product }) => {
	if (!product) return null;

	return (
		<div className="group w-full h-full flex flex-col gap-3  overflow-hidden transition-all duration-300">
			{/* Product Image */}
			<div className="relative w-full">
				<BaseImage
					src={product.image}
					alt={product.title}
					className="w-full h-full object-conver"
				/>
				<div className="transition-all duration-300 opacity-0 group-hover:opacity-100">
					<Overlay />
				</div>

				{/* Top-right icons (appear on hover) */}
				<div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
					<button
						title="View Details"
						className="bg-light rounded-full p-2 shadow hover:brightness-95 transition">
						<Eye size={16} />
					</button>
					<button
						title="Compare"
						className="bg-light rounded-full p-2 shadow hover:brightness-95 transition">
						<Repeat size={16} />
					</button>
					<button
						title="Add to Favorites"
						className="bg-light rounded-full p-2 shadow hover:brightness-95 transition">
						<Heart size={16} />
					</button>
				</div>
				{/* Add to Cart button (hidden until hover) */}
				<PrimaryButton className="absolute bottom-3 w-[90%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 transition-all duration-300">
					Add to Cart
				</PrimaryButton>
			</div>

			{/* Product Info */}
			<h5 className="h6 font-semibold line-clamp-2">{product.title}</h5>
			<BasePrice
				className="p3 font-medium text-secondary"
				price={product.base_sale_price}
			/>
		</div>
	);
};

export default ProductCard;
