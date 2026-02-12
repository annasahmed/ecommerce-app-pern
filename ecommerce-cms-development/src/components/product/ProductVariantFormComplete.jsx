// use this for product variants later
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import ImageSelectorField from "../form/fields/ImageSelectorField";
import InputAreaField from "../form/fields/InputAreaField";
import InputSelectField from "../form/fields/InputSelectField";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import { useEffect, useState } from "react";
import AttributeServices from "@/services/AttributeServices";
import InputMultipleSelectField from "../form/fields/InputMultipleSelectField";
import { IfMultiBranch } from "../IfMultiBranch";
import VariantTable from "./VariantTable";
import { useGlobalSettings } from "@/context/GlobalSettingsContext";

const tempShowingTranslateValue = (data) => {
	if (!data) return "";
	return data["en"] ?? "";
	return (data) => {
		if (!data || typeof data !== "object") return ""; // Handle undefined or non-object cases
	};
};

function transformProductForEdit(product, settings) {
	// if (!product) return {};
	let defaultValues = {};
	let attributes = [];
	const variantDetails = product?.map((v, i) => {
		const branchData = v.branches?.[0].pvb;
		const attributeValue = v.attributes?.map((attr) => {
			const foundIndex = attributes.findIndex(
				(variant) => variant.id === attr.id,
			);
			if (foundIndex !== -1) {
				const updated = [...attributes];
				const exist = updated[foundIndex].values.some(
					(item) => item.en === attr.pva?.value?.en,
				);
				if (!exist) {
					updated[foundIndex].values.push(attr.pva?.value);
				}
				// updated[foundIndex] = {
				// 	...updated[foundIndex],
				// 	values: updated[foundIndex].values.some(
				// 		(item) => item.en === attr.pva?.value?.en,
				// 	)
				// 		? updated[foundIndex].values
				// 		: updated[foundIndex].values.push(attr.pva?.value),
				// };
				attributes = updated;
				return updated;
			} else {
				const newAdded = [
					...attributes,
					{
						id: attr.id,
						name: tempShowingTranslateValue(attr.name),
						values: [attr.pva?.value],
					},
				];
				attributes = newAdded;
				return newAdded;
			}
			return {
				id: attr.id,
				name: showingTranslateValue(attr.name),
				values: attr.pva?.value,
			};
		});

		if (i === 0) {
			defaultValues = {
				costPrice: branchData.cost_price,
				salePrice: branchData.sale_price,
				stock: branchData.stock,
				lowStock: branchData.low_stock,
				reorderQty: branchData.reorder_quantity,
				discount: branchData.discount_percentage,
				imageId: v.image,
				imageUrl: v.medium?.url
					? import.meta.env.VITE_APP_CLOUDINARY_URL + v.medium?.url
					: null,
			};
		}

		return {
			sku: v.sku,
			imageId: v.image,
			imageUrl: v.medium?.url
				? import.meta.env.VITE_APP_CLOUDINARY_URL + v.medium?.url
				: null,
			costPrice: branchData.cost_price,
			stock: branchData.stock,
			lowStock: branchData.low_stock,
			reorderQty: branchData.reorder_quantity,
			salePrice: branchData.sale_price,
			discount: branchData.discount_percentage,
			combo: v.attributes?.map((c) => {
				return {
					id: c.id,
					value: c.pva?.value,
				};
			}),
			name: v.attributes
				?.map((c) => {
					return `${c.name["en"]}:${c.pva.value["en"]}`;
				})
				.join(", "),
		};
	});
	return { variantDetails, defaultValues, attributes };
	// generatedVariants
	const pvArr = product.product_variants || [];
	// 🧩 Transform variants from API → finalVariants
	const finalVariants = pvArr.map((v) => {
		const branch = v.branches?.[0]?.pvb || {};
		return {
			id: v.id,
			sku: v.sku,
			imageId: v.image || null,
			imageUrl: v.medium?.url || null,
			costPrice: branch.cost_price ?? "",
			salePrice: branch.sale_price ?? "",
			stock: branch.stock ?? "",
			lowStock: branch.low_stock ?? "",
			reorderQty: branch.reorder_quantity ?? "",
			discount: branch.discount_percentage ?? "",
			combo: v.attributes?.map((attr) => ({
				id: attr.id,
				name: attr.name.en,
				value: attr.pva?.value?.en || "",
			})),
		};
	});

	// 🧩 Prepare base values for the "Inventory Information" section
	const baseBranch = product?.product_variants?.[0]?.branches?.[0]?.pvb || {};

	// const defaultValues = {
	// 	costPrice: baseBranch.cost_price ?? "",
	// 	salePrice: baseBranch.sale_price ?? "",
	// 	stock: baseBranch.stock ?? "",
	// 	lowStock: baseBranch.low_stock ?? "",
	// 	reorderQty: baseBranch.reorder_quantity ?? "",
	// 	discount: baseBranch.discount_percentage ?? "",
	// 	imageId: product.image || null,
	// 	imageUrl: product.medium?.url || null,
	// };

	// 🧩 Extract attribute list to preselect in multi-selects
	// const selectedAttributes = pvArr?.map((product) => {
	// 	return product.attributes?.map((attr) => ({
	// 		id: attr.id,
	// 		name: attr.name.en,
	// 		values: attr.values || [],
	// 	}));
	// });

	// 🧩 Extract selectedVariants (attribute id + values)
	// const selectedVariants = pvArr?.map((product) => {
	// 	product.attributes?.map((attr) => ({
	// 		id: attr.id,
	// 		name: attr.name.en,
	// 		values: attr.values || [],
	// 	}));
	// });

	return {
		finalVariants,
		defaultValues,
		selectedAttributes,
		selectedVariants,
		selectedImage: product.image || null,
		selectedImageUrl: product.medium?.url || null,
	};
}

