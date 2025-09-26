import { useGlobalSettings } from "@/context/GlobalSettingsContext";

const useTranslationUtils = () => {
	const { selectedLanguage } = useGlobalSettings();
	const displayTranslatedValue = (data) => {
		if (!data || typeof data !== "object") return ""; // Handle undefined or non-object cases
		return data[selectedLanguage?.code || "ur"];
	};

	return {
		displayTranslatedValue,
	};
};

export default useTranslationUtils;
