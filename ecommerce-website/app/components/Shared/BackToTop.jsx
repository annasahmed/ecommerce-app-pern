"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTop = () => {
	const [visible, setVisible] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;

			const scrollPercent = docHeight
				? Math.min((scrollTop / docHeight) * 100, 100)
				: 0;

			setProgress(scrollPercent);
			setVisible(scrollTop > 250);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	const radius = 20;
	const circumference = 2 * Math.PI * radius;

	return (
		<button
			onClick={scrollToTop}
			aria-label="Back to top"
			className={`
				fixed bottom-5 right-5 max-md:bottom-15 max-md:right-3 z-50
				w-11 h-11 md:w-14 md:h-14 rounded-full
				bg-black
				flex items-center justify-center
				shadow-md
				transition-all duration-300 ease-out
				hover:shadow-xl hover:-translate-y-1 text-gray-300
				active:scale-95
				${visible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
			`}>
			{/* Progress Ring */}
			<svg
				className="absolute inset-0 w-full rotate-[-90deg]"
				viewBox="0 0 56 56">
				<circle
					cx="28"
					cy="28"
					r={radius}
					fill="none"
					stroke="#d1d5dc"
					strokeWidth="3"
				/>
				<circle
					cx="28"
					cy="28"
					r={radius}
					fill="none"
					stroke="var(--color-secondary)"
					strokeWidth="3"
					strokeDasharray={circumference}
					strokeDashoffset={circumference * (1 - progress / 100)}
					strokeLinecap="round"
					className="transition-all duration-200"
				/>
			</svg>

			{/* Icon */}
			<ArrowUp className="w-5 h-5 text-light relative z-10" />
		</button>
	);
};

export default BackToTop;
