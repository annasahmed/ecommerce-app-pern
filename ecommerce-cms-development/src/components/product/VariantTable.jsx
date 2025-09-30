import React, { useEffect, useMemo, useRef } from "react";
import {
	Table,
	TableHeader,
	TableCell,
	TableBody,
	TableRow,
} from "@windmill/react-ui";
import { useForm, useFieldArray } from "react-hook-form";

export default function VariantTable({
	selectedVariants,
	defaultValues,
	onDelete,
	onUpdate,
}) {
	const variants = useMemo(
		() => generateVariants(selectedVariants),
		[selectedVariants],
	);

	const { control, register, reset, watch } = useForm({
		defaultValues: { variants: [] },
	});

	const { fields, remove, replace } = useFieldArray({
		control,
		name: "variants",
	});

	const values = watch("variants");

	// 🔑 Sync field array with generated variants
	useEffect(() => {
		if (variants.length !== fields.length) {
			replace(
				variants.map((variant) => ({
					...variant,
					costPrice: defaultValues.costPrice,
					salePrice: defaultValues.salePrice,
					stock: defaultValues.stock,
					lowStock: defaultValues.lowStock,
					reorderQty: defaultValues.reorderQty,
					discount: defaultValues.discount,
					image: defaultValues.image,
				})),
			);
		}
	}, [variants.length, replace, defaultValues, fields.length]);
	const prevEnriched = useRef(null);
	// Send enriched data back to parent, but only if changed
	useEffect(() => {
		const enriched = variants.map((variant, idx) => ({
			...variant,
			...values?.[idx],
		}));

		// simple deep check (JSON stringify works fine for this case)
		if (JSON.stringify(prevEnriched.current) !== JSON.stringify(enriched)) {
			prevEnriched.current = enriched;
			onUpdate(enriched);
		}
	}, [values, variants, onUpdate]);

	return (
		<Table>
			<TableHeader>
				<tr>
					<TableCell>Variant Name</TableCell>
					<TableCell>Cost Price</TableCell>
					<TableCell>Sale Price</TableCell>
					<TableCell>Stock</TableCell>
					<TableCell>Low Stock</TableCell>
					<TableCell>Reorder Qty</TableCell>
					<TableCell>Discount %</TableCell>
					<TableCell>Image</TableCell>
					<TableCell>Delete</TableCell>
				</tr>
			</TableHeader>
			<TableBody>
				{fields.map((field, idx) => (
					<TableRow key={field.id}>
						<TableCell>{variants[idx]?.name}</TableCell>

						<TableCell>
							<input
								type="number"
								{...register(`variants.${idx}.costPrice`)}
								className="border p-1 rounded w-20"
							/>
						</TableCell>

						<TableCell>
							<input
								type="number"
								{...register(`variants.${idx}.salePrice`)}
								className="border p-1 rounded w-20"
							/>
						</TableCell>

						<TableCell>
							<input
								type="number"
								{...register(`variants.${idx}.stock`)}
								className="border p-1 rounded w-20"
							/>
						</TableCell>

						<TableCell>
							<input
								type="number"
								{...register(`variants.${idx}.lowStock`)}
								className="border p-1 rounded w-20"
							/>
						</TableCell>

						<TableCell>
							<input
								type="number"
								{...register(`variants.${idx}.reorderQty`)}
								className="border p-1 rounded w-20"
							/>
						</TableCell>

						<TableCell>
							<input
								type="number"
								{...register(`variants.${idx}.discount`)}
								className="border p-1 rounded w-20"
							/>
						</TableCell>

						<TableCell>
							<input
								type="file"
								{...register(`variants.${idx}.image`)}
								className="border p-1 rounded"
							/>
						</TableCell>

						<TableCell>
							<button
								type="button"
								className="text-red-500"
								onClick={() => {
									remove(idx);
									// onDelete(idx);
								}}>
								Delete
							</button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

// Helper to generate variant combos
function generateVariants(selectedVariants) {
	if (!selectedVariants || selectedVariants.length === 0) return [];
	const attributes = selectedVariants.map((attr) =>
		attr.values.map((v) => ({ name: attr.name, value: v.en })),
	);
	const cartesian = (arr) =>
		arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [[]]);
	return cartesian(attributes).map((combo) => ({
		name: combo.map((c) => `${c.name}: ${c.value}`).join(", "),
		combo,
	}));
}
