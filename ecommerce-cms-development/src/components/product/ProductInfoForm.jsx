import { useGlobalSettings } from "@/context/GlobalSettingsContext";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import { useTranslation } from "react-i18next";
import ImageSelectorField from "../form/fields/ImageSelectorField";
import InputAreaField from "../form/fields/InputAreaField";
import InputMultipleSelectField from "../form/fields/InputMultipleSelectField";
import SwitchToggleField from "../form/fields/SwitchToggleField";
import TranslationFields from "../newComponents/TranslationFields";

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

	hasVariants,
	setHasVariants,
}) => {
	const { t } = useTranslation();
	const { showingTranslateValue, showSelectedLanguageTranslation } =
		useUtilsFunction();

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
							name: showSelectedLanguageTranslation(pCat.translations, "title"),
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
							name: showSelectedLanguageTranslation(
								pCat?.translations,
								"title",
							),
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
		</div>
	);
};

export default ProductInfoForm;
