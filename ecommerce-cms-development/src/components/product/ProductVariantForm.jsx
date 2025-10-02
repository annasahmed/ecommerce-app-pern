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
}) => {
	const { t } = useTranslation();
	const { showingTranslateValue } = useUtilsFunction();
	const { defaultBranchId } = useGlobalSettings();

	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedImageUrl, setSelectedImageUrl] = useState(null);

	const [attributes, setAttribtes] = useState([]);
	const [selectedAttriutes, setSelectedAttriutes] = useState();
	const [selectedVariants, setSelectedVariants] = useState([]);
	const [defaultValues, setDefaultValues] = useState({
		costPrice: null,
		salePrice: null,
		stock: null,
		lowStock: null,
		reorderQty: null,
		discount: null,
		imageId: null,
		imageUrl: null,
	});
	const [finalVariants, setFinalVariants] = useState([]);
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
						branch_id: defaultBranchId,
						cost_price: v.costPrice ? parseFloat(v.costPrice) : null,
						stock: v.stock ? parseInt(v.stock) : null,
						low_stock: v.lowStock ? parseInt(v.lowStock) : null,
						reorder_quantity: v.reorderQty ? parseInt(v.reorderQty) : null,
						sale_price: v.salePrice ? parseFloat(v.salePrice) : null,
						discount_percentage: v.discount ? parseFloat(v.discount) : null,
					},
				],
        attribute_data:[]
			};
		});
	}, [finalVariants]);

	return (
		<section className="flex flex-col gap-8">
			{/* Inventory Information */}
			<section className="w-full relative p-6 rounded-lg border">
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
						onChange={(e) =>
							setDefaultValues((prev) => ({
								...prev,
								discount: e.target.value,
							}))
						}
						isVertical
					/>
					<ImageSelectorField
						label={t("VariantImage")}
						selectedImage={selectedImage}
						setSelectedImage={setSelectedImage}
						selectedImageUrl={selectedImageUrl}
						setSelectedImageUrl={setSelectedImageUrl}
						isVertical
						className="col-span-2"
					/>
				</div>
			</section>

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
						{selectedAttriutes?.map((v, i) => {
							return (
								<InputMultipleSelectField
									key={v.id}
									label={`Select available ${v.name}:`}
									inputPlaceholder={`Select available ${v.name}`}
									options={v.values?.map((pCat) => ({
										id: pCat,
										name: showingTranslateValue(pCat),
									}))}
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
														name: v.name,
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
function generateVariants(selectedVariants, baseSKU = "SKU") {
	if (!selectedVariants || selectedVariants.length === 0) return [];

	const attributes = selectedVariants.map((attr) =>
		attr.values.map((v) => ({ name: attr.name, value: v.en })),
	);

	// Cartesian product helper
	const cartesian = (arr) =>
		arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [[]]);

	return cartesian(attributes).map((combo, idx) => {
		// Build a short code from the first 3 letters of each value
		const shortCode = combo
			.map((c) => c.value.replace(/\s+/g, "").substring(0, 1).toUpperCase())
			.join("-");

		return {
			name: combo.map((c) => `${c.name}: ${c.value}`).join(", "),
			combo,
			sku: `${baseSKU}-${shortCode}-${idx + 1}`,
		};
	});
}
