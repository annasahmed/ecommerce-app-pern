import { ArrowRight } from "lucide-react";
import BaseLink from "../../BaseComponents/BaseLink";
import BaseSlider from "../../BaseComponents/BaseSlider";
import ProductCard from "./ProductCard";

const ProductsSlider = ({
	title = "",
	slug = "",
	productsData = [],
	isSlider = true,
	showTitle = true,
}) => {
	return (
		<>
			{showTitle && (
				<div className="flex gap-8 items-center mb-4">
					<h4 className="h3 font-bold text-primary uppercase">{title}</h4>
					<BaseLink
						href={`/${slug}`}
						className="flex gap-2 hover:gap-4 font-medium p5 items-center transition-all">
						View All <ArrowRight size={18} className="mt-[2px]" />
					</BaseLink>
				</div>
			)}
			{isSlider ? (
				<BaseSlider
					slides={productsData}
					slidesPerView={4}
					spaceBetween={20}
					showNavigation={true}
					showPagination={false}
					renderSlide={(product) => (
						<ProductCard product={product} key={product.id} />
					)}
				/>
			) : (
				<section className="grid grid-cols-3 gap-4 items-stretch">
					{productsData?.map((product) => (
						<ProductCard product={product} key={product.id} />
					))}
				</section>
			)}
		</>
	);
};

export default ProductsSlider;
