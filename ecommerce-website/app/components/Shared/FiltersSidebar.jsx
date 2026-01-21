"use client";
import { COLORMAP } from "@/app/data/colors";
import { useFetchReactQuery } from "@/app/hooks/useFetchReactQuery";
import MetadataService from "@/app/services/MetadataService";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";

// --- Filter Configuration ---

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
export default function FilterSidebar({
	selectedFilters,
	setSelectedFilters,
	paramsCategory,
	paramsBrand,
}) {
	const [selectedColor, setSelectedColor] = useState("Red");
	const [selectedSize, setSelectedSize] = useState(null);
	const [priceRange, setPriceRange] = useState(null);
	const [selectedPrice, setSelectedPrice] = useState(null);

	const { data, isLoading } = useFetchReactQuery(
		() =>
			MetadataService.getFiltersData({
				category: paramsCategory,
				brand: paramsBrand,
			}),
		["filtersData", paramsCategory, paramsBrand],
		{ enabled: true },
	);

	const filterData = useMemo(() => {
		if (!data) {
			return {
				categories: [],
				brands: [],
				sizes: [],
				colors: [],
				price: { range: { min: 0, max: 0 }, options: [] },
			};
		}

		const colorAttr =
			data.attributes.find((a) => a.name === "color")?.values ?? [];
		const sizeAttr =
			data.attributes.find((a) => a.name === "size")?.values ?? [];

		// Map colors to tailwind classes (you can extend more colors if needed)

		const colors = colorAttr.map((name) => ({
			name,
			color: COLORMAP[name.toLowerCase()] || "bg-gray-300",
		}));

		return {
			categories: data.categories ?? [],
			brands: data.brands ?? [],
			sizes: sizeAttr ?? [],
			colors,
			range: { min: 36, max: 173 }, // still hardcoded
			price: {
				options: [
					{ label: "Rs.100 - Rs.200", min: 100, max: 200 },
					{ label: "Rs.200 - Rs.400", min: 200, max: 400 },
					{ label: "Rs.400 - Rs.600", min: 400, max: 600 },
					{ label: "Rs.600 - Rs.800", min: 600, max: 800 },
					{ label: "Over Rs.1000", min: 1000, max: null },
				],
				// options: [
				// 	{ label: "Rs.100 - Rs.200", count: 12 },
				// 	{ label: "Rs.200 - Rs.400", count: 24 },
				// 	{ label: "Rs.400 - Rs.600", count: 54 },
				// 	{ label: "Rs.600 - Rs.800", count: 78 },
				// 	{ label: "Over Rs.1000", count: 125 },
				// ],
			},
		};
	}, [data]);

	const toggleArrayFilter = (key, value) => {
		setSelectedFilters((prev) => {
			const exists = prev[key]?.includes(value);

			return {
				...prev,
				[key]: exists
					? prev[key].filter((v) => v !== value)
					: [...(prev[key] || []), value],
			};
		});
	};

	const setSingleFilter = (key, value) => {
		setSelectedFilters((prev) => ({
			...prev,
			[key]: prev[key] === value ? null : value,
		}));
	};

	if (isLoading) {
		return <aside className="p-4 text-sm text-muted">Loading filters...</aside>;
	}

	return (
		<aside className="overflow-y-scroll md:max-h-[115vh] hide-scrollbar max-md:hidden">
			<h4 className="h4 font-bold border-b pb-1">Filter</h4>

			{/* Categories */}
			<Section title="Categories">
				{filterData.categories?.map(({ id, title, count }) => (
					<label key={id} className="flex items-center justify-between text-sm">
						<div>
							<input
								type="checkbox"
								className="mr-2 accent-secondary"
								checked={selectedFilters.categories?.includes(id)}
								onChange={() => toggleArrayFilter("categories", id)}
							/>
							{title}
						</div>
						{/* <span className="text-muted text-xs">{count}</span> */}
					</label>
				))}
			</Section>

			{/* Brands */}
			{filterData.brands && filterData.brands.length > 0 && (
				<Section title="Brands">
					{filterData.brands.map(({ id, title, count }) => (
						<label
							key={id}
							className="flex items-center justify-between text-sm">
							<div>
								<input
									type="checkbox"
									className="mr-2 accent-secondary"
									checked={selectedFilters.brands?.includes(id)}
									onChange={() => toggleArrayFilter("brands", id)}
								/>
								{title}
							</div>
							{/* <span className="text-muted text-xs">{count}</span> */}
						</label>
					))}
				</Section>
			)}

			<Section title="Price">
				{filterData.price.options.map(({ label, min, max }) => (
					<label
						key={label}
						className="flex items-center justify-between text-sm">
						<div>
							<input
								type="radio"
								name="price"
								className="mr-2 accent-secondary"
								checked={
									selectedFilters?.price?.min === min &&
									selectedFilters?.price?.max === max
								}
								onChange={() =>
									setSelectedFilters((prev) => ({
										...prev,
										price: { min, max },
									}))
								}
							/>
							{label}
						</div>
					</label>
				))}
			</Section>

			{/* Size */}
			<Section title="Size">
				<div className="flex gap-2 flex-wrap">
					{filterData.sizes?.map((size) => (
						<button
							key={size}
							className={`text-sm px-3 py-1 rounded-md hover:border-dark hover:shadow-2xl border ${
								selectedFilters.size === size
									? "border-dark shadow-2xl"
									: " border-transparent/"
							}`}
							onClick={() => setSingleFilter("size", size)}>
							{size}
						</button>
					))}
				</div>
			</Section>

			{/* Color */}
			<Section title="Color">
				<div className="flex flex-wrap gap-3">
					{filterData.colors?.map(({ name, color }) => (
						<div
							key={name}
							onClick={() => setSingleFilter("color", name)}
							className={`relative w-6 h-6 rounded-full cursor-pointer border-2 ${
								selectedFilters.color === name
									? "border-dark"
									: "border-transparent/"
							} ${color}`}>
							{selectedFilters.color === name && (
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
