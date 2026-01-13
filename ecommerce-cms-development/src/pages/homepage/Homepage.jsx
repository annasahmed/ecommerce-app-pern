import React, { useEffect, useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SectionForm from "./SectionForm";
import HomepageSectionsServices from "@/services/HomepageSectionsServices";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { set } from "immutable";

const ITEM_TYPE = "SECTION";

// Draggable Section
const DraggableSection = ({
	section,
	index,
	moveSection,
	onUpdate,
	onDelete,
}) => {
	const ref = React.useRef(null);

	const [, drop] = useDrop({
		accept: ITEM_TYPE,
		hover(item) {
			if (item.index === index) return;
			moveSection(item.index, index);
			item.index = index;
		},
	});

	const [, drag] = useDrag({
		type: ITEM_TYPE,
		item: { index },
	});

	drag(drop(ref));

	return (
		<div ref={ref} className="border p-4 rounded mb-4 bg-white shadow">
			<SectionForm section={section} onUpdate={onUpdate} onDelete={onDelete} />
		</div>
	);
};

const Homepage = () => {
	const [sections, setSections] = useState([]);
	const [loading, setLoading] = useState(false);
	const [refreshKey, setRefreshKey] = useState(false);

	// Fetch sections
	useEffect(() => {
		setLoading(true);
		HomepageSectionsServices.getHomepageSections()
			.then((res) => {
				console.log(res, "chkkin");

				setSections(res || []);
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	}, [refreshKey]);

	// Drag & Drop
	const moveSection = useCallback((fromIndex, toIndex) => {
		setSections((prev) => {
			const updated = [...prev];
			const [moved] = updated.splice(fromIndex, 1);
			updated.splice(toIndex, 0, moved);
			return updated;
		});
	}, []);

	const handleUpdate = (updatedSection) => {
		setSections((prev) =>
			prev.map((s) => (s.id === updatedSection.id ? updatedSection : s)),
		);
	};

	const handleDelete = async (id) => {
		if (!`${id}`.includes("_uuid4"))
			await HomepageSectionsServices.deleteHomepageSection(id);
		setSections((prev) => prev.filter((s) => s.id !== id));
	};

	const handleAdd = (type) => {
		let config = {};
		if (type === "slider") config = { images: [], autoplay: false };
		if (type === "banner") config = { image: null, link: "" };
		if (type === "categories") config = { category_ids: [], layout: "grid" };
		if (type === "products") config = { category_id: "", limit: 10 };
		if (type === "tab")
			config = { number_of_tabs: 3, tab_categories: [], products_per_tab: 10 };

		const newSection = { id: uuidv4() + "_uuid4", type, title: null, config };
		setSections((prev) => [...prev, newSection]);
	};

	const handleSave = async () => {
		setLoading(true);
		try {
			// Add/update all sections
			await Promise.all(
				sections.map((sec) => {
					console.log(sec, "chkking section");

					if (sec.title && typeof sec.title === "string") {
						sec.title = { en: sec.title };
					}

					if (`${sec.id}`.includes("_uuid4")) {
						// Create a copy without the temporary id
						const { id, ...payload } = sec;
						return HomepageSectionsServices.addHomepageSection(payload);
					} else {
						return HomepageSectionsServices.updateHomepageSection(sec.id, sec);
					}
				}),
			);

			// Save order
			// await HomepageSectionsServices.reorderHomepageSection(
			// 	null,
			// 	sections.map((s, i) => ({ id: s.id, position: i + 1 })),
			// );

			toast.success("Homepage sections saved!");
			setRefreshKey((prev) => !prev);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="p-4">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl font-bold">Homepage Builder</h1>
					<div className="flex items-center gap-2">
						<select
							onChange={(e) => {
								if (!e.target.value) return;
								handleAdd(e.target.value);
								e.target.value = "";
							}}
							className="border p-2 rounded">
							<option value="">Add Section</option>
							<option value="slider">Slider</option>
							<option value="banner">Banner</option>
							<option value="categories">Categories</option>
							<option value="products">Products</option>
							<option value="tab">Tabs</option>
						</select>
						<button
							onClick={handleSave}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
							Save
						</button>
					</div>
				</div>

				{loading && <p>Loading...</p>}

				{sections.map((section, index) => (
					<DraggableSection
						key={section.id}
						section={section}
						index={index}
						moveSection={moveSection}
						onUpdate={handleUpdate}
						onDelete={handleDelete}
					/>
				))}
			</div>
		</DndProvider>
	);
};

export default Homepage;
