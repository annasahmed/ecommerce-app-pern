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

const ProductDrawer = ({ id, data }) => {
	const { t } = useTranslation();
	const [status, setStatus] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resData, setResData] = useState({});
	const { closeDrawer, setIsUpdate } = useContext(SidebarContext);

	// const {
	// 	register,
	// 	handleSubmit,
	// 	setValue,
	// 	clearErrors,
	// 	reset,
	// 	formState: { errors },
	// } = useForm();

	const {
		control,
		// register,
		// handleSubmit,
		// formState: { errors },

		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			images: [""],
			translations: [
				{ title: "", excerpt: "", description: "", language_id: "" },
			],
			variants: [
				{
					sku: "",
					attributes: {},
					image: "",
					branch_data: [
						{
							branch_id: "",
							cost_price: "",
							stock: "",
							low_stock: "",
							reorder_quantity: "",
							sale_price: "",
							discount_percentage: "",
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
							<Label>SKU</Label>
							<Input {...register("sku")} />
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

							<Label className="mt-2">Slug</Label>
							<Input {...register("slug", { required: true })} />

							<Label className="mt-2">Thumbnail</Label>
							<Input {...register("thumbnail", { required: true })} />

							<Label className="mt-2">Meta Title</Label>
							<Input {...register("meta_title", { required: true })} />

							<Label className="mt-2">Meta Description</Label>
							<Textarea {...register("meta_description", { required: true })} />

							<Label className="mt-2">Is Featured</Label>
							<input type="checkbox" {...register("is_featured")} />
						</div>

						{/* Translations */}
						<div>
							<h3 className="text-xl font-semibold mt-4">Translations</h3>
							{translationFields.map((field, index) => (
								<div
									key={field.id}
									className="border p-4 rounded mt-2 space-y-2">
									<Label>Title</Label>
									<Input
										{...register(`translations.${index}.title`, {
											required: true,
										})}
									/>

									<Label>Excerpt</Label>
									<Textarea {...register(`translations.${index}.excerpt`)} />

									<Label>Description</Label>
									<Textarea
										{...register(`translations.${index}.description`)}
									/>

									<Label>Language ID</Label>
									<Input
										type="number"
										{...register(`translations.${index}.language_id`, {
											required: true,
										})}
									/>

									<Button
										layout="outline"
										onClick={() => removeTranslation(index)}
										className="mt-2">
										Remove
									</Button>
								</div>
							))}
							<Button
								onClick={() =>
									appendTranslation({
										title: "",
										excerpt: "",
										description: "",
										language_id: "",
									})
								}
								className="mt-2">
								Add Translation
							</Button>
						</div>

						{/* Variants */}
						<div>
							<h3 className="text-xl font-semibold mt-4">Variants</h3>
							{variantFields.map((field, index) => (
								<div
									key={field.id}
									className="border p-4 rounded mt-2 space-y-2">
									<Label>Variant SKU</Label>
									<Input {...register(`variants.${index}.sku`)} />

									<Label>Variant Image</Label>
									<Input {...register(`variants.${index}.image`)} />

									{/* Basic attribute fields (customize for your needs) */}
									<Label>Size</Label>
									<Input {...register(`variants.${index}.attributes.size`)} />

									<Label>Color</Label>
									<Input {...register(`variants.${index}.attributes.color`)} />

									{/* Branch Data */}
									<div className="mt-4">
										<h4 className="font-semibold">Branch Data</h4>
										<div className="space-y-2">
											<Label>Branch ID</Label>
											<Input
												{...register(
													`variants.${index}.branch_data.0.branch_id`,
												)}
											/>

											<Label>Cost Price</Label>
											<Input
												type="number"
												{...register(
													`variants.${index}.branch_data.0.cost_price`,
												)}
											/>

											<Label>Sale Price</Label>
											<Input
												type="number"
												{...register(
													`variants.${index}.branch_data.0.sale_price`,
												)}
											/>

											<Label>Stock</Label>
											<Input
												type="number"
												{...register(`variants.${index}.branch_data.0.stock`)}
											/>

											<Label>Low Stock</Label>
											<Input
												type="number"
												{...register(
													`variants.${index}.branch_data.0.low_stock`,
												)}
											/>

											<Label>Reorder Qty</Label>
											<Input
												type="number"
												{...register(
													`variants.${index}.branch_data.0.reorder_quantity`,
												)}
											/>

											<Label>Discount %</Label>
											<Input
												type="number"
												{...register(
													`variants.${index}.branch_data.0.discount_percentage`,
												)}
											/>
										</div>
									</div>

									<Button
										layout="outline"
										onClick={() => removeVariant(index)}
										className="mt-2">
										Remove Variant
									</Button>
								</div>
							))}

							<Button
								onClick={() =>
									appendVariant({
										sku: "",
										attributes: {},
										image: "",
										branch_data: [
											{
												branch_id: "",
												cost_price: "",
												stock: "",
												low_stock: "",
												reorder_quantity: "",
												sale_price: "",
												discount_percentage: "",
											},
										],
									})
								}
								className="mt-2">
								Add Variant
							</Button>
						</div>
					</div>

					{/* <Button type="submit" className="mt-6">
						Submit Product
					</Button> */}
					<DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
				</form>
			</Scrollbars>
		</>
	);
};

export default ProductDrawer;
