import { useGlobalSettings } from "@/context/GlobalSettingsContext";

export const IfMultilingual = ({ children }) => {
	const { settings } = useGlobalSettings();
	return settings.isMultiLingual ? children : null;
};
