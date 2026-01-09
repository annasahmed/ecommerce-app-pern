"use client";
import React from "react";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import Logo from "@/app/components/Shared/Logo";
import { FiFacebook, FiInstagram, FiYoutube, FiGlobe } from "react-icons/fi";

import { FaTiktok, FaPinterestP, FaWhatsapp, FaLink } from "react-icons/fa";
import { useStore } from "@/app/providers/StoreProvider";

const currentYear = new Date().getFullYear();

export const SOCIAL_CONFIG = [
	{
		key: "facebook",
		icon: FiFacebook,
		label: "Facebook",
	},
	{
		key: "instagram",
		icon: FiInstagram,
		label: "Instagram",
	},
	{
		key: "tiktok",
		icon: FaTiktok,
		label: "TikTok",
	},
	{
		key: "pinterest",
		icon: FaPinterestP,
		label: "Pinterest",
	},
	{
		key: "youtube",
		icon: FiYoutube,
		label: "YouTube",
	},
	{
		key: "linktree",
		icon: FaLink,
		label: "Linktree",
	},
	{
		key: "website",
		icon: FiGlobe,
		label: "Website",
	},
	{
		key: "whatsapp",
		icon: FaWhatsapp,
		label: "WhatsApp",
	},
];

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
				<section className="section-layout-top flex flex-wrap justify-between gap-10 md:gap-16 lg:flex-nowrap">
					<div className="flex flex-wrap justify-between gap-10 max-md:gap-x-6 max-md:gap-y-8 w-full">
						<div className=" min-w-[150px] flex-1 md:flex-none lg:flex-2 md:pr-20">
							<Logo
								src={footerContent.logo}
								className="w-32 max-md:w-28 h-auto object-contain"
							/>
							<p className="p4 mt-4">
								Babiesnbaba is your one-stop shop for premium baby products in
								Pakistan. We offer trusted baby brands at competitive prices
								with fast home delivery nationwide.
							</p>
							{/* <h5 className="h5 my-2 uppercase font-bold text-sm md:text-base">
								Contact
							</h5>
							<ul className="flex flex-col gap-2 md:gap-3">
								{[
									// {
									// 	text: "Monday to Friday 8 a.m - 5 p.m",
									// },
									{
										text: "+01 456 789",
									},
									// {
									// 	text: "+01 456 789",
									// },
									{
										text: "contact@kidify.com",
										link: "mailto:contact@kidify.com",
									},
								]?.map((link, index) => (
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
							</ul> */}
						</div>
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
					</div>
				</section>

				<p className="pb-10 pt-12 max-md:pb-6 max-md:pt-8 p5 text-sm md:text-base flex justify-center items-center">
					{/* <section className="min-w-[150px] flex-1 md:flex-none lg:flex-1"> */}
					<ul className="flex flex-col/ gap-3 max-md:gap-2 text-2xl max-md:text-lg flex-wrap justify-center items-center text-primary">
						{SOCIAL_CONFIG.map(({ key, icon: Icon, label }) => {
							const href = store.socialLinks?.[key];
							if (!href) return null;

							return (
								<li key={key}>
									<BaseLink
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className="
										flex items-center justify-center
										bg-light p-2.5 max-md:p-1.5 rounded-full
										transition-all duration-300
										hover:-translate-y-1
										hover:bg-secondary
										hover:text-light
									">
										<Icon />
									</BaseLink>
								</li>
							);
						})}
					</ul>
					{/* </section> */}
				</p>

				{/* Divider */}
				<div className="w-full h-[1px] rounded-full bg-light opacity-30 max-md:mt-0" />

				{/* Bottom Section */}
				<section className="flex flex-col md:flex-row justify-center items-center gap-4 text-center md:text-left py-4">
					<p className="p4 text-sm md:text-base">
						Copyright &copy; {currentYear} {store.companyName || store.name}.
						All rights reserved
					</p>
				</section>
			</div>
		</footer>
	);
};

export default Footer;
