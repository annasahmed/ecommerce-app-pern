import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import Error from "@/components/form/others/Error";
import { SidebarContext } from "@/context/SidebarContext";
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
import TranslationFields from "../newComponents/TranslationFields";
import ProductStepper from "./ProductStepper";
import ProductInfoForm from "./ProductInfoForm";

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
	const [hasVariants, setHasVariants] = useState(false);
	const { showingTranslateValue } = useUtilsFunction();

	const defaultValues = {
		sku: null,
		meta_title: null,
		meta_description: null,
		images: [],
		translations: [
			{
				title: null,
				slug: null,
				excerpt: null,
				description: null,
				language_id: null,
			},
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

	// const {
	// 	fields: translationFields,
	// 	append: appendTranslation,
	// 	remove: removeTranslation,
	// } = useFieldArray({
	// 	control,
	// 	name: "translations",
	// });

	const {
		fields: variantFields,
		append: appendVariant,
		remove: removeVariant,
	} = useFieldArray({
		control,
		name: "variants",
	});

	const onSubmit = async (data) => {
		const { name, address, country } = data;
		try {
			setIsSubmitting(true);
			const cleanedData = Object.fromEntries(
				Object.entries(data).filter(([_, value]) => value !== ""),
			);

			const productData = {
				...cleanedData,
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
							meta_title: res.meta_title || null,
							meta_description: res.meta_description || null,
							// Translations
							translations:
								res.product_translations?.map((t) => ({
									title: t.title || null,
									slug: t.slug || null,
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

	const translationFields = [
		{
			name: "title",
			required: true,
			fieldType: "inputArea",
			params: { isVertical: true },
		},
		{
			name: "slug",
			required: true,
			fieldType: "inputArea",
			params: { isVertical: true },
		},
		{
			name: "excerpt",
			fieldType: "inputArea",
			params: { className: "col-span-2", isVertical: true },
		},
		{
			name: "description",
			fieldType: "textArea",
			params: { className: "col-span-2", isVertical: true },
		},
	];

	return (
		<>
			<DrawerHeader
				id={id}
				register={register}
				updateTitle={t("UpdateProduct")}
				updateDescription={t("UpdateProductDescription")}
				addTitle={t("AddProductTitle")}
				addDescription={t("AddProductDescription")}
				isProductDrawer
			/>

			{/* <Scrollbars className=" dark:bg-customGray-700 dark:text-customGray-200"> */}
			{/* <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-customGray-700 dark:text-customGray-200"> */}
			<main className="w-full p-6  space-y-6 relative bg-customWhite dark:bg-customGray-800 rounded-t-lg rounded-0 mb-4">
				<ProductStepper />
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full space-y-6 relative">
					<ProductInfoForm
						variantFields={variantFields}
						appendVariant={appendVariant}
						removeVariant={removeVariant}
						errors={errors}
						control={control}
						register={register}
						usps={usps}
						categories={categories}
						vendors={vendors}
						branches={branches}
						setValue={setValue}
						selectedUsps={selectedUsps}
						selectedCategories={selectedCategories}
						selectedVendors={selectedVendors}
						selectedThumbnail={selectedThumbnail}
						setSelectedThumbnail={setSelectedThumbnail}
						selectedThumbnailUrl={selectedThumbnailUrl}
						setSelectedThumbnailUrl={setSelectedThumbnailUrl}
						isFeatured={isFeatured}
						setIsFeatured={setIsFeatured}
						status={status}
						setStatus={setStatus}
						translationFields={translationFields}
						variantImages={variantImages}
						variantImageUrls={variantImageUrls}
						hasVariants={hasVariants}
						setHasVariants={setHasVariants}
					/>
					<DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
				</form>
			</main>

			{/* </Scrollbars> */}
		</>
	);
};

export default ProductDrawer;
