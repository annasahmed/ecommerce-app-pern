import livingRoom from "@/app/assets/themes/furnitureTheme/sofa.png";
import bedRoom from "@/app/assets/themes/furnitureTheme/drawers.png";
import kitchen from "@/app/assets/themes/furnitureTheme/blender.png";

export const parentCategories = {
	total: 1,
	records: [
		{
			id: 5,
			title: "Living Room",
			description: null,
			slug: "living-room",
			icon: null,
			created_at: "2025-08-12T15:50:55.964Z",
			// medium can be null
			medium: {
				id: 1,
				url: "ecommerce/uploads/beauty_1755014531474.png",
				title: "beauty.png",
				size: 1698,
				user_id: 1,
				created_at: "2025-08-12T16:02:13.728Z",
				updated_at: "2025-08-12T16:02:13.728Z",
			},
			categories: [
				{
					id: 1,
					slug: "category2",
					title: "Category2",
					description: "Category1 Description",
				},
				{
					id: 2,
					slug: "aeawm",
					title: "new category",
					description: "sdfkemdeke",
				},
			],
		},
	],
	limit: 100,
	page: 1,
};
