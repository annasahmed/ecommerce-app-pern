import React from "react";
import InputAreaField from "../form/fields/InputAreaField";
import InputMultipleSelectField from "../form/fields/InputMultipleSelectField";
import TranslationFields from "../newComponents/TranslationFields";
import ImageSelectorField from "../form/fields/ImageSelectorField";
import InputSelectField from "../form/fields/InputSelectField";
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import SwitchToggleField from "../form/fields/SwitchToggleField";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import { useGlobalSettings } from "@/context/GlobalSettingsContext";

const ProductInfoForm = ({
	variantFields,
	appendVariant,
	removeVariant,
	errors,
	control,
	register,
	usps,
	categories,
	vendors,
	branches,
	setValue,
	selectedUsps,
	selectedCategories,
	selectedVendors,
	selectedThumbnail,
	setSelectedThumbnail,
	selectedThumbnailUrl,
	setSelectedThumbnailUrl,
	isFeatured,
	setIsFeatured,
	status,
	setStatus,
	translationFields,
	variantImages,
	variantImageUrls,
	hasVariants,
	setHasVariants,
}) => {
	const { t } = useTranslation();
	const { showingTranslateValue } = useUtilsFunction();
	const { settings } = useGlobalSettings();

	return (
		<div className="flex-grow scrollbar-hide flex flex-col gap-8 w-full max-h-full">
			{!settings.isMultiLingual && (
				<section className={`w-full relative p-6 rounded-lg border`}>
					<h3 className="font-semibold text-2xl h3 mb-4">Basic Information</h3>
					<TranslationFields
						control={control}
						register={register}
						translationFields={translationFields}
						errors={errors}
					/>
				</section>
			)}
			<section className={`w-full relative p-6 rounded-lg border`}>
				<h3 className="font-semibold text-2xl h3 mb-4">Product Settings</h3>
				<div className="grid grid-cols-2 gap-x-16 gap-y-6 items-end">
					<InputAreaField
						label={t("Sku")}
						required={true}
						register={register}
						inputLabel="sku"
						inputName="sku"
						inputType="text"
						inputPlaceholder={t("ProductSkuPlaceholder")}
						errorName={errors.sku}
						isVertical
					/>
					<InputMultipleSelectField
						label={t("SelectCategories")}
						inputName="categories"
						inputPlaceholder={t("SelectCategories")}
						options={categories?.map((pCat) => ({
							id: pCat.id,
							name: showingTranslateValue(pCat?.title),
						}))}
						setValue={setValue}
						errorName={errors.categories}
						defaultSelected={selectedCategories}
						isVertical
					/>
					<InputMultipleSelectField
						label={t("SelectUsp")}
						inputName="usps"
						inputPlaceholder={t("SelectUsp")}
						options={usps?.map((pCat) => ({
							id: pCat.id,
							name: showingTranslateValue(pCat?.title),
						}))}
						setValue={setValue}
						errorName={errors.usps}
						defaultSelected={selectedUsps}
						isVertical
					/>
					<InputMultipleSelectField
						label={t("SelectVendor")}
						inputName="vendors"
						inputPlaceholder={t("SelectVendor")}
						options={vendors?.map((pCat) => ({
							id: pCat.id,
							// name: pCat.id,
							name: showingTranslateValue(pCat?.name),
						}))}
						setValue={setValue}
						errorName={errors.vendors}
						defaultSelected={selectedVendors}
						isVertical
					/>

					<InputAreaField
						label={t("BasePrice")}
						required
						register={register}
						inputLabel="base_price"
						inputName={`base_price`}
						inputType="number"
						inputPlaceholder={t("BasePrice")}
						errorName={errors?.base_price}
						isVertical
					/>
					<InputAreaField
						label={t("BaseDiscountPercentage")}
						register={register}
						inputLabel="base_discount_percentage"
						inputName={`base_discount_percentage`}
						inputType="number"
						inputPlaceholder={t("BaseDiscountPercentage")}
						errorName={errors?.base_discount_percentage}
						isVertical
					/>
					<div>
						<SwitchToggleField
							label={t("HasVariants")}
							handleProcess={setHasVariants}
							processOption={hasVariants}
						/>
						<SwitchToggleField
							label={t("IsFeatured")}
							handleProcess={setIsFeatured}
							processOption={isFeatured}
						/>
						<SwitchToggleField
							label={t("Status")}
							handleProcess={setStatus}
							processOption={status}
						/>
					</div>
				</div>
			</section>
			<section className={`w-full relative p-6 rounded-lg border`}>
				<h3 className="font-semibold text-2xl h3 mb-4">Product Media</h3>
				<div className="grid grid-cols-1 gap-x-16 gap-y-6 items-end">
					<ImageSelectorField
						required
						label={t("Thumbnail")}
						selectedImage={selectedThumbnail}
						setSelectedImage={setSelectedThumbnail}
						selectedImageUrl={selectedThumbnailUrl}
						setSelectedImageUrl={setSelectedThumbnailUrl}
						isVertical
					/>
					<ImageSelectorField
						required
						label={t("Images")}
						selectedImage={selectedThumbnail}
						setSelectedImage={setSelectedThumbnail}
						selectedImageUrl={selectedThumbnailUrl}
						setSelectedImageUrl={setSelectedThumbnailUrl}
						isVertical
					/>
				</div>
			</section>
			<section className={`w-full relative p-6 rounded-lg border`}>
				<h3 className="font-semibold text-2xl h3 mb-4">SEO Information</h3>
				<div className="grid grid-cols-2 gap-x-16 gap-y-6 items-end">
					<InputAreaField
						label={t("MetaTitle")}
						required={true}
						register={register}
						inputLabel="meta_title"
						inputName="meta_title"
						inputType="text"
						inputPlaceholder={t("ProductMetaTitlePlaceholder")}
						errorName={errors.meta_title}
						isVertical
					/>
					<InputAreaField
						label={t("MetaDescription")}
						required={true}
						register={register}
						inputLabel="meta_description"
						inputName="meta_description"
						inputType="text"
						inputPlaceholder={t("ProductMetaDescriptionPlaceholder")}
						errorName={errors.meta_description}
						isVertical
					/>
				</div>
			</section>
			{/* Product Fields */}
			<div>
				<InputAreaField
					label={t("Sku")}
					required={true}
					register={register}
					inputLabel="sku"
					inputName="sku"
					inputType="text"
					inputPlaceholder={t("ProductSkuPlaceholder")}
					errorName={errors.sku}
				/>

				<InputMultipleSelectField
					label={t("SelectCategories")}
					inputName="categories"
					inputPlaceholder={t("SelectCategories")}
					options={categories?.map((pCat) => ({
						id: pCat.id,
						name: showingTranslateValue(pCat?.title),
					}))}
					setValue={setValue}
					errorName={errors.categories}
					defaultSelected={selectedCategories}
				/>
				<InputMultipleSelectField
					label={t("SelectUsp")}
					inputName="usps"
					inputPlaceholder={t("SelectUsp")}
					options={usps?.map((pCat) => ({
						id: pCat.id,
						name: showingTranslateValue(pCat?.title),
					}))}
					setValue={setValue}
					errorName={errors.usps}
					defaultSelected={selectedUsps}
				/>
				<InputMultipleSelectField
					label={t("SelectVendor")}
					inputName="vendors"
					inputPlaceholder={t("SelectVendor")}
					options={vendors?.map((pCat) => ({
						id: pCat.id,
						// name: pCat.id,
						name: showingTranslateValue(pCat?.name),
					}))}
					setValue={setValue}
					errorName={errors.vendors}
					defaultSelected={selectedVendors}
				/>

				<InputAreaField
					label={t("MetaTitle")}
					required={true}
					register={register}
					inputLabel="meta_title"
					inputName="meta_title"
					inputType="text"
					inputPlaceholder={t("ProductMetaTitlePlaceholder")}
					errorName={errors.meta_title}
				/>
				<InputAreaField
					label={t("MetaDescription")}
					required={true}
					register={register}
					inputLabel="meta_description"
					inputName="meta_description"
					inputType="text"
					inputPlaceholder={t("ProductMetaDescriptionPlaceholder")}
					errorName={errors.meta_description}
				/>
				<SwitchToggleField
					label={t("IsFeatured")}
					handleProcess={setIsFeatured}
					processOption={isFeatured}
				/>
				<SwitchToggleField
					label={t("Status")}
					handleProcess={setStatus}
					processOption={status}
				/>
			</div>

			{/* Translation */}
			<TranslationFields
				control={control}
				errors={errors}
				register={register}
				translationFields={translationFields}
			/>

			{/* Variants */}
			<div>
				<h3 className="text-xl font-semibold mt-4">{t("Variants")}</h3>
				{variantFields.map((field, index) => (
					<div key={field.id} className="border p-4 rounded mt-2 space-y-2">
						<InputAreaField
							label={t("Sku")}
							register={register}
							inputLabel="sku"
							inputName={`variants.${index}.sku`}
							inputType="text"
							inputPlaceholder={t("ProductVariantSkuPlaceholder")}
							errorName={errors?.variants?.[index]?.sku}
						/>

						{/* Image Selector */}
						<ImageSelectorField
							required
							label={t("Image")}
							selectedImage={variantImages[index] || null}
							setSelectedImage={(img) => {
								setVariantImages((prev) => ({ ...prev, [index]: img }));
								setValue(`variants.${index}.image`, img); // store in react-hook-form
							}}
							selectedImageUrl={variantImageUrls[index] || null}
							setSelectedImageUrl={(url) => {
								setVariantImageUrls((prev) => ({
									...prev,
									[index]: url,
								}));
							}}
						/>
						{errors?.variants?.[index]?.image && (
							<Error errorName={errors.variants[index].image} />
						)}

						<InputAreaField
							label={t("Size")}
							register={register}
							inputLabel="size"
							inputName={`variants.${index}.attributes.size`}
							inputType="text"
							inputPlaceholder={t("ProductVariantSizePlaceholder")}
							errorName={errors?.variants?.[index]?.attributes?.size}
						/>

						<InputAreaField
							label={t("Color")}
							register={register}
							inputLabel="color"
							inputName={`variants.${index}.attributes.color`}
							inputType="text"
							inputPlaceholder={t("ProductVariantColorPlaceholder")}
							errorName={errors?.variants?.[index]?.attributes?.color}
						/>

						{/* Branch Data */}
						<div className="mt-4">
							<h4 className="font-semibold">{t("BranchData")}</h4>
							<div className="space-y-2">
								<InputSelectField
									label={t("BranchId")}
									required
									register={register}
									inputLabel={t("branch")}
									inputName={`variants.${index}.branch_data.0.branch_id`}
									inputPlaceholder={t("ProductVariantBranchIdPlaceholder")}
									options={branches?.map((pCat, index) => {
										return (
											<option value={pCat.id} key={index}>
												{showingTranslateValue(pCat?.name)}
											</option>
										);
									})}
									errorName={
										errors?.variants?.[index]?.branch_data?.[0]?.branch_id
									}
								/>
								<InputAreaField
									label={t("CostPrice")}
									required
									register={register}
									inputLabel="cost_price"
									inputName={`variants.${index}.branch_data.0.cost_price`}
									inputType="number"
									inputPlaceholder={t("ProductVariantCostPricePlaceholder")}
									errorName={
										errors?.variants?.[index]?.branch_data?.[0]?.cost_price
									}
								/>
								<InputAreaField
									label={t("SalePrice")}
									required
									register={register}
									inputLabel="sale_price"
									inputName={`variants.${index}.branch_data.0.sale_price`}
									inputType="number"
									inputPlaceholder={t("ProductVariantSalePricePlaceholder")}
									errorName={
										errors?.variants?.[index]?.branch_data?.[0]?.sale_price
									}
								/>
								<InputAreaField
									label={t("Stock")}
									required
									register={register}
									inputLabel="stock"
									inputName={`variants.${index}.branch_data.0.stock`}
									inputType="number"
									inputPlaceholder={t("ProductVariantStockPlaceholder")}
									errorName={errors?.variants?.[index]?.branch_data?.[0]?.stock}
								/>
								<InputAreaField
									label={t("LowStock")}
									register={register}
									inputLabel="low_stock"
									inputName={`variants.${index}.branch_data.0.low_stock`}
									inputType="number"
									inputPlaceholder={t("ProductVariantLowStockPlaceholder")}
									errorName={
										errors?.variants?.[index]?.branch_data?.[0]?.low_stock
									}
								/>
								<InputAreaField
									label={t("ReorderQuantity")}
									register={register}
									inputLabel="reorder_quantity"
									inputName={`variants.${index}.branch_data.0.reorder_quantity`}
									inputType="number"
									inputPlaceholder={t(
										"ProductVariantReorderQuantityPlaceholder",
									)}
									errorName={
										errors?.variants?.[index]?.branch_data?.[0]
											?.reorder_quantity
									}
								/>
								<InputAreaField
									label={t("DiscountPercentage")}
									register={register}
									inputLabel="discount"
									inputName={`variants.${index}.branch_data.0.discount_percentage`}
									inputType="number"
									inputPlaceholder={t("ProductVariantDiscountPlaceholder")}
									errorName={
										errors?.variants?.[index]?.branch_data?.[0]
											?.discount_percentage
									}
								/>
							</div>
						</div>

						<Button
							layout="outline"
							onClick={() => removeVariant(index)}
							className="mt-2">
							{t("RemoveVariant")}
						</Button>
					</div>
				))}

				<Button
					onClick={() =>
						appendVariant({
							sku: null,
							attributes: {},
							image: null,
							branch_data: [
								{
									branch_id: null,
									cost_price: null,
									stock: null,
									low_stock: null,
									reorder_quantity: null,
									sale_price: null,
									discount_percentage: null,
								},
							],
						})
					}
					className="mt-2">
					{t("AddVariant")}
				</Button>
			</div>
		</div>
	);
};

export default ProductInfoForm;
