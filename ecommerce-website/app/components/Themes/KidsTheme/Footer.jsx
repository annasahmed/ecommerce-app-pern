"use client";
import React from "react";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import Logo from "@/app/components/Shared/Logo";
import { FiFacebook, FiInstagram, FiMail, FiYoutube } from "react-icons/fi";
import { useStore } from "@/app/providers/StoreProvider";

const currentYear = new Date().getFullYear();

const Footer = () => {
	const store = useStore();
	const footerContent = store.content.footer;

	return (
		<footer
			className="bg-footer text-light bg-no-repeat bg-cover bg-center"
			style={{
				backgroundImage: footerContent.background
					? `url('${footerContent.background.src}')`
					: "none",
			}}>
			<div className="container-layout">
				{/* Top Section */}
				<section className="section-layout flex flex-wrap justify-between gap-10 md:gap-16 lg:flex-nowrap">
					<div className="flex flex-wrap justify-between gap-10 w-full">
						{/* Dynamic Sections */}
						{footerContent.sections?.map((sect, i) => (
							<section
								key={i}
								className="min-w-[150px] flex-1 md:flex-none lg:flex-1">
								<h5 className="h5 mb-4 md:mb-8 uppercase font-bold text-sm md:text-base">
									{sect.title}
								</h5>
								<ul className="flex flex-col gap-2 md:gap-3">
									{sect.links?.map((link, index) => (
										<li
											key={index}
											className={`p4 text-sm md:text-base ${
												link.text.includes("@") ? "lowercase" : "capitalize"
											}`}>
											{link.link ? (
												<BaseLink href={link.link}>{link.text}</BaseLink>
											) : (
												link.text
											)}
										</li>
									))}
								</ul>
							</section>
						))}

						{/* Social Section */}
						<section className="min-w-[150px] flex-1 md:flex-none lg:flex-1">
							<h5 className="h5 mb-4 md:mb-8 uppercase font-bold text-sm md:text-base">
								Social
							</h5>
							<ul className="flex flex-col gap-3 p4">
								{store.socialLinks.email && (
									<BaseLink
										href={store.socialLinks.email}
										className="flex items-center gap-2 hover:opacity-70">
										<FiMail />
										<span>Email</span>
									</BaseLink>
								)}
								{store.socialLinks.instagram && (
									<BaseLink
										href={store.socialLinks.instagram}
										className="flex items-center gap-2 hover:opacity-70">
										<FiInstagram />
										<span>Instagram</span>
									</BaseLink>
								)}
								{store.socialLinks.facebook && (
									<BaseLink
										href={store.socialLinks.facebook}
										className="flex items-center gap-2 hover:opacity-70">
										<FiFacebook />
										<span>Facebook</span>
									</BaseLink>
								)}
								{store.socialLinks.youtube && (
									<BaseLink
										href={store.socialLinks.youtube}
										className="flex items-center gap-2 hover:opacity-70">
										<FiYoutube />
										<span>Youtube</span>
									</BaseLink>
								)}
							</ul>
						</section>
					</div>
				</section>

				{/* Divider */}
				<div className="w-full h-[1px] rounded-full bg-light opacity-30 my-6 max-md:mt-0" />

				{/* Bottom Section */}
				<section className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left py-4">
					<div className="flex justify-center md:justify-start w-full md:w-auto">
						<Logo
							src={footerContent.logo}
							className="w-32 max-md:w-28 h-auto object-contain"
						/>
					</div>
					<p className="p5 text-sm md:text-base">
						Copyright &copy; {currentYear} {store.name}. All rights reserved
					</p>
					<p className="p5 text-sm md:text-base">Payment Methods</p>
				</section>
			</div>
		</footer>
	);
};

export default Footer;
