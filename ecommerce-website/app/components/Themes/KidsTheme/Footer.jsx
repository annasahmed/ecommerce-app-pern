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
			className="bg-footer text-light bg-no-repeat"
			style={{
				backgroundImage: footerContent.background
					? `url('${footerContent.background.src}')`
					: "none",
			}}>
			<div className="container-layout">
				<section className="section-layout flex justify-between gap-10">
					<div className="flex-1 flex justify-between gap-10">
						{footerContent.sections?.map((sect, i) => {
							return (
								<section key={i} className="flex-1">
									<h5 className="h5 mb-8 uppercase font-bold">{sect.title}</h5>
									<ul className="flex flex-col gap-3">
										{sect.links?.map((link, index) => {
											return (
												<li
													key={index}
													className={`p4 ${
														link.text.includes("@") ? "lowercase" : "capitalize"
													}`}>
													{link.link ? (
														<BaseLink href={link.link}>{link.text}</BaseLink>
													) : (
														link.text
													)}
												</li>
											);
										})}
									</ul>
								</section>
							);
						})}
						<section className="flex-1">
							<h5 className="h5 mb-8 uppercase font-bold">SOCIAL</h5>
							<ul className="flex flex-col gap-3 p4">
								{store.socialLinks.email && (
									<BaseLink
										href={store.socialLinks.email}
										className="flex items-center gap-2 hover:opacity-70">
										<FiMail className="" />
										Email
									</BaseLink>
								)}
								{store.socialLinks.instagram && (
									<BaseLink
										href={store.socialLinks.instagram}
										className="flex items-center gap-2 hover:opacity-70">
										<FiInstagram className="" />
										Instagram
									</BaseLink>
								)}
								{store.socialLinks.facebook && (
									<BaseLink
										href={store.socialLinks.facebook}
										className="flex items-center gap-2 hover:opacity-70">
										<FiFacebook className="" />
										Facebook
									</BaseLink>
								)}
								{store.socialLinks.youtube && (
									<BaseLink
										href={store.socialLinks.youtube}
										className="flex items-center gap-2 hover:opacity-70">
										<FiYoutube className="" />
										Youtube
									</BaseLink>
								)}
								{store.socialLinks.facebook && (
									<BaseLink
										href={store.socialLinks.facebook}
										className="flex items-center gap-2 hover:opacity-70">
										<FiFacebook className="" />
										Facebook
									</BaseLink>
								)}
								{/* <BaseLink href={link.link}>{link.text}</BaseLink> */}
							</ul>
						</section>
					</div>
				</section>
				<div className="w-full h-[1px] rounded-full bg-light opacity-30" />
				<section className="flex justify-between items-center py-6">
					<div className="flex-1/">
						<Logo
							src={footerContent.logo}
							className={`w-28 h-auto object-contain`}
						/>
					</div>
					<p className="flex-1 p5 text-center">
						Copyright &copy; {currentYear} {store.name}. All rights reserved
					</p>
					<p className="p5">Payment Methods</p>
				</section>
			</div>
		</footer>
	);
};

export default Footer;
