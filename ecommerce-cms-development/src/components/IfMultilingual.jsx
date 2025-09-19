import { useUserSettings } from "@/context/userSettingsContext";

export const IfMultilingual = ({ children }) => {
	const { isMultiLingual } = useUserSettings();
	return isMultiLingual ? children : null;
};
