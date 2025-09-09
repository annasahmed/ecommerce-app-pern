import { useStore } from "../providers/StoreProvider";
import requests from "../data/FurnitureTheme/data";

const ParentCategoryServices = {
	getParentCategories: async () => {
		const data = requests.get("/parent-category");
		if (data) {
			return data;
		}else{
			const store=useStore()
			const data=dynamic(() => import(`./${theme}/HeroSection`)),
		}
	},
};

export default ParentCategoryServices;
