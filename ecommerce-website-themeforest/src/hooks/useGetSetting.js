import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//internal import
import SettingServices from "@services/SettingServices";
import { storeCustomization } from "@utils/storeCustomizationSetting";

const useGetSetting = () => {
	const lang = Cookies.get("_lang");
	const [storeCustomizationSetting, setStoreCustomizationSetting] =
		useState(storeCustomization);

	const { data: globalSetting, loading } = useQuery({
		queryKey: ["globalSetting"],
		queryFn: async () => await SettingServices.getGlobalSetting(),
		staleTime: 10 * 60 * 1000, //cache for 10minutes
		gcTime: 15 * 60 * 1000,
	});

	// const {
	// 	data,
	// 	error,
	// 	isFetched,
	// 	isLoading: loading,
	// } = useQuery({
	// 	// queryKey: ["storeCustomization"],
	// 	queryFn: async () => await SettingServices.getStoreCustomizationSetting(),
	// 	queryFn: async () => {},
	// 	staleTime: 20 * 60 * 1000, //cache for 20 minutes,
	// 	gcTime: 25 * 60 * 1000,
	// 	retry: false,
	// 	refetchOnWindowFocus: false, // prevent refetching on tab focus
	// 	refetchOnReconnect: false,
	// });

	// console.log("data", Object.keys(data)?.length > 0, "isFetched", isFetched);

	// useEffect(() => {
	// 	if (isFetched && data) {
	// 		// console.log("Data is available:", data);
	// 		setStoreCustomizationSetting(data);
	// 	} else {
	// 		setStoreCustomizationSetting(storeCustomization);
	// 	}

	// 	if (!lang) {
	// 		Cookies.set("_lang", "en", {
	// 			sameSite: "None",
	// 			secure: true,
	// 		});
	// 	}
	// }, [data, isFetched, lang]);
	// console.log(
	// 	"lang===>",
	// 	lang,
	// 	"error===>",
	// 	error,
	// 	"loading===>",
	// 	loading,
	// 	"globalSetting===>",
	// 	globalSetting,
	// 	"storeCustomizationSetting===>",
	// 	storeCustomizationSetting,
	// 	"chkking useSettings",
	// );

	return {
		lang: "en",
		error: null,
		loading: loading,
		globalSetting,
		storeCustomizationSetting,
	};
};

export default useGetSetting;
