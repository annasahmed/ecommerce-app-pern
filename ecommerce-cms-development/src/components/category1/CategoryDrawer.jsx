import { Select } from "@windmill/react-ui";

import { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import DrawerButton from "@/components/form/button/DrawerButton";
import InputArea from "@/components/form/input/InputArea";
import TextAreaCom from "@/components/form/input/TextAreaCom";
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import Uploader from "@/components/image-uploader/Uploader";
import { SidebarContext } from "@/context/SidebarContext";
import useTranslationValue from "@/hooks/useTranslationValue";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import CategoryServices from "@/services/CategoryServices";
import ParentCategoryServices from "@/services/ParentCategoryServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useForm } from "react-hook-form";
import DrawerHeader from "../newComponents/DrawerHeader";

const CategoryDrawer = ({ id, data }) => {
	const { t } = useTranslation();
	const [imageUrl, setImageUrl] = useState(null);
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
				icon: imageUrl,
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
						setImageUrl(res.icon);
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
				updateTitle={t("UpdateCategory")}
				updateDescription={t("UpdateCategoryDescription")}
				addTitle={t("AddCategoryTitle")}
				addDescription={t("AddCategoryDescription")}
			/>

			<Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-customGray-700 dark:text-customGray-200">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Name")} />
							<div className="col-span-8 sm:col-span-4">
								<InputArea
									required={true}
									register={register}
									label="Category title"
									name="title"
									type="text"
									placeholder={t("ParentCategoryPlaceholder")}
								/>
								<Error errorName={errors.name} />
							</div>
						</div>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={"Slug"} />
							<div className="col-span-8 sm:col-span-4">
								<InputArea
									required={true}
									register={register}
									label="Category slug"
									name="slug"
									type="text"
									placeholder={"Category Slug"}
								/>
								<Error errorName={errors.name} />
							</div>
						</div>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Description")} />
							<div className="col-span-8 sm:col-span-4">
								<TextAreaCom
									register={register}
									label="Description"
									name="description"
									type="text"
									placeholder="Category Description"
								/>
								<Error errorName={errors.description} />
							</div>
						</div>
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
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("CategoryIcon")} />
							<div className="col-span-8 sm:col-span-4">
								<Uploader
									imageUrl={imageUrl}
									setImageUrl={setImageUrl}
									folder="category"
									targetWidth={238}
									targetHeight={238}
								/>
							</div>
						</div>
						<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("Status")} />
							<div className="col-span-8 sm:col-span-4">
								<SwitchToggle
									handleProcess={setStatus}
									processOption={status}
								/>
							</div>
						</div>
					</div>

					<DrawerButton id={id} title="Category" isSubmitting={isSubmitting} />
				</form>
			</Scrollbars>
		</>
	);
};

export default CategoryDrawer;
