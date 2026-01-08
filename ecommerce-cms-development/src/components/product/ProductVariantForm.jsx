import { useGlobalSettings } from "@/context/GlobalSettingsContext";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import AttributeServices from "@/services/AttributeServices";
import { useEffect, useState } from "react";
import InputMultipleSelectField from "../form/fields/InputMultipleSelectField";
import VariantTable from "./VariantTable";

const tempShowingTranslateValue = (data) => {
	if (!data) return "";
	return data["en"] ?? "";
	return (data) => {
		if (!data || typeof data !== "object") return ""; // Handle undefined or non-object cases
	};
};

function transformProductForEdit(product = [], settings) {
	if (!product.length) {
		return { variantDetails: [], defaultValues: {}, attributes: [] };
	}

	const attributesMap = new Map();
	let defaultValues = {};

	const variantDetails = product.map((v, index) => {
		const branchData = v.branches?.[0]?.pvb ?? {};

		// Build attributes
		v.attributes?.forEach((attr) => {
			if (!attributesMap.has(attr.id)) {
				attributesMap.set(attr.id, {
					id: attr.id,
					name: tempShowingTranslateValue(attr.name),
					values: [],
				});
			}

			const attrEntry = attributesMap.get(attr.id);
			const valueEn = attr.pva?.value?.en;

			if (valueEn && !attrEntry.values.some((val) => val.en === valueEn)) {
				attrEntry.values.push(attr.pva.value);
			}
		});

		// Set default values once (from first variant)
		if (index === 0) {
			defaultValues = {
				costPrice: branchData.cost_price ?? null,
				salePrice: branchData.sale_price ?? null,
				stock: branchData.stock ?? null,
				lowStock: branchData.low_stock ?? null,
				reorderQty: branchData.reorder_quantity ?? null,
				discount: branchData.discount_percentage ?? null,
				imageId: v.image ?? null,
				imageUrl: v.medium?.url
					? import.meta.env.VITE_APP_CLOUDINARY_URL + v.medium.url
					: null,
			};
		}

		return {
			sku: v.sku,
			imageId: v.image,
			imageUrl: v.medium?.url
				? import.meta.env.VITE_APP_CLOUDINARY_URL + v.medium.url
				: null,
			costPrice: branchData.cost_price ?? null,
			stock: branchData.stock ?? null,
			lowStock: branchData.low_stock ?? null,
			reorderQty: branchData.reorder_quantity ?? null,
			salePrice: branchData.sale_price ?? null,
			discount: branchData.discount_percentage ?? null,
			combo:
				v.attributes?.map((c) => ({
					id: c.id,
					value: c.pva?.value,
				})) ?? [],
			name:
				v.attributes
					?.map((c) => `${c.name?.en}:${c.pva?.value?.en}`)
					.join(", ") ?? "",
		};
	});

	return {
		variantDetails,
		defaultValues,
		attributes: Array.from(attributesMap.values()),
	};
}