const ProductVariantForm = ({
	variantFields,
	appendVariant,
	removeVariant,
	errors,
	register,
	branches,
	setValue,
	variantImages,
	variantImageUrls,
	setVariantImages,
	setVariantImageUrls,
	hasVariants,
	productVariants,
	setProductVariants,
	setVariantsToSend,
	defaultValues,
	setDefaultValues,
	finalVariants,
	setFinalVariants,
}) => {
	const { t } = useTranslation();
	const { showingTranslateValue } = useUtilsFunction();
	const { settings } = useGlobalSettings();

	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedImageUrl, setSelectedImageUrl] = useState(null);

	const [attributes, setAttribtes] = useState([]);
	const [selectedAttriutes, setSelectedAttriutes] = useState();
	const [selectedVariants, setSelectedVariants] = useState([]);

	const [generatedVariants, setGeneratedVariants] = useState([]);

	useEffect(() => {
		AttributeServices.getAllAttributes().then((v) => setAttribtes(v.records));
	}, []);
	useEffect(() => {
		setDefaultValues((prev) => ({
			...prev,
			imageId: selectedImage,
			imageUrl: selectedImageUrl,
		}));
	}, [selectedImage, selectedImageUrl]);

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
	const [defaultVariants, setDefaultVariants] = useState([]);

	useEffect(() => {
		const { variantDetails, defaultValues, attributes } =
			transformProductForEdit(productVariants);

		setDefaultVariants(attributes);
		setGeneratedVariants(variantDetails);
		setDefaultValues({
			...defaultValues,
		});
		setSelectedImage(defaultValues.imageId);
		setSelectedImageUrl(defaultValues.imageUrl);
	}, [productVariants]);

	useEffect(() => {
		if (selectedVariants.length > 0) {
			setGeneratedVariants(generateVariants(selectedVariants));
		}
	}, [selectedVariants]);
	return (
		<section className="flex flex-col gap-8">
			{/* Inventory Information */}
			{/* <section className="w-full relative p-6 rounded-lg border">
				<h3 className="font-semibold text-2xl h3 mb-4">
					Inventory Information
				</h3>
				<div className="grid grid-cols-2 gap-x-16 gap-y-6 items-end">
					<InputAreaField
						label={t("CostPrice")}
						required
						register={register}
						inputLabel="cost_price"
						inputName="base.cost_price"
						inputType="number"
						defaultValue={defaultValues?.costPrice}
						onChange={(e) =>
							setDefaultValues((prev) => ({
								...prev,
								costPrice: e.target.value,
							}))
						}
						isVertical
					/>
					<InputAreaField
						label={t("SalePrice")}
						required
						register={register}
						inputLabel="sale_price"
						inputName="base.sale_price"
						inputType="number"
						defaultValue={defaultValues?.salePrice}
						onChange={(e) =>
							setDefaultValues((prev) => ({
								...prev,
								salePrice: e.target.value,
							}))
						}
						isVertical
					/>
					<InputAreaField
						label={t("Stock")}
						required
						register={register}
						inputLabel="stock"
						inputName="base.stock"
						inputType="number"
						defaultValue={defaultValues?.stock}
						onChange={(e) =>
							setDefaultValues((prev) => ({ ...prev, stock: e.target.value }))
						}
						isVertical
					/>
					<InputAreaField
						label={t("LowStock")}
						register={register}
						inputLabel="low_stock"
						inputName="base.low_stock"
						inputType="number"
						defaultValue={defaultValues?.lowStock}
						onChange={(e) =>
							setDefaultValues((prev) => ({
								...prev,
								lowStock: e.target.value,
							}))
						}
						isVertical
					/>
					<InputAreaField
						label={t("ReorderQuantity")}
						register={register}
						inputLabel="reorder_quantity"
						inputName="base.reorder_quantity"
						inputType="number"
						defaultValue={defaultValues?.reorderQty}
						onChange={(e) =>
							setDefaultValues((prev) => ({
								...prev,
								reorderQty: e.target.value,
							}))
						}
						isVertical
					/>
					<InputAreaField
						label={t("DiscountPercentage")}
						register={register}
						inputLabel="discount"
						inputName="base.discount"
						inputType="number"
						defaultValue={defaultValues?.discount}
						onChange={(e) =>
							setDefaultValues((prev) => ({
								...prev,
								discount: e.target.value,
							}))
						}
						isVertical
					/>
					{hasVariants && (
						<ImageSelectorField
							label={t("VariantImage")}
							selectedImage={selectedImage}
							setSelectedImage={setSelectedImage}
							selectedImageUrl={selectedImageUrl}
							setSelectedImageUrl={setSelectedImageUrl}
							isVertical
							className="col-span-2"
						/>
					)}
				</div>
			</section> */}

			{/* Variants Section */}
			{hasVariants && (
				<section className="w-full relative p-6 rounded-lg border">
					<h3 className="font-semibold text-2xl h3 mb-4">Variants</h3>
					<div className="grid grid-cols-1 gap-x-16 gap-y-6 items-end">
						<InputMultipleSelectField
							label={t("SelectAttributes")}
							inputPlaceholder={t("SelectAttributes")}
							options={attributes?.map((pCat) => ({
								id: pCat.id,
								values: pCat.values,
								name: showingTranslateValue(pCat.name),
							}))}
							onChange={(selectedList) => {
								setSelectedAttriutes(selectedList);
							}}
							isHandleChange={false}
							isVertical
						/>
					</div>

					<div className="grid grid-cols-2 gap-x-16 gap-y-6 items-end mt-8">
						{/* {selectedAttriutes?.map((v, i) => { */}
						{attributes?.map((v, i) => {
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
												?.values?.map((val) => val.en)
												.includes(opt.name);
										})}
									// defaultSelected={{
									// 	id: {
									// 		en: "L",
									// 	},
									// 	name: "L",
									// }}
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

					{selectedVariants && selectedVariants.length > 0 && (
						<Button
							className="mt-8"
							onClick={() => {
								setGeneratedVariants(generateVariants(selectedVariants));
							}}>
							{t("GenerateVariants")}
						</Button>
					)}

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
			)}
			{/* For debugging final output */}
			{generatedVariants && generatedVariants.length > 0 && (
				<pre className="bg-gray-100 p-4 mt-6 rounded">
					{JSON.stringify(finalVariants, null, 2)}
				</pre>
			)}
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

const product = {
	obj: [
		{
			sku: "101317",
			meta_title: "KIDZO BABY NIGHT SUITS FLORAL PRINT BROWN 12-18M | kidzo",
			meta_description:
				"Kidzo Floral Brown Night Suit 12-18M. Cozy and stylish floral print sleepwear for a peaceful night.",
			base_price: 1810,
			base_discount_percentage: null,
			images: [],
			translations: [
				{
					title: "KIDZO BABY NIGHT SUITS FLORAL PRINT BROWN",
					slug: "kidzo-baby-night-suits-floral-print-brown",
					excerpt:
						"Sweet brown floral print night suit by Kidzo, perfect for a cozy 12-18M sleep.",
					description:
						"<p>This 12-18M brown floral print night suit by Kidzo is made from soft, breathable fabric for a restful sleep. The two-piece set features a comfortable waistband and a relaxed fit, ensuring your toddler stays snug all night long.\r\nKey Features</p>\n<p><strong>Key Features</strong></p>\n<ul>\n  <li>Floral Print, Brown, 12-18M</li>\n</ul>",
					language_id: 1,
				},
			],
			variants: [
				{
					sku: "101317",
					branch_data: [
						{
							branch_id: 1,
							cost_price: 1810,
							stock: 100,
							low_stock: 100,
							reorder_quantity: 100,
							sale_price: 1810,
							discount_percentage: null,
						},
					],
					attribute_data: [
						{
							attribute_id: 8,
							value: {
								en: "12-18m",
								type: "baby",
							},
						},
						{
							attribute_id: 7,
							value: {
								en: "pink",
							},
						},
					],
				},
				{
					sku: "101318",
					branch_data: [
						{
							branch_id: 1,
							cost_price: 1810,
							stock: 100,
							low_stock: 100,
							reorder_quantity: 100,
							sale_price: 1810,
							discount_percentage: null,
						},
					],
					attribute_data: [
						{
							attribute_id: 8,
							value: {
								en: "18-24m",
								type: "baby",
							},
						},
						{
							attribute_id: 7,
							value: {
								en: "pink",
							},
						},
					],
				},
				{
					sku: "101321",
					branch_data: [
						{
							branch_id: 1,
							cost_price: 1810,
							stock: 100,
							low_stock: 100,
							reorder_quantity: 100,
							sale_price: 1810,
							discount_percentage: null,
						},
					],
					attribute_data: [
						{
							attribute_id: 8,
							value: {
								en: "2-3y",
								type: "baby",
							},
						},
						{
							attribute_id: 7,
							value: {
								en: "pink",
							},
						},
					],
				},
				{
					sku: "101320",
					branch_data: [
						{
							branch_id: 1,
							cost_price: 1810,
							stock: 100,
							low_stock: 100,
							reorder_quantity: 100,
							sale_price: 1810,
							discount_percentage: null,
						},
					],
					attribute_data: [
						{
							attribute_id: 8,
							value: {
								en: "3-4y",
								type: "baby",
							},
						},
						{
							attribute_id: 7,
							value: {
								en: "pink",
							},
						},
					],
				},
			],
			categories: ["Nightsuit"],
			brand_id: "Kidzo",
			is_featured: false,
			status: true,
		},
	],
};
