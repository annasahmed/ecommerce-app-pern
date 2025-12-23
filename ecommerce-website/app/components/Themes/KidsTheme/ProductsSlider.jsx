import { ArrowRight } from "lucide-react";
import BaseLink from "../../BaseComponents/BaseLink";
import BaseSlider from "../../BaseComponents/BaseSlider";
import ProductCard from "./ProductCard";
import clsx from "clsx";

const ProductsSlider = ({
	title = "",
	slug = "",
	columns = 5,
	productsData = [],
	isSlider = true,
	showTitle = true,
}) => {
	return (
		<>
			{showTitle && (
				<div className="flex gap-8 items-center mb-4">
					<h3 className="h3 font-bold text-primary uppercase">{title}</h3>
					<BaseLink
						href={`/${slug}`}
						className="flex gap-2 whitespace-nowrap hover:gap-4 font-medium p5 items-center transition-all">
						View All <ArrowRight className="size-6 max-md:size-4 mt-0.5 max-md:mt-0" />
					</BaseLink>
				</div>
			)}
			{isSlider ? (
				<BaseSlider
					slides={productsData}
					slidesPerView={2}
					spaceBetween={12}
					showNavigation={false}
					showPagination={false}
					breakpoints={{
						768: {
							slidesPerView: 5,
							showNavigation: true,
							showPagination: true,
							spaceBetween: 16,
						},
					}}
					renderSlide={(product) => (
						<ProductCard product={product} key={product.id} />
					)}
				/>
			) : (
				<section
					className={clsx(
						`grid grid-cols-${columns} gap-4 max-md:gap-3 max-md:grid-cols-2 items-stretch`,
					)}>
					{productsData?.map((product) => (
						<ProductCard product={product} key={product.id} />
					))}
				</section>
			)}
		</>
	);
};

export default ProductsSlider;
