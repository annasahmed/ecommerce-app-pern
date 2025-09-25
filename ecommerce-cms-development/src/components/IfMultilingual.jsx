import { useEffect, useState } from "react";
import { useUserSettings } from "@/context/userSettingsContext";
import LanguageServices from "@/services/LanguageServices";

export const IfMultilingual = ({ children }) => {
	const { isMultiLingual } = useUserSettings();
	const [languages, setLanguages] = useState([]);

	useEffect(() => {
		const fetchLanguages = async () => {
			try {
				const langs = await LanguageServices.getAllLanguages();
				setLanguages(langs || []);
			} catch (err) {
				console.error("Error fetching languages:", err);
			}
		};
		fetchLanguages();
	}, []);

	return isMultiLingual && languages.length > 0 ? children : null;
};
