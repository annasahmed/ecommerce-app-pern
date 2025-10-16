"use client";

import React from "react";
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	PinterestShareButton,
	WhatsappShareButton,
	RedditShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	PinterestIcon,
	WhatsappIcon,
	RedditIcon,
} from "react-share";

const SocialShare = ({ url, title, description, image }) => {
	const shareData = {
		url: url || typeof window !== "undefined" ? window.location.href : "",
		title: title || "Check this out!",
		description: description || "",
		image: image || "",
	};

	const buttons = [
		{
			name: "Facebook",
			Button: FacebookShareButton,
			Icon: FacebookIcon,
		},
		{
			name: "Twitter",
			Button: TwitterShareButton,
			Icon: TwitterIcon,
		},
		{
			name: "LinkedIn",
			Button: LinkedinShareButton,
			Icon: LinkedinIcon,
		},
		{
			name: "Pinterest",
			Button: PinterestShareButton,
			Icon: PinterestIcon,
		},
		{
			name: "WhatsApp",
			Button: WhatsappShareButton,
			Icon: WhatsappIcon,
		},
		{
			name: "Reddit",
			Button: RedditShareButton,
			Icon: RedditIcon,
		},
	];

	return (
		<div className="w-full">
			<h3 className="h6 font-semibold mb-2">Share:</h3>

			<div className="flex flex-wrap items-center gap-3">
				{buttons.map(({ name, Button, Icon }) => (
					<div
						key={name}
						className="relative group transition-transform hover:scale-105">
						<Button
							url={shareData.url}
							title={shareData.title}
							quote={shareData.description}
							media={shareData.image}>
							<Icon size={40} round />
						</Button>
						<span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-dark text-light px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
							{name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default SocialShare;
