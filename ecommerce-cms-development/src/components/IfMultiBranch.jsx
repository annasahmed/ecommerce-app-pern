import { useGlobalSettings } from "@/context/GlobalSettingsContext";

export const IfMultiBranch = ({ children }) => {
	const { settings } = useGlobalSettings();
	return settings.isMultiBranch ? children : null;
};
