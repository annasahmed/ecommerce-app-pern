import livingRoom from "@/app/assets/themes/furnitureTheme/sofa.png";
import bedRoom from "@/app/assets/themes/furnitureTheme/drawers.png";
import kitchen from "@/app/assets/themes/furnitureTheme/blender.png";

export const parentCategories = {
	total: 3,
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
				url: 'image/upload/v1757454591/sofa_boh7yn.png',
				title: "sofa.png",
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
		{
			id: 6,
			title: "Bedroom",
			description: null,
			slug: "bedroom",
			icon: null,
			created_at: "2025-08-12T15:50:55.964Z",
			// medium can be null
			medium: {
				id: 2,
				url: 'image/upload/v1757454602/drawers_apq8xt.png',
				title: "drawer.png",
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
		{
			id: 5,
			title: "Kitchen",
			description: null,
			slug: "kitchen",
			icon: null,
			created_at: "2025-08-12T15:50:55.964Z",
			// medium can be null
			medium: {
				id: 1,
				url: 'image/upload/v1757454603/blender_rx13af.png',
				title: "blender.png",
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
