import { Input, Select } from "@windmill/react-ui";

import Tree from "rc-tree";
import React, { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import { notifyError, notifySuccess } from "@/utils/toast";
import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import TextAreaCom from "@/components/form/input/TextAreaCom";
import Uploader from "@/components/image-uploader/Uploader";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import CategoryServices from "@/services/CategoryServices";
import DrawerButton from "@/components/form/button/DrawerButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import { useForm } from "react-hook-form";
import useTranslationValue from "@/hooks/useTranslationValue";
import { SidebarContext } from "@/context/SidebarContext";
import ParentCategoryServices from "@/services/ParentCategoryServices";

const CategoryDrawer = ({ id, data }) => {
	const { t } = useTranslation();
	const [imageUrl, setImageUrl] = useState(null);
	const [status, setStatus] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resData, setResData] = useState({});
	const [parentCategories, setParentCategories] = useState([]);
	const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
		useContext(SidebarContext);

	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();

	// const {
	// 	checked,
	// 	register,
	// 	onSubmit,
	// 	handleSubmit,
	// 	errors,
	// 	imageUrl,
	// 	setImageUrl,
	// 	published,
	// 	setPublished,
	// 	setChecked,
	// 	selectCategoryName,
	// 	setSelectCategoryName,
	// 	handleSelectLanguage,
	// 	isSubmitting,
	// } = useCategorySubmit(id, data);

	const { showingTranslateValue } = useUtilsFunction();
	const { handlerTextTranslateHandler } = useTranslationValue();

	const STYLE = `
  .rc-tree-child-tree {
    display: hidden;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;

	const motion = {
		motionName: "node-motion",
		motionAppear: false,
		onAppearStart: (node) => {
			return { height: 0 };
		},
		onAppearActive: (node) => ({ height: node.scrollHeight }),
		onLeaveStart: (node) => ({ height: node.offsetHeight }),
		onLeaveActive: () => ({ height: 0 }),
	};

	// const renderCategories = (categories) => {
	// 	let myCategories = [];
	// 	for (let category of categories) {
	// 		myCategories.push({
	// 			title: showingTranslateValue(category.name),
	// 			key: category.id,
	// 			// children:
	// 			// 	category.children.length > 0 && renderCategories(category.children),
	// 		});
	// 	}

	// 	return myCategories;
	// };

	// const findObject = (obj, target) => {
	// 	return obj.id === target
	// 		? obj
	// 		: obj?.children?.reduce(
	// 				(acc, obj) => acc ?? findObject(obj, target),
	// 				undefined,
	// 		  );
	// };

	// const handleSelect = async (key) => {
	// 	// console.log('key', key, 'id', id);
	// 	if (key === undefined) return;
	// 	if (id) {
	// 		const parentCategoryId = await CategoryServices.getCategoryById(key);

	// 		if (id === key) {
	// 			return notifyError("This can't be select as a parent category!");
	// 		} else if (id === parentCategoryId.parentId) {
	// 			return notifyError("This can't be select as a parent category!");
	// 		} else {
	// 			if (key === undefined) return;
	// 			setChecked(key);

	// 			const obj = data[0];
	// 			const result = findObject(obj, key);

	// 			setSelectCategoryName(showingTranslateValue(result?.name));
	// 		}
	// 	} else {
	// 		if (key === undefined) return;
	// 		setChecked(key);

	// 		const obj = data[0];
	// 		const result = findObject(obj, key);

	// 		setSelectCategoryName(showingTranslateValue(result?.name));
	// 	}
	// };
	useEffect(() => {
		ParentCategoryServices.getAllCategories().then((data) => {
			setParentCategories(data);
		});
	}, []);

	const onSubmit = async (data) => {
		console.log(data, "asadiasidsa");

		const { title, description, parentCategoryId, slug } = data;
		try {
			setIsSubmitting(true);
			const nameTranslates = await handlerTextTranslateHandler(
				title,
				"en",
				resData?.title,
			);
			// console.log("nameTranslates", nameTranslates);
			// return;
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
					["en"]: description ? description : "",
				},
				icon: imageUrl,
				parentCategoryId,
				slug,
				status,
			};

			// console.log("category submit", categoryData);
			// setIsSubmitting(false);
			// return;

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
			closeDrawer();
		}
	};

	useEffect(() => {
		if (id) {
			(async () => {
				try {
					const res = await CategoryServices.getCategoryById(id);
					// console.log("res category", res);

					if (res) {
						console.log(res, "chkinis");

						setResData(res);
						setValue("title", res.title["en"]);
						setValue("description", res.description["en"]);
						setValue("parentCategoryId", res.parent_category_id);
						setValue("slug", res.slug);
						// setValue("parentName", res.parentName);
						// setSelectCategoryName(res.parentName);
						// setChecked(res.parentId);
						setImageUrl(res.icon);
						setStatus(res.status || false);
					}
				} catch (err) {
					notifyError(err ? err.response.data.message : err.message);
				}
			})();
		} else {
			// reset();
		}
	}, [id, setValue, clearErrors, data]);

	return (
		<>
			{/* <div className="w-full relative p-6 border-b border-customGray-100 bg-customGray-50 dark:border-customGray-700 dark:bg-customGray-800 dark:text-customGray-300">
				{id ? (
					<Title
						register={register}
						handleSelectLanguage={handleSelectLanguage}
						title={t("UpdateCategory")}
						description={t("UpdateCategoryDescription")}
					/>
				) : (
					<Title
						register={register}
						handleSelectLanguage={handleSelectLanguage}
						title={t("AddCategoryTitle")}
						description={t("AddCategoryDescription")}
					/>
				)}
			</div> */}

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

									{/* <option value="Radio">{t("Radio")}</option> */}
									{/* <option value="Checkbox">Checkbox</option> */}
								</Select>
								<Error errorName={errors.option} />
							</div>
						</div>

						{/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
							<LabelArea label={t("ParentCategory")} />
							<div className="col-span-8 sm:col-span-4 relative">
								<Input
									readOnly
									{...register(`parent`, {
										required: false,
									})}
									name="parent"
									value={selectCategoryName ? selectCategoryName : "Home"}
									placeholder={t("ParentCategory")}
									type="text"
								/>

								<div className="draggable-demo capitalize">
									<style dangerouslySetInnerHTML={{ __html: STYLE }} />
									<Tree
										expandAction="click"
										treeData={renderCategories(data)}
										selectedKeys={[checked]}
										onSelect={(v) => handleSelect(v[0])}
										motion={motion}
										animation="slide-up"
									/>
								</div>
							</div>
						</div> */}

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
