import React from "react";
import Logo from "../Logo";
import { storeSettingsSportsTheme } from "@/app/data/storeSettingsSportsTheme";
import BaseLink from "../../BaseComponents/BaseLink";
import { FiFacebook, FiInstagram, FiMail, FiYoutube } from "react-icons/fi";

const currentYear = new Date().getFullYear();

const Footer = () => {
	const footerContent = storeSettingsSportsTheme.content.footer;

	return (
		<footer className="bg-footer text-light">
			<div className="section-layout container-layout">
				<section className="section-layout flex justify-between gap-10">
					<div className="flex-1 flex flex-col gap-10">
						<Logo
							src={footerContent.logo || storeSettingsSportsTheme.content.logo}
							className={`w-24 h-auto object-contain`}
						/>
						<h5 className="h5 md:max-w-54 font-medium">{footerContent.text}</h5>
						<div className="flex gap-8 md:max-w-60 flex-wrap">
							{storeSettingsSportsTheme.socialLinks.email && (
								<BaseLink
									href={storeSettingsSportsTheme.socialLinks.email}
									className="hover:opacity-70">
									<FiMail className="p2" />
								</BaseLink>
							)}
							{storeSettingsSportsTheme.socialLinks.instagram && (
								<BaseLink
									href={storeSettingsSportsTheme.socialLinks.instagram}
									className="hover:opacity-70">
									<FiInstagram className="p2" />
								</BaseLink>
							)}
							{storeSettingsSportsTheme.socialLinks.facebook && (
								<BaseLink
									href={storeSettingsSportsTheme.socialLinks.facebook}
									className="hover:opacity-70">
									<FiFacebook className="p2" />
								</BaseLink>
							)}
							{storeSettingsSportsTheme.socialLinks.youtube && (
								<BaseLink
									href={storeSettingsSportsTheme.socialLinks.youtube}
									className="hover:opacity-70">
									<FiYoutube className="p2" />
								</BaseLink>
							)}
						</div>
					</div>
					<div className="flex-1 flex justify-between gap-10">
						{footerContent.sections?.map((sect, i) => {
							return (
								<section key={i} className="flex-1">
									<h5 className="h5 mb-10 capitalize">{sect.title}</h5>
									<ul className="flex flex-col gap-8">
										{sect.links?.map((link, index) => {
											return (
												<li
													key={index}
													className="p4 capitalize opacity-80 hover:opacity-100">
													<BaseLink href={link.link}>{link.text}</BaseLink>
												</li>
											);
										})}
									</ul>
								</section>
							);
						})}
						<section className="flex-1">
							<h5 className="h5 mb-10 capitalize">Office</h5>
							<p className="p4 capitalize">
								{storeSettingsSportsTheme.details.address}
								<br />
								{storeSettingsSportsTheme.details.contact}
							</p>
							{/* <p className="p4 capitalize">{storeSettingsSportsTheme.details.contact}</p> */}
						</section>
					</div>
				</section>
				<div className="w-full h-[1px] rounded-full bg-light opacity-30" />
				<p className="pt-10">
					Copyright &copy; {currentYear} {storeSettingsSportsTheme.name}. All
					rights reserved
				</p>
			</div>
		</footer>
	);
};

export default Footer;
