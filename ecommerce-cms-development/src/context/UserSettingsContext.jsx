// 🟢 userSettingsContext.tsx
import LanguageServices from "@/services/LanguageServices";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

export const UserSettingsContext = createContext({
	logo: "",
	logoDark: "",
	isMultiLingual: false,
	isMultiBranch: false,
	isInventory: true,
});

// will fetch it from API later
const userSettings = {
	logo: "https://res.cloudinary.com/drju2eij9/image/upload/v1746712700/ecomStore-logo-final-removebg-preview_ievymx.png",
	logoDark:
		"https://res.cloudinary.com/drju2eij9/image/upload/v1746712700/ecomStore-logo-final-removebg-preview_ievymx.png",
	isMultiLingual: true,
	isMultiBranch: false,
	isInventory: true,
};
export const UserSettingsProvider = ({ children }) => {
	const { i18n } = useTranslation();
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

		fetchLanguages();
	}, []);

	return (
		<UserSettingsContext.Provider
			value={{
				userSettings,
				languages,
				selectedLanguage,
				handleLanguageChange,
			}}>
			{children}
		</UserSettingsContext.Provider>
	);
};

export const useUserSettings = () => useContext(UserSettingsContext);