const ProductVariantForm = ({
	productVariants,
	setVariantsToSend,
	defaultValues,
	setDefaultValues,
	finalVariants,
	setFinalVariants,
	resetKey,
}) => {
	const { showingTranslateValue } = useUtilsFunction();
	const { settings } = useGlobalSettings();

	const [attributes, setAttribtes] = useState([]);
	const [selectedVariants, setSelectedVariants] = useState([]);
	const [defaultVariants, setDefaultVariants] = useState([]);
	const [generatedVariants, setGeneratedVariants] = useState([]);

	useEffect(() => {
		AttributeServices.getAllAttributes().then((v) => setAttribtes(v.records));
	}, []);

	const handleDeleteVariant = (idx) => {
		setFinalVariants((prev) => prev.filter((_, i) => i !== idx));
	};

	const handleVariantsUpdate = (variants) => {
		setFinalVariants(variants);
	};

	useEffect(() => {
		const tempArr = finalVariants?.map((v) => {
			return {
				sku: v.sku,
				image: v.imageId,
				branch_data: [
					{
						branch_id: settings.defaultBranchId,
						cost_price: v.costPrice ? parseFloat(v.costPrice) : null,
						stock: 100,
						low_stock: 100,
						reorder_quantity: 100,
						// stock: v.stock ? parseInt(v.stock) : null,
						// low_stock: v.lowStock ? parseInt(v.lowStock) : null,
						// reorder_quantity: v.reorderQty ? parseInt(v.reorderQty) : null,
						sale_price: v.salePrice ? parseFloat(v.salePrice) : null,
						discount_percentage: v.discount ? parseFloat(v.discount) : null,
					},
				],
				attribute_data: v.combo?.map((c) => {
					return {
						attribute_id: c.id,
						value: c.value,
					};
				}),
			};
		});
		setVariantsToSend(tempArr);
	}, [finalVariants]);

	// only for setting defaultValue to attributesInput feild

	useEffect(() => {
		const { variantDetails, defaultValues, attributes } =
			transformProductForEdit(productVariants);
		setDefaultVariants(attributes);
		setGeneratedVariants(variantDetails);
		setDefaultValues({
			...defaultValues,
		});
	}, [productVariants]);

	useEffect(() => {
		if (selectedVariants.length > 0) {
			setGeneratedVariants(generateVariants(selectedVariants));
		}
	}, [selectedVariants]);

	//reset all states after drawer close
	useEffect(() => {
		setSelectedVariants([]);
		setDefaultVariants([]);
		setGeneratedVariants([]);
	}, [resetKey]);

	return (
		<section className="flex flex-col gap-8">
			{/* Variants Section */}
			<section className="w-full relative p-6 rounded-lg border">
				<h3 className="font-semibold text-2xl h3 mb-4">Product Attributes</h3>
				<div className="grid grid-cols-2 gap-x-16 gap-y-6 items-end mt-8">
					{attributes?.slice(2)?.map((v, i) => {
						// remove showingTranslateValue with all v.name later
						return (
							<InputMultipleSelectField
								key={v.id}
								label={`Select available ${showingTranslateValue(v.name)}:`}
								inputPlaceholder={`Select available ${showingTranslateValue(
									v.name,
								)}`}
								options={v.values?.map((pCat) => ({
									id: pCat,
									name: showingTranslateValue(pCat),
								}))}
								defaultSelected={v.values
									?.map((pCat) => ({
										id: pCat,
										name: showingTranslateValue(pCat),
									}))
									.filter((opt) => {
										return defaultVariants
											.find((dv) => dv.id === v.id)
											?.values?.map((val) => val.en?.toLowerCase())
											.includes(opt.name.toLowerCase());
									})}
								onChange={(selectedList) => {
									setSelectedVariants((prev) => {
										const foundIndex = prev.findIndex(
											(variant) => variant.id === v.id,
										);
										if (foundIndex !== -1) {
											const updated = [...prev];
											updated[foundIndex] = {
												...updated[foundIndex],
												values: selectedList.map((v) => v.id),
											};
											return updated;
										} else {
											return [
												...prev,
												{
													id: v.id,
													name: showingTranslateValue(v.name),
													values: selectedList.map((v) => v.id),
												},
											];
										}
									});
								}}
								isHandleChange={false}
								isVertical
							/>
						);
					})}
				</div>

				{/* Variants Table */}
				{generatedVariants && generatedVariants.length > 0 && (
					<div className="mt-8">
						<VariantTable
							selectedVariants={selectedVariants}
							defaultValues={defaultValues}
							onDelete={handleDeleteVariant}
							onUpdate={handleVariantsUpdate}
							generatedVariants={generatedVariants} // 🔑 so parent always has final values
						/>
					</div>
				)}
			</section>
		</section>
	);
};

export default ProductVariantForm;

// Helper to generate variant combos with short meaningful SKUs
export function generateVariants(
	selectedVariants,
	baseSKU = "SKU",
	selectedLanguage = "en",
) {
	if (!selectedVariants || selectedVariants.length === 0) return [];

	const attributes = selectedVariants.map((attr) =>
		attr.values.map((v) => ({
			id: attr.id,
			name: attr.name,
			value: v,
		})),
	);
	// Cartesian product helper
	const cartesian = (arr) =>
		arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [[]]);

	return cartesian(attributes).map((combo, idx) => {
		return {
			name: combo
				.map((c) => `${c.name}: ${c.value[selectedLanguage]}`)
				.join(", "),
			combo,
			sku: `${baseSKU}-${idx + 1}`,
		};
	});
}
