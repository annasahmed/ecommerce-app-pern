import { Select } from "@windmill/react-ui";

import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import { SidebarContext } from "@/context/SidebarContext";
import useTranslationValue from "@/hooks/useTranslationValue";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import CategoryServices from "@/services/CategoryServices";
import ParentCategoryServices from "@/services/ParentCategoryServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useForm } from "react-hook-form";
import ImageSelector from "../image-uploader/ImageSelector";
import DrawerHeader from "../newComponents/DrawerHeader";
import InputAreaField from "../form/fields/InputAreaField";
import SwitchToggleField from "../form/fields/SwitchToggleField";
import TextAreaField from "../form/fields/TextAreaField";
import ImageSelectorField from "../form/fields/ImageSelectorField";

const CategoryDrawer = ({ id, data }) => {
	const { t } = useTranslation();
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedImageUrl, setSelectedImageUrl] = useState(null);
	const [status, setStatus] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resData, setResData] = useState({});
	const [parentCategories, setParentCategories] = useState([]);
	const { closeDrawer, setIsUpdate } = useContext(SidebarContext);

	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();

	const { showingTranslateValue } = useUtilsFunction();
	const { handlerTextTranslateHandler } = useTranslationValue();

	useEffect(() => {
		ParentCategoryServices.getAllCategories().then((data) => {
			setParentCategories(data?.records);
		});
	}, []);

	const onSubmit = async (data) => {
		const { title, description, parentCategoryId, slug } = data;
		try {
			setIsSubmitting(true);
			const nameTranslates = await handlerTextTranslateHandler(
				title,
				"en",
				resData?.title,
			);
			const descriptionTranslates = await handlerTextTranslateHandler(
				description,
				"en",
				resData?.description,
			);

			const categoryData = {
				title: {
					...nameTranslates,
					["en"]: title,
				},
				description: {
					...descriptionTranslates,
					...(description && { ["en"]: description }),
				},
				icon: selectedImage,
				parentCategoryId,
				slug,
				status,
			};

			if (id) {
				const res = await CategoryServices.updateCategory(id, categoryData);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				closeDrawer();
				reset();
			} else {
				const res = await CategoryServices.addCategory(categoryData);
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
					const res = await CategoryServices.getCategoryById(id);
					if (res) {
						setResData(res);
						setValue("title", res.title["en"]);
						setValue("description", res.description && res.description["en"]);
						setValue("parentCategoryId", res.parent_category_id);
						setValue("slug", res.slug);
						setSelectedImage(res.icon);
						setSelectedImageUrl(
							res.medium.url
								? import.meta.env.VITE_APP_CLOUDINARY_URL + res.medium.url
								: null,
						);
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

	console.log(selectedImageUrl, "chkkingurll");

	return (
		<>
			<DrawerHeader
				id={id}
				register={register}
				updateTitle={t("UpdateCategory")}
				updateDescription={t("UpdateCategoryDescription")}
				addTitle={t("AddCategoryTitle")}
				addDescription={t("AddCategoryDescription")}
			/>

			<Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-customGray-700 dark:text-customGray-200">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
						<InputAreaField
							label={t("Name")}
							required={true}
							register={register}
							inputLabel="Title"
							inputName="title"
							inputType="text"
							inputPlaceholder={t("CategoryTitlePlaceholder")}
							errorName={errors.title}
						/>
						<InputAreaField
							label={t("Slug")}
							required={true}
							register={register}
							inputLabel="Slug"
							inputName="slug"
							inputType="text"
							inputPlaceholder={t("CategorySlugPlaceholder")}
							errorName={errors.slug}
						/>
						<TextAreaField
							label={t("Description")}
							register={register}
							inputLabel="Description"
							inputName="description"
							inputType="text"
							inputPlaceholder={t("CategoryDescriptionPlaceholder")}
							errorName={errors.description}
						/>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("SelectParentCategory")} />
							<div className="col-span-8 sm:col-span-4 ">
								<Select
									name="parentCategoryId"
									{...register(`parentCategoryId`, {
										required: `parentCategoryId is required!`,
									})}>
									<option value="" defaultValue hidden>
										{t("SelectParentCategory")}
									</option>
									{parentCategories?.map((pCat, index) => {
										return (
											<option value={pCat.id} key={index}>
												{showingTranslateValue(pCat?.title)}
											</option>
										);
									})}
								</Select>
								<Error errorName={errors.option} />
							</div>
						</div>
						<ImageSelectorField
							label={t("CategoryIcon")}
							selectedImage={selectedImage}
							setSelectedImage={setSelectedImage}
							selectedImageUrl={selectedImageUrl}
							setSelectedImageUrl={setSelectedImageUrl}
						/>
						<SwitchToggleField
							label={t("Status")}
							handleProcess={setStatus}
							processOption={status}
						/>
					</div>

					<DrawerButton id={id} title="Category" isSubmitting={isSubmitting} />
				</form>
			</Scrollbars>
		</>
	);
};

export default CategoryDrawer;
