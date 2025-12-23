const AboutUsSection = () => {
	return (
		<div className="bg-primary section-layout">
			<section className="container-layout grid grid-cols-1 md:grid-cols-2 justify-between gap-16 max-md:gap-8 items-stretch">
				<div className="text-light flex flex-col gap-6 max-md:gap-4">
					<h2 className="h3 font-medium">Online Baby Store in Pakistan</h2>
					<p className="p3 tracking-wide font-light text-justify">
						Babiesnbaba is your one-stop shop for premium baby products in
						Pakistan. We offer trusted baby brands at competitive prices with
						fast home delivery nationwide. From diapers and formula to clothing,
						toys, skincare, and baby essentials — everything you need is just a
						click away.
					</p>
				</div>
				<div className="text-light flex flex-col gap-6 max-md:gap-4">
					<h2 className="h3 font-medium">Shop Baby Products Online</h2>
					<p className="p3 tracking-wide font-light text-justify">
						Enjoy easy online shopping with Cash on Delivery, seasonal
						discounts, and quality products from top brands. Not satisfied? We
						offer replacements or refunds as per our policy.
						<br />
						<br />
						<span className="font-medium">Delivery</span>
						<br />
						Free delivery on orders Rs. 3,000 & above
						<br />
						Rs. 200 TCS charges on orders below Rs. 3,000 <br /> <br />
						Babiesnbaba — making parenting easier, every day. 👶✨
					</p>
				</div>
			</section>
		</div>
	);
};

export default AboutUsSection;
