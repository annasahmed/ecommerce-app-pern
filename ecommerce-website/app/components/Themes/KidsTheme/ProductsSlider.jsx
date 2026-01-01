import clsx from "clsx";
import BaseSlider from "../../BaseComponents/BaseSlider";
import SectionTitle from "../../Shared/SectionTitle";
import ProductCard from "./ProductCard";

const ProductsSlider = ({
	title = "",
	slug = "",
	columns = 3,
	productsData = [],
	isSlider = "both", //onlyMobile 
	showTitle = true,
	isMobileSlider
}) => {
	return (
		<>
			{showTitle && <SectionTitle title={title} href={`/${slug}`} />}
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
