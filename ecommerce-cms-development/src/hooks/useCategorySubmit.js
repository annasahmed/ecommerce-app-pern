import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import CategoryServices from "@/services/CategoryServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import useTranslationValue from "./useTranslationValue";

const useCategorySubmit = (id, data) => {
	const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
		useContext(SidebarContext);
	const [resData, setResData] = useState({});
	const [checked, setChecked] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [children, setChildren] = useState([]);
	const [language, setLanguage] = useState("en");
	const [published, setPublished] = useState(true);
	const [selectCategoryName, setSelectCategoryName] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { handlerTextTranslateHandler } = useTranslationValue();

	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async ({ title, description }) => {
		try {
			setIsSubmitting(true);
			const nameTranslates = await handlerTextTranslateHandler(
				title,
				language,
				resData?.title,
			);
			// return;
			const descriptionTranslates = await handlerTextTranslateHandler(
				description,
				language,
				resData?.description,
			);

			const categoryData = {
				title: {
					...nameTranslates,
					[language]: title,
				},
				description: {
					...descriptionTranslates,
					[language]: description ? description : "",
				},
				parentCategoryId: checked ? checked : undefined,
				// parentName: selectCategoryName ? selectCategoryName : "Home",

				icon: imageUrl,
				status: published,
				lang: language,
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
			}
		} catch (err) {
			setIsSubmitting(false);
			notifyError(err ? err?.response?.data?.message : err?.message);
			closeDrawer();
		}
	};

	const handleSelectLanguage = (lang) => {
		setLanguage(lang);
		if (Object.keys(resData).length > 0) {
			setValue("title", resData.title[lang ? lang : "en"]);
			setValue("description", resData.description[lang ? lang : "en"]);
		}
	};

	useEffect(() => {
		if (!isDrawerOpen) {
			setResData({});
			setValue("title");
			setValue("parentCategoryId");
			// setValue("parentName");
			setValue("description");
			setValue("icon");
			setImageUrl("");
			setPublished(true);
			clearErrors("title");
			clearErrors("parentCategoryId");
			// clearErrors("parentName");
			clearErrors("description");
			setSelectCategoryName("Home");
			setLanguage(lang);
			setValue("language", language);

			if (data !== undefined && data[0]?.id !== undefined) {
				setChecked(data[0].id);
			}
			return;
		}
		if (id) {
			(async () => {
				try {
					const res = await CategoryServices.getCategoryById(id);

					if (res) {
						setResData(res);
						setValue("title", res.title[language ? language : "en"]);
						setValue(
							"description",
							res.description[language ? language : "en"],
						);
						setValue("language", language);
						setValue("parentCategoryId", res.parent_category_id);
						// setValue("parentName", res.parentName);
						// setSelectCategoryName(res.parentName);
						// setChecked(res.parentId);
						setImageUrl(res.icon);
						setPublished(res.status || false);
					}
				} catch (err) {
					notifyError(err ? err.response.data.message : err.message);
				}
			})();
		}
	}, [id, setValue, isDrawerOpen, language, clearErrors, data, lang]);

	return {
		register,
		handleSubmit,
		onSubmit,
		errors,
		imageUrl,
		setImageUrl,
		children,
		setChildren,
		published,
		setPublished,
		checked,
		setChecked,
		isSubmitting,
		selectCategoryName,
		setSelectCategoryName,
		handleSelectLanguage,
	};
};

export default useCategorySubmit;
