import React, { useEffect, useState } from "react";
import {
	Table,
	TableHeader,
	TableCell,
	TableBody,
	TableRow,
} from "@windmill/react-ui";
import ImageSelectorField from "../form/fields/ImageSelectorField";

export default function VariantTable({
	defaultValues,
	onDelete,
	onUpdate,
	generatedVariants,
}) {
	const [variants, setVariants] = useState([]);
	console.log(generatedVariants, "chkkninsin");

	// Sync with generatedVariants
	useEffect(() => {
		setVariants(
			generatedVariants.map((variant) => ({
				...variant,
				costPrice: variant.costPrice || defaultValues.costPrice,
				salePrice: variant.salePrice || defaultValues.salePrice,
				stock: variant.stock || defaultValues.stock,
				lowStock: variant.lowStock || defaultValues.lowStock,
				reorderQty: variant.reorderQty || defaultValues.reorderQty,
				discount: variant.discount || defaultValues.discount,
				imageId: variant.imageId || defaultValues.imageId,
				imageUrl: variant.imageUrl || defaultValues.imageUrl,
			})),
		);
	}, [generatedVariants, defaultValues]);

	// Send updates to parent whenever variants change
	useEffect(() => {
		if (onUpdate) {
			onUpdate(variants);
		}
	}, [variants, onUpdate]);

	const handleChange = (idx, field, value) => {
		setVariants((prev) =>
			prev.map((variant, i) =>
				i === idx ? { ...variant, [field]: value } : variant,
			),
		);
	};

	const handleDelete = (idx) => {
		setVariants((prev) => prev.filter((_, i) => i !== idx));
		if (onDelete) onDelete(idx);
	};

	return (
		<Table className="w-full overflow-x-auto">
			<TableHeader>
				<tr>
					<TableCell className="w-12 text-xs px-2">Variant Name</TableCell>
					<TableCell className="w-12 text-xs px-2">SKU</TableCell>
					<TableCell className="w-12 text-xs px-2">Cost Price</TableCell>
					<TableCell className="w-12 text-xs px-2">Sale Price</TableCell>
					<TableCell className="w-12 text-xs px-2">Stock</TableCell>
					<TableCell className="w-12 text-xs px-2">Low Stock</TableCell>
					<TableCell className="w-12 text-xs px-2">Reorder Qty</TableCell>
					<TableCell className="w-12 text-xs px-2">Discount %</TableCell>
					<TableCell className="w-12 text-xs px-2">Image</TableCell>
					<TableCell className="w-12 text-xs px-2">Delete</TableCell>
				</tr>
			</TableHeader>
			<TableBody>
				{variants.map((variant, idx) => (
					<TableRow key={idx} className="text-xs">
						<TableCell>{variant?.name}</TableCell>

						<TableCell>
							<input
								type="text"
								value={variant.sku || ""}
								onChange={(e) => handleChange(idx, "sku", e.target.value)}
								className="border p-1 rounded w-24 text-xs"
							/>
						</TableCell>
						<TableCell>
							<input
								type="number"
								value={variant.costPrice || ""}
								onChange={(e) => handleChange(idx, "costPrice", e.target.value)}
								className="border p-1 rounded w-12"
							/>
						</TableCell>

						<TableCell>
							<input
								type="number"
								value={variant.salePrice || ""}
								onChange={(e) => handleChange(idx, "salePrice", e.target.value)}
								className="border p-1 rounded w-12"
							/>
						</TableCell>

						<TableCell>
							<input
								type="number"
								value={variant.stock || ""}
								onChange={(e) => handleChange(idx, "stock", e.target.value)}
								className="border p-1 rounded w-12"
							/>
						</TableCell>

						<TableCell>
							<input
								type="number"
								value={variant.lowStock || ""}
								onChange={(e) => handleChange(idx, "lowStock", e.target.value)}
								className="border p-1 rounded w-12"
							/>
						</TableCell>

						<TableCell>
							<input
								type="number"
								value={variant.reorderQty || ""}
								onChange={(e) =>
									handleChange(idx, "reorderQty", e.target.value)
								}
								className="border p-1 rounded w-12"
							/>
						</TableCell>

						<TableCell>
							<input
								type="number"
								value={variant.discount || ""}
								onChange={(e) => handleChange(idx, "discount", e.target.value)}
								className="border p-1 rounded w-12"
							/>
						</TableCell>

						<TableCell>
							<ImageSelectorField
								label={"image"}
								selectedImage={variant.imageId}
								setSelectedImage={(imageId) => {
									handleChange(idx, "imageId", imageId);
								}}
								selectedImageUrl={variant.imageUrl}
								setSelectedImageUrl={(imageUrl) => {
									handleChange(idx, "imageUrl", imageUrl);
								}}
								isVertical
								// className="col-span-2"
								isSmall
								className="border p-1 w-40 rounded"
							/>
						</TableCell>

						<TableCell>
							<button
								type="button"
								className="text-red-500 w-12"
								onClick={() => handleDelete(idx)}>
								Delete
							</button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
