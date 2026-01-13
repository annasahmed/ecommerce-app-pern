"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RouteTracker() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const url =
			pathname +
			(searchParams?.toString() ? `?${searchParams.toString()}` : "");

		// Google Analytics
		if (typeof window !== "undefined" && window.gtag) {
			window.gtag("config", "G-V6M9W091WE", {
				page_path: url,
			});
		}

		// Meta Pixel
		if (typeof window !== "undefined" && window.fbq) {
			window.fbq("track", "PageView");
		}
	}, [pathname, searchParams]);

	return null;
}
