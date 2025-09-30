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
}) => {
	const { t } = useTranslation();
	const { showingTranslateValue } = useUtilsFunction();

	const [attributes, setAttribtes] = useState([]);
	const [selectedAttriutes, setSelectedAttriutes] = useState();
	const [selectedVariants, setSelectedVariants] = useState([]);
	const [defaultValues, setDefaultValues] = useState({
		costPrice: "",
		salePrice: "",
		stock: "",
		lowStock: "",
		reorderQty: "",
		discount: "",
		image: "",
	});
	const [finalVariants, setFinalVariants] = useState([]);

	useEffect(() => {
		AttributeServices.getAllAttributes().then((v) => setAttribtes(v.records));
	}, []);

	const handleDeleteVariant = (idx) => {
		setFinalVariants((prev) => prev.filter((_, i) => i !== idx));
	};

	const handleVariantsUpdate = (variants) => {
		setFinalVariants(variants);
	};

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
					/>
				</div>
			</section>

			{/* Variants Section */}
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
					<Button className="mt-8">{t("GenerateVariants")}</Button>
				)}

				{/* Variants Table */}
				<div>
					<VariantTable
						selectedVariants={selectedVariants}
						defaultValues={defaultValues}
						onDelete={handleDeleteVariant}
						onUpdate={handleVariantsUpdate} // 🔑 so parent always has final values
					/>
				</div>
			</section>

			{/* For debugging final output */}
			<pre className="bg-gray-100 p-4 mt-6 rounded">
				{JSON.stringify(finalVariants, null, 2)}
			</pre>
		</section>
	);
};

export default ProductVariantForm;
