"use client";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import Logo from "@/app/components/Shared/Logo";
import { useStore } from "@/app/providers/StoreProvider";
import { FiFacebook, FiInstagram, FiMail, FiYoutube } from "react-icons/fi";

const currentYear = new Date().getFullYear();

const Footer = () => {
	const store = useStore();
	const footerContent = store.content.footer;

	return (
		<footer className="bg-footer text-light">
			<div className="section-layout container-layout">
				<section className="section-layout flex justify-between gap-10">
					<div className="flex-1 flex flex-col gap-10">
						<Logo
							src={footerContent.logo || store.content.logo}
							className={`w-24 h-auto object-contain`}
						/>
						<h5 className="h5 md:max-w-54 font-medium">{footerContent.text}</h5>
						<div className="flex gap-8 md:max-w-60 flex-wrap">
							{store.socialLinks.email && (
								<BaseLink
									href={store.socialLinks.email}
									className="hover:opacity-70">
									<FiMail className="p2" />
								</BaseLink>
							)}
							{store.socialLinks.instagram && (
								<BaseLink
									href={store.socialLinks.instagram}
									className="hover:opacity-70">
									<FiInstagram className="p2" />
								</BaseLink>
							)}
							{store.socialLinks.facebook && (
								<BaseLink
									href={store.socialLinks.facebook}
									className="hover:opacity-70">
									<FiFacebook className="p2" />
								</BaseLink>
							)}
							{store.socialLinks.youtube && (
								<BaseLink
									href={store.socialLinks.youtube}
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
								{store.details.address}
								<br />
								{store.details.contact}
							</p>
							{/* <p className="p4 capitalize">{store.details.contact}</p> */}
						</section>
					</div>
				</section>
				<div className="w-full h-[1px] rounded-full bg-light opacity-30" />
				<p className="pt-10">
					Copyright &copy; {currentYear} {store.name}. All rights reserved
				</p>
			</div>
		</footer>
	);
};

export default Footer;
