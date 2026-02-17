"use client";

import { X } from "lucide-react";
import FilterSidebar from "./FiltersSidebar";

export default function MobileFilterDrawer({
	onClose,
	selectedFilters,
	setSelectedFilters,
	paramsCategory,
	paramsBrand,
	defaultFilters,
	setDefaultFilters,
}) {
	return (
		<>
			{/* Overlay */}
			<div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

			{/* Drawer */}
			<div
				className="
				fixed top-0 left-0 h-full w-[85%] max-w-[320px]
				bg-white z-50
				shadow-xl
				flex flex-col
				animate-slideIn
			">
				{/* Header */}
				<div className="flex justify-between items-center px-4 pt-4 pb-2 border-b">
					<h4 className="h4 font-bold pt-1">Filters</h4>

					<button onClick={onClose}>
						<X size={22} />
					</button>
				</div>

				{/* Filters Content */}
				<div className="flex-1 overflow-y-auto px-4 py-0.5">
					<FilterSidebar
						selectedFilters={selectedFilters}
						setSelectedFilters={setSelectedFilters}
						paramsCategory={paramsCategory}
						paramsBrand={paramsBrand}
						defaultFilters={defaultFilters}
						setDefaultFilters={setDefaultFilters}
					/>
				</div>

				{/* Footer Buttons */}
				<div className="p-4 border-t flex gap-3">
					<button
						onClick={() => {
							setSelectedFilters({});
						}}
						className="flex-1 border py-2 rounded-lg">
						Clear
					</button>

					<button
						onClick={onClose}
						className="flex-1 bg-secondary text-white py-2 rounded-lg">
						Apply
					</button>
				</div>
			</div>
		</>
	);
}
