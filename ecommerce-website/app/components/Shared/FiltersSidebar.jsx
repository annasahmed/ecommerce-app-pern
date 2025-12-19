"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

// --- Filter Configuration ---
const filterData = {
	categories: [
		{ label: "Girls", count: 138 },
		{ label: "Boys’ Clothing", count: 126 },
		{ label: "Baby Care", count: 312 },
		{ label: "Safety Equipment", count: 325 },
		{ label: "Activity & Gear", count: 458 },
		{ label: "Baby Shoes", count: 63 },
		{ label: "Children’s Shoes", count: 385 },
		{ label: "Family Outfits", count: 56 },
	],

	price: {
		range: { min: 36, max: 173 },
		options: [
			{ label: "$100 - $200", count: 12 },
			{ label: "$200 - $400", count: 24 },
			{ label: "$400 - $600", count: 54 },
			{ label: "$600 - $800", count: 78 },
			{ label: "Over $1000", count: 125 },
		],
	},

	sizes: ["XS", "S", "M", "L", "XL", "XXL"],

	colors: [
		{ name: "Red", color: "bg-red-500" },
		{ name: "Green", color: "bg-green-500" },
		{ name: "Orange", color: "bg-orange-500" },
		{ name: "Yellow", color: "bg-yellow-400" },
		{ name: "Blue", color: "bg-blue-500" },
		{ name: "Gray", color: "bg-gray-400" },
		{ name: "Brown", color: "bg-amber-700" },
		{ name: "Cyan", color: "bg-cyan-400" },
		{ name: "Purple", color: "bg-purple-500" },
	],
};

// --- Collapsible Section Component ---
const Section = ({ title, children, defaultOpen = true }) => {
	const [open, setOpen] = useState(defaultOpen);
	return (
		<div className="border-b py-4 p4">
			<div
				className="flex justify-between items-center cursor-pointer"
				onClick={() => setOpen(!open)}>
				<h3 className="font-semibold">{title}</h3>
				{open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
			</div>
			{open && <div className="mt-3 space-y-2">{children}</div>}
		</div>
	);
};

// --- Main Component ---
export default function FilterSidebar() {
	const [selectedColor, setSelectedColor] = useState("Red");
	const [selectedSize, setSelectedSize] = useState(null);
	const [priceRange, setPriceRange] = useState(null);

	return (
		<aside className="overflow-y-scroll md:max-h-[115vh] hide-scrollbar max-md:hidden">
			<h4 className="h4 font-bold border-b pb-1">Filter</h4>

			{/* Categories */}
			<Section title="Categories">
				{filterData.categories.map(({ label, count }) => (
					<label
						key={label}
						className="flex items-center justify-between text-sm">
						<div>
							<input type="checkbox" className="mr-2 accent-secondary" />
							{label}
						</div>
						<span className="text-muted text-xs">{count}</span>
					</label>
				))}
			</Section>

			{/* Price */}
			<Section title="Price">
				{/* <p className="text-xs text-muted mb-1">
					Price Range: ${filterData.price.range.min} – $
					{filterData.price.range.max}
				</p> */}
				{/* <input
					type="range"
					min="0"
					max="100"
					value={priceRange}
					onChange={(e) => setPriceRange(e.target.value)}
					className="w-full accent-secondary mb-2"
				/> */}
				{filterData.price.options.map(({ label, count }) => (
					<label
						key={label}
						className="flex items-center justify-between text-sm">
						<div>
							<input type="checkbox" className="mr-2 accent-secondary" />
							{label}
						</div>
						<span className="text-muted text-xs">{count}</span>
					</label>
				))}
			</Section>

			{/* Size */}
			<Section title="Size">
				<div className="flex gap-2 flex-wrap">
					{filterData.sizes.map((size) => (
						<button
							key={size}
							className={`border text-sm px-3 py-1 rounded-md hover:border-dark hover:shadow-2xl ${
								selectedSize === size ? "border-dark border-2 shadow-2xl" : ""
							}`}
							onClick={() => setSelectedSize(size)}>
							{size}
						</button>
					))}
				</div>
			</Section>

			{/* Color */}
			<Section title="Color">
				<div className="flex flex-wrap gap-3">
					{filterData.colors.map(({ name, color }) => (
						<div
							key={name}
							onClick={() => setSelectedColor(name)}
							className={`relative w-6 h-6 rounded-full cursor-pointer border-2 ${
								selectedColor === name ? "border-dark" : "border-transparent"
							} ${color}`}>
							{selectedColor === name && (
								<Check
									className="absolute inset-0 m-auto text-light"
									size={14}
								/>
							)}
						</div>
					))}
				</div>
			</Section>
		</aside>
	);
}
