// 🟢 GlobalSettingsContext.tsx
import LanguageServices from "@/services/LanguageServices";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import BranchServices from "@/services/BranchServices";

export const GlobalSettingsContext = createContext({
	logo: "",
	logoDark: "",
	isMultiLingual: false,
	isMultiBranch: false,
	isInventory: true,
});

// will fetch it from API later
const settings = {
	logo: "https://res.cloudinary.com/drju2eij9/image/upload/v1762174834/logo_ceyjeh.png",
	logoDark:
		"https://res.cloudinary.com/drju2eij9/image/upload/v1762174834/logo_ceyjeh.png",
	isMultiLingual: false,
	isMultiBranch: false,
	isInventory: true,
};
export const GlobalSettingsProvider = ({ children }) => {
	const { i18n } = useTranslation();
	const [branches, setBranches] = useState([]);
	const cookieLang = Cookies.get("selectedLanguage");
	const [selectedLanguage, setSelectedLanguage] = useState(
		cookieLang
			? JSON.parse(cookieLang)
			: { id: 1, code: "en", name: "English" }, // fallback
	);
	const [languages, setLanguages] = useState([]); // fetched from backend

	const handleLanguageChange = (lang) => {
		// 1. Update React state
		setSelectedLanguage(lang);
	};

	useEffect(() => {
		i18n.changeLanguage(selectedLanguage.code);
		if (!cookieLang || JSON.parse(cookieLang).id !== selectedLanguage.id) {
			Cookies.set("selectedLanguage", JSON.stringify(selectedLanguage), {
				expires: 7,
				sameSite: "strict",
			});
		}
	}, [selectedLanguage]);

	useEffect(() => {
		const fetchLanguages = async () => {
			const data = await LanguageServices.getAllLanguages();
			// Ensure selected language is valid
			const isValidSelectedLanguage = data.find(
				(v) => v.id === selectedLanguage.id,
			);

			if (!isValidSelectedLanguage && data.length > 0) {
				handleLanguageChange(data[0]); // fallback to first available, in case of invalid language in cookies
			}

			setLanguages(data);
		};
		const fetchBranches = async () => {
			const data = await BranchServices.getAllBranches();
			// Ensure selected language is valid

			setBranches(data.records);
		};
		fetchBranches();
		fetchLanguages();
	}, []);

	console.log(
		{
			branches,
			branhcId: branches?.length > 0 ? branches[0].id : null,
		},
		"adnsakdmsa",
	);

	return (
		<GlobalSettingsContext.Provider
			value={{
				settings: {
					...settings,
					isMultiLingual:
						languages?.length > 1 ? settings.isMultiLingual : false,
					isMultiBranch: branches?.length > 1 ? settings.isMultiBranch : false,
					defaultBranchId: branches?.length > 0 ? branches[0].id : null,
				},
				branches,
				languages,
				selectedLanguage,
				handleLanguageChange,
			}}>
			{children}
		</GlobalSettingsContext.Provider>
	);
};

export const useGlobalSettings = () => useContext(GlobalSettingsContext);
