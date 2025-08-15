import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import Error from "@/components/form/others/Error";
import { SidebarContext } from "@/context/SidebarContext";
import useTranslationValue from "@/hooks/useTranslationValue";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useFieldArray, useForm } from "react-hook-form";
import DrawerHeader from "../newComponents/DrawerHeader";

import useUtilsFunction from "@/hooks/useUtilsFunction";
import BranchServices from "@/services/BranchServices";
import CategoryServices from "@/services/CategoryServices";
import LanguageServices from "@/services/LanguageServices";
import UspServices from "@/services/UspServices";
import VendorServices from "@/services/VendorServices";
import { Button } from "@windmill/react-ui";
import ImageSelectorField from "../form/fields/ImageSelectorField";
import InputAreaField from "../form/fields/InputAreaField";
import InputMultipleSelectField from "../form/fields/InputMultipleSelectField";
import InputSelectField from "../form/fields/InputSelectField";
import SwitchToggleField from "../form/fields/SwitchToggleField";
import TextAreaField from "../form/fields/TextAreaField";

const ProductDrawer = ({ id, data }) => {
	const { t } = useTranslation();

	const [usps, setUsps] = useState([]);
	const [categories, setCategories] = useState([]);
	const [vendors, setVendors] = useState([]);
	const [selectedUsps, setSelectedUsps] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedVendors, setSelectedVendors] = useState([]);
	const [branches, setBranches] = useState([]);
	const [languages, setLanguages] = useState([]);
	const [status, setStatus] = useState(true);
	const [isFeatured, setIsFeatured] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resData, setResData] = useState({});
	const { closeDrawer, setIsUpdate } = useContext(SidebarContext);
	const [selectedThumbnail, setSelectedThumbnail] = useState(null);
	const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState(null);
	const [variantImages, setVariantImages] = useState({});
	const [variantImageUrls, setVariantImageUrls] = useState({});
	const { showingTranslateValue } = useUtilsFunction();

	const defaultValues = {
		sku: null,
		slug: null,
		meta_title: null,
		meta_description: null,
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
	};

	const {
		control,
		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues,
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

		// return;

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
				// name: {
				// 	...nameTranslates,
				// 	["en"]: name,
				// },
				// address: {
				// 	...addressTranslates,
				// 	["en"]: address,
				// },
				// country: {
				// 	...countryTranslates,
				// 	...(country && { ["en"]: country }),
				// },
				is_featured: isFeatured,
				status,
				thumbnail: selectedThumbnail,
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
			setSelectedCategories([]);
			setSelectedUsps([]);
			setSelectedVendors([]);
			setSelectedThumbnail(null);
			setSelectedThumbnailUrl(null);
			setVariantImages(null);
			setVariantImageUrls(null);
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

						// ✅ Thumbnail
						setSelectedThumbnail(res.thumbnail || null);
						// If API returns thumbnail via medium, adjust accordingly
						setSelectedThumbnailUrl(
							res.thumbnailImage?.url
								? import.meta.env.VITE_APP_CLOUDINARY_URL +
										res.thumbnailImage.url
								: null,
						);
						setStatus(res.status ?? false);
						setIsFeatured(res.is_featured ?? false);
						setSelectedCategories(
							res.categories?.map((cat) => ({
								id: cat.id,
								name: showingTranslateValue(cat.title),
							})),
						);
						setSelectedUsps(
							res.usps?.map((cat) => ({
								id: cat.id,
								name: showingTranslateValue(cat.title),
							})),
						);
						setSelectedVendors(
							res.vendors?.map((cat) => ({
								id: cat.id,
								name: showingTranslateValue(cat.name),
							})),
						);

						// ✅ Variant images (for ImageSelectorField)
						if (res.product_variants?.length) {
							const imgObj = {};
							const imgUrlObj = {};
							res.product_variants.forEach((variant, idx) => {
								imgObj[idx] = variant.image || null;
								imgUrlObj[idx] =
									import.meta.env.VITE_APP_CLOUDINARY_URL +
										variant.medium?.url || null;
							});
							setVariantImages(imgObj);
							setVariantImageUrls(imgUrlObj);
						}

						// ✅ Reset form values
						reset({
							sku: res.sku || null,
							slug: res.slug || null,
							meta_title: res.meta_title || null,
							meta_description: res.meta_description || null,
							// Translations
							translations:
								res.product_translations?.map((t) => ({
									title: t.title || null,
									excerpt: t.excerpt || null,
									description: t.description || null,
									language_id: t.language_id || null,
								})) || [],

							// Variants
							variants:
								res.product_variants?.map((v) => ({
									sku: v.sku || null,
									attributes: {
										size: v.attributes?.size || null,
										color: v.attributes?.color || null,
									},
									image: v.image || null, // actual image ID
									branch_data:
										v.branches?.map((b) => ({
											branch_id: b.id || null,
											cost_price: b.pvb?.cost_price || null,
											sale_price: b.pvb?.sale_price || null,
											stock: b.pvb?.stock || null,
											low_stock: b.pvb?.low_stock || null,
											reorder_quantity: b.pvb?.reorder_quantity || null,
											discount_percentage: b.pvb?.discount_percentage || null,
										})) || [],
								})) || [],
						});
					}
				} catch (err) {
					notifyError(err?.response?.data?.message || err.message);
				}
			})();
		} else {
			reset({ ...defaultValues }); // New product mode
			setSelectedCategories([]);
			setSelectedUsps([]);
			setSelectedVendors([]);
			setSelectedThumbnail(null);
			setSelectedThumbnailUrl(null);
			// setVariantImages(null);
			// setVariantImageUrls(null);
			// setSelectedThumbnail(null);
			// setSelectedThumbnailUrl(null);
			// setVariantImageUrls(null);
			// setVariantImages(null);
		}
	}, [id, setValue, clearErrors, data]);

	useEffect(() => {
		UspServices.getAllUsps().then((data) => {
			setUsps(data?.records);
		});
		CategoryServices.getAllCategories().then((data) => {
			setCategories(data?.records);
		});
		VendorServices.getAllVendors().then((data) => {
			setVendors(data?.records);
		});
		BranchServices.getAllBranches().then((data) => {
			setBranches(data?.records);
		});
		LanguageServices.getAllLanguages().then((data) => {
			setLanguages(data);
		});
	}, []);

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
						{/* Translations */}
						<div>
							<h3 className="text-xl font-semibold mt-4">
								{t("Translations")}
							</h3>
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
									{/* <InputAreaField
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
									/> */}
									<InputSelectField
										label={t("Language")}
										required={true}
										register={register}
										inputLabel={t("language")}
										inputName={`translations.${index}.language_id`}
										inputPlaceholder={t(
											"ProductTranslationLanguagePlaceholder",
										)}
										options={languages?.map((pCat, index) => {
											return (
												<option value={pCat.id} key={index}>
													{pCat?.name}
												</option>
											);
										})}
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
							<h3 className="text-xl font-semibold mt-4">{t("Variants")}</h3>
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
												inputPlaceholder={t(
													"ProductVariantBranchIdPlaceholder",
												)}
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
												inputPlaceholder={t(
													"ProductVariantCostPricePlaceholder",
												)}
												errorName={
													errors?.variants?.[index]?.branch_data?.[0]
														?.cost_price
												}
											/>
											<InputAreaField
												label={t("SalePrice")}
												required
												register={register}
												inputLabel="sale_price"
												inputName={`variants.${index}.branch_data.0.sale_price`}
												inputType="number"
												inputPlaceholder={t(
													"ProductVariantSalePricePlaceholder",
												)}
												errorName={
													errors?.variants?.[index]?.branch_data?.[0]
														?.sale_price
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
												errorName={
													errors?.variants?.[index]?.branch_data?.[0]?.stock
												}
											/>
											<InputAreaField
												label={t("LowStock")}
												register={register}
												inputLabel="low_stock"
												inputName={`variants.${index}.branch_data.0.low_stock`}
												inputType="number"
												inputPlaceholder={t(
													"ProductVariantLowStockPlaceholder",
												)}
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
												inputPlaceholder={t(
													"ProductVariantDiscountPlaceholder",
												)}
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
					<DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
				</form>
			</Scrollbars>
		</>
	);
};

export default ProductDrawer;
