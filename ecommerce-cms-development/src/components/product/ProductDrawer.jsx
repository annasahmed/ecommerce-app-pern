import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import InputArea from "@/components/form/input/InputArea";
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import { SidebarContext } from "@/context/SidebarContext";
import useTranslationValue from "@/hooks/useTranslationValue";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useForm, useFieldArray } from "react-hook-form";
import DrawerHeader from "../newComponents/DrawerHeader";

import { Input, Label, Textarea, Button } from "@windmill/react-ui";
import SwitchToggleField from "../form/fields/SwitchToggleField";
import InputAreaField from "../form/fields/InputAreaField";
import TextAreaField from "../form/fields/TextAreaField";
import ImageSelectorField from "../form/fields/ImageSelectorField";

const ProductDrawer = ({ id, data }) => {
	const { t } = useTranslation();
	const [status, setStatus] = useState(true);
	const [isFeatured, setIsFeatured] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resData, setResData] = useState({});
	const { closeDrawer, setIsUpdate } = useContext(SidebarContext);
	const [selectedThumbnail, setSelectedThumbnail] = useState(null);
	const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState(null);
	const [variantImages, setVariantImages] = useState({});
	const [variantImageUrls, setVariantImageUrls] = useState({});
	const {
		control,
		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			images: [],
			translations: [
				{ title: null, excerpt: null, description: null, language_id: null },
			],
			variants: [
				{
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
				},
			],
		},
	});

	const {
		fields: translationFields,
		append: appendTranslation,
		remove: removeTranslation,
	} = useFieldArray({
		control,
		name: "translations",
	});

	const {
		fields: variantFields,
		append: appendVariant,
		remove: removeVariant,
	} = useFieldArray({
		control,
		name: "variants",
	});

	const { handlerTextTranslateHandler } = useTranslationValue();

	const onSubmit = async (data) => {
		const { name, address, country } = data;

		console.log(data, "chkking data");

		return;

		try {
			setIsSubmitting(true);
			const nameTranslates = await handlerTextTranslateHandler(
				name,
				"en",
				resData?.name,
			);
			const addressTranslates = await handlerTextTranslateHandler(
				address,
				"en",
				resData?.address,
			);
			const countryTranslates = await handlerTextTranslateHandler(
				country,
				"en",
				resData?.country,
			);

			const cleanedData = Object.fromEntries(
				Object.entries(data).filter(([_, value]) => value !== ""),
			);

			const productData = {
				...cleanedData,
				name: {
					...nameTranslates,
					["en"]: name,
				},
				address: {
					...addressTranslates,
					["en"]: address,
				},
				country: {
					...countryTranslates,
					...(country && { ["en"]: country }),
				},
				status,
			};

			if (id) {
				const res = await ProductServices.updateProduct(id, productData);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				closeDrawer();
				reset();
			} else {
				const res = await ProductServices.addProduct(productData);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				closeDrawer();
				reset();
			}
		} catch (err) {
			setIsSubmitting(false);
			notifyError(err ? err?.response?.data?.message : err?.message);
		}
	};

	useEffect(() => {
		if (id) {
			(async () => {
				try {
					const res = await ProductServices.getProductById(id);
					if (res) {
						setResData(res);
						setValue("name", res.name["en"]);
						setValue("address", res.address["en"]);
						setValue("country", res.country && res.country["en"]);
						setValue("phone", res.phone);
						setValue("email", res.email);
						setStatus(res.status || false);
					}
				} catch (err) {
					notifyError(err ? err.response?.data?.message : err.message);
				}
			})();
		} else {
			reset();
		}
	}, [id, setValue, clearErrors, data]);

	return (
		<>
			<DrawerHeader
				id={id}
				register={register}
				updateTitle={t("UpdateProduct")}
				updateDescription={t("UpdateProductDescription")}
				addTitle={t("AddProductTitle")}
				addDescription={t("AddProductDescription")}
			/>

			<Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-customGray-700 dark:text-customGray-200">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
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
							<InputAreaField
								label={t("Slug")}
								required={true}
								register={register}
								inputLabel="slug"
								inputName="slug"
								inputType="text"
								inputPlaceholder={t("ProductSlugPlaceholder")}
								errorName={errors.slug}
							/>
							<ImageSelectorField
								required
								label={t("Thumbnail")}
								selectedImage={selectedThumbnail}
								setSelectedImage={setSelectedThumbnail}
								selectedImageUrl={selectedThumbnailUrl}
								setSelectedImageUrl={setSelectedThumbnailUrl}
							/>
							{/* <InputAreaField
								label={t("Thumbnail")}
								required={true}
								register={register}
								inputLabel="thumbnail"
								inputName="thumbnail"
								inputType="text"
								inputPlaceholder={t("ProductThumbnailPlaceholder")}
								errorName={errors.thumbnail}
							/> */}
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
						{/* Translations */}
						<div>
							<h3 className="text-xl font-semibold mt-4">Translations</h3>
							{translationFields.map((field, index) => (
								<div
									key={field.id}
									className="border p-4 rounded mt-2 space-y-2">
									<InputAreaField
										label={t("Title")}
										required={true}
										register={register}
										inputLabel="title"
										inputName={`translations.${index}.title`}
										inputType="text"
										inputPlaceholder={t("ProductTranslationTitlePlaceholder")}
										errorName={errors[`translations.${index}.title`]}
									/>
									<InputAreaField
										label={t("Excerpt")}
										required={true}
										register={register}
										inputLabel="excerpt"
										inputName={`translations.${index}.excerpt`}
										inputType="text"
										inputPlaceholder={t("ProductTranslationExcerptPlaceholder")}
										errorName={errors[`translations.${index}.excerpt`]}
									/>
									<TextAreaField
										label={t("Description")}
										register={register}
										inputLabel="description"
										inputName={`translations.${index}.description`}
										inputType="text"
										inputPlaceholder={t(
											"ProductTranslationDescriptionPlaceholder",
										)}
										errorName={errors[`translations.${index}.description`]}
									/>
									<InputAreaField
										label={t("Language")}
										required={true}
										register={register}
										inputLabel="language_id"
										inputName={`translations.${index}.language_id`}
										inputType="number"
										inputPlaceholder={t(
											"ProductTranslationLanguagePlaceholder",
										)}
										errorName={errors[`translations.${index}.language_id`]}
									/>
									<Button
										layout="outline"
										onClick={() => removeTranslation(index)}
										className="mt-2">
										{t("RemoveTranslation")}
									</Button>
								</div>
							))}
							<Button
								onClick={() =>
									appendTranslation({
										title: null,
										excerpt: null,
										description: null,
										language_id: null,
									})
								}
								className="mt-2">
								{t("AddTranslation")}
							</Button>
						</div>

						{/* Variants */}
						<div>
							<h3 className="text-xl font-semibold mt-4">Variants</h3>
							{variantFields.map((field, index) => (
								<div
									key={field.id}
									className="border p-4 rounded mt-2 space-y-2">
									<InputAreaField
										label={t("Sku")}
										register={register}
										inputLabel="sku"
										inputName={`variants.${index}.sku`}
										inputType="text"
										inputPlaceholder={t("ProductVariantSkuPlaceholder")}
										errorName={errors[`variants.${index}.sku`]}
									/>
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
									{/* <InputAreaField
										label={t("Image")}
										required={true}
										register={register}
										inputLabel="image"
										inputName={`variants.${index}.image`}
										inputType="text"
										inputPlaceholder={t("ProductVariantImagePlaceholder")}
										errorName={errors[`variants.${index}.image`]}
									/> */}
									<InputAreaField
										label={t("Size")}
										register={register}
										inputLabel="size"
										inputName={`variants.attributes.${index}.size`}
										inputType="text"
										inputPlaceholder={t("ProductVariantSizePlaceholder")}
										errorName={errors[`variants.attributes.${index}.size`]}
									/>
									<InputAreaField
										label={t("Color")}
										register={register}
										inputLabel="color"
										inputName={`variants.attributes.${index}.color`}
										inputType="text"
										inputPlaceholder={t("ProductVariantColorPlaceholder")}
										errorName={errors[`variants.attributes.${index}.color`]}
									/>

									{/* Branch Data */}
									<div className="mt-4">
										<h4 className="font-semibold">{t("BranchData")}</h4>
										<div className="space-y-2">
											<InputAreaField
												label={t("BranchId")}
												required={true}
												register={register}
												inputLabel="branch_id"
												inputName={`variants.branch_data.${index}.branch_id`}
												inputType="text"
												inputPlaceholder={t(
													"ProductVariantBranchIdPlaceholder",
												)}
												errorName={
													errors[`variants.branch_data.${index}.branch_id`]
												}
											/>
											{/* <Label>Branch ID</Label>
											<Input
												{...register(
													`variants.${index}.branch_data.0.branch_id`,
												)}
											/> */}
											<InputAreaField
												label={t("CostPrice")}
												required={true}
												register={register}
												inputLabel="cost_price"
												inputName={`variants.branch_data.${index}.cost_price`}
												inputType="number"
												inputPlaceholder={t(
													"ProductVariantCostPricePlaceholder",
												)}
												errorName={
													errors[`variants.branch_data.${index}.cost_price`]
												}
											/>
											<InputAreaField
												label={t("SalePrice")}
												required={true}
												register={register}
												inputLabel="sale_price"
												inputName={`variants.branch_data.${index}.sale_price`}
												inputType="number"
												inputPlaceholder={t(
													"ProductVariantSalePricePlaceholder",
												)}
												errorName={
													errors[`variants.branch_data.${index}.sale_price`]
												}
											/>
											<InputAreaField
												label={t("Stock")}
												required={true}
												register={register}
												inputLabel="stock"
												inputName={`variants.branch_data.${index}.stock`}
												inputType="number"
												inputPlaceholder={t("ProductVariantStockPlaceholder")}
												errorName={
													errors[`variants.branch_data.${index}.stock`]
												}
											/>
											<InputAreaField
												label={t("LowStock")}
												register={register}
												inputLabel="low_stock"
												inputName={`variants.branch_data.${index}.low_stock`}
												inputType="number"
												inputPlaceholder={t(
													"ProductVariantLowStockPlaceholder",
												)}
												errorName={
													errors[`variants.branch_data.${index}.low_stock`]
												}
											/>
											<InputAreaField
												label={t("ReorderQuantity")}
												register={register}
												inputLabel="reorder_quantity"
												inputName={`variants.branch_data.${index}.reorder_quantity`}
												inputType="number"
												inputPlaceholder={t(
													"ProductVariantReorderQuantityPlaceholder",
												)}
												errorName={
													errors[
														`variants.branch_data.${index}.reorder_quantity`
													]
												}
											/>
											<InputAreaField
												label={t("Discount")}
												register={register}
												inputLabel="discount"
												inputName={`variants.branch_data.${index}.discount`}
												inputType="number"
												inputPlaceholder={t(
													"ProductVariantDiscountPlaceholder",
												)}
												errorName={
													errors[`variants.branch_data.${index}.discount`]
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
					<DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
				</form>
			</Scrollbars>
		</>
	);
};

export default ProductDrawer;
