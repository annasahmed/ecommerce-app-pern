import { useGlobalSettings } from "@/context/GlobalSettingsContext";

export const IfMultilingual = ({ children }) => {
	const { settings, languages } = useGlobalSettings();
	return settings.isMultiLingual && languages.length > 1 ? children : null;
};
