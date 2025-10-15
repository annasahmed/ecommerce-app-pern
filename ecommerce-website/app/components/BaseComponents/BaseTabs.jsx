"use client";
import { useState } from "react";
import clsx from "clsx";

/**
 * BaseTab Component
 *
 * Props:
 * - tabs: [{ label: string, content: JSX.Element }]
 * - defaultIndex?: number
 * - onChange?: (index: number) => void
 * - className?: string
 * - tabClassName?: string
 * - activeTabClassName?: string
 */
export default function BaseTab({
	tabs = [],
	defaultIndex = 0,
	onChange,
	className = "",
	tabClassName = "",
	activeTabClassName = "",
}) {
	const [activeIndex, setActiveIndex] = useState(defaultIndex);

	const handleTabClick = (index) => {
		setActiveIndex(index);
		if (onChange) onChange(index);
	};

	return (
		<div className={clsx("w-full", className)}>
			{/* Tab Headers */}
			<div className="flex justify-center">
				{tabs.map((tab, index) => (
					<button
						key={index}
						onClick={() => handleTabClick(index)}
						className={clsx(
							"px-4 py-1 p3 font-medium transition-all duration-200 border-b-2 mb-4",
							index === activeIndex
								? clsx("border-primary text-primary", activeTabClassName)
								: clsx(
										"border-transparent hover:text-primary hover:border-primary",
										tabClassName,
								  ),
						)}>
						{tab.label}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div className="p-4">
				{tabs[activeIndex] && tabs[activeIndex].content}
			</div>
		</div>
	);
}
