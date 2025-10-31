import React from "react";
import PrimaryButton from "../../Shared/PrimaryButton";
import BaseLink from "../../BaseComponents/BaseLink";

const CategoryCards = ({ category }) => {
	if (!category) return null;
	return (
		<BaseLink
			href={`/products?category=${category.query}`}
			className="w-full min-h-80 bg-cover bg-no-repeat bg-center px-8 py-14 flex flex-col gap-4 "
			style={{
				backgroundImage: `url('${category.image.src}')`,
			}}>
			<h2 className="bubble-text h3">{category.title}</h2>
			<p className="bubble-text p3 md:max-w-[60%]">{category.description}</p>
			<PrimaryButton isSmall className="max-w-fit" link={"/products"}>
				SHOP NOW
			</PrimaryButton>
		</BaseLink>
	);
};

export default CategoryCards;
