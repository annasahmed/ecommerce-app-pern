import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import UspServices from "@/services/UspServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import useTranslationValue from "./useTranslationValue";

const useUspSubmit = (id, data) => {
	const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
		useContext(SidebarContext);
	const [resData, setResData] = useState({});
	const [checked, setChecked] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [children, setChildren] = useState([]);
	const [language, setLanguage] = useState("en");
	const [published, setPublished] = useState(true);
	const [selectUspName, setSelectUspName] = useState("");
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

	// console.log("lang", lang, language);

	// console.log("resData", resData);

	const onSubmit = async ({ title, description }) => {
		try {
			setIsSubmitting(true);
			const nameTranslates = await handlerTextTranslateHandler(
				title,
				language,
				resData?.title,
			);
			// console.log("nameTranslates", nameTranslates);
			// return;
			const descriptionTranslates = await handlerTextTranslateHandler(
				description,
				language,
				resData?.description,
			);

			const uspData = {
				title: {
					...nameTranslates,
					[language]: title,
				},
				description: {
					...descriptionTranslates,
					[language]: description ? description : "",
				},
				parentUspId: checked ? checked : undefined,
				// parentName: selectUspName ? selectUspName : "Home",

				icon: imageUrl,
				status: published,
				lang: language,
			};

			// console.log("usp submit", uspData);
			// setIsSubmitting(false);
			// return;

			if (id) {
				const res = await UspServices.updateUsp(id, uspData);
				setIsUpdate(true);
				setIsSubmitting(false);
				notifySuccess(res.message);
				closeDrawer();
				reset();
			} else {
				const res = await UspServices.addUsp(uspData);
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
			setValue("parentUspId");
			// setValue("parentName");
			setValue("description");
			setValue("icon");
			setImageUrl("");
			setPublished(true);
			clearErrors("title");
			clearErrors("parentUspId");
			// clearErrors("parentName");
			clearErrors("description");
			setSelectUspName("Home");
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
					const res = await UspServices.getUspById(id);
					// console.log("res usp", res);

					if (res) {
						setResData(res);
						setValue("title", res.title[language ? language : "en"]);
						setValue(
							"description",
							res.description[language ? language : "en"],
						);
						setValue("language", language);
						setValue("parentUspId", res.parent_usp_id);
						// setValue("parentName", res.parentName);
						// setSelectUspName(res.parentName);
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
		selectUspName,
		setSelectUspName,
		handleSelectLanguage,
	};
};

export default useUspSubmit;
