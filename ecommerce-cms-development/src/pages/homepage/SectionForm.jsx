import ImageSelectorField from "@/components/form/fields/ImageSelectorField";
import InputAreaField from "@/components/form/fields/InputAreaField";
import InputMultipleSelectField from "@/components/form/fields/InputMultipleSelectField";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import CategoryServices from "@/services/CategoryServices";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const SectionForm = ({ section, onUpdate, onDelete }) => {
	const {
		control,
		register,
		setValue,
		formState: { errors },
	} = useForm();
	const [categories, setCategories] = useState([]);
	const { showingTranslateValue, showSelectedLanguageTranslation } =
		useUtilsFunction();

	const [selectedImage, setSelectedImage] = useState(
		section.type === "banner"
			? section.config?.image || null
			: section.type === "slider"
			? section.config?.images || []
			: null,
	);
	const [selectedImageUrl, setSelectedImageUrl] = useState(
		section.type === "slider"
			? section.config?.images || []
			: section.type === "banner"
			? section.config?.image
			: null,
	);
	// const [selectedImageUrl, setSelectedImageUrl] = useState(
	// 	section.type === "slider"
	// 		? section.config?.images?.length > 0
	// 			? section.config?.images?.map(
	// 					(v) => import.meta.env.VITE_APP_CLOUDINARY_URL + v,
	// 			  )
	// 			: [] || []
	// 		: section.type === "banner"
	// 		? section.config?.image
	// 			? import.meta.env.VITE_APP_CLOUDINARY_URL + section.config.image
	// 			: []
	// 		: [],
	// );

	// Fetch categories
	useEffect(() => {
		CategoryServices.getAllCategories().then((data) => {
			setCategories(data?.records || []);
		});
	}, []);

	// Sync image changes to section config
	useEffect(() => {
		if (section.type === "slider") {
			onUpdate({
				...section,
				config: { ...section.config, images: [...selectedImage] || [] },
			});
		}
		if (section.type === "banner") {
			onUpdate({
				...section,
				config: { ...section.config, image: selectedImage || null },
			});
		}
	}, [selectedImage]);

	const categoriesOptions = useMemo(() => {
		return categories?.map((cat) => ({
			id: cat.id,
			name: showSelectedLanguageTranslation(cat?.translations, "title"),
		}));
	}, [categories]);

	console.log(selectedImageUrl, "chkking section111");

	return (
		<div>
			{/* Section Title + Delete */}
			<div className="flex justify-between items-center mb-2">
				<InputAreaField
					label="Section Title (Optional)"
					required={false}
					register={register}
					inputLabel={`section_title_${section.id}`}
					inputName={`section_title_${section.id}`}
					inputType="text"
					inputPlaceholder="Enter section title"
					errorName={errors[`section_title_${section.id}`]}
					defaultValue={showingTranslateValue(section?.title) || ""}
					isVertical
					onChange={(e) => onUpdate({ ...section, title: e.target.value })}
				/>
				<button
					type="button"
					onClick={() => onDelete(section.id)}
					className="text-red-500 font-bold ml-2 mt-2">
					Delete
				</button>
			</div>

			{/* Slider */}
			{section.type === "slider" && (
				<div className="mb-4">
					<label className="block mb-1 font-medium">Autoplay</label>
					<input
						type="checkbox"
						checked={section.config?.autoplay || false}
						onChange={(e) =>
							onUpdate({
								...section,
								config: { ...section.config, autoplay: e.target.checked },
							})
						}
					/>
					<ImageSelectorField
						label="Slider Images"
						selectedImage={selectedImage}
						setSelectedImage={setSelectedImage}
						selectedImageUrl={selectedImageUrl}
						setSelectedImageUrl={setSelectedImageUrl}
						isMultipleSelect
					/>
				</div>
			)}

			{/* Banner */}
			{section.type === "banner" && (
				<div className="mb-4">
					<ImageSelectorField
						label="Banner Image"
						selectedImage={selectedImage}
						setSelectedImage={setSelectedImage}
						selectedImageUrl={selectedImageUrl}
						setSelectedImageUrl={setSelectedImageUrl}
						isMultipleSelect={false}
					/>
					<InputAreaField
						label="Banner Link"
						required={false}
						register={register}
						inputLabel={`banner_link_${section.id}`}
						inputName={`banner_link_${section.id}`}
						inputType="text"
						inputPlaceholder="Enter banner link"
						errorName={errors[`banner_link_${section.id}`]}
						isVertical
						onChange={(e) =>
							onUpdate({
								...section,
								config: { ...section.config, link: e.target.value },
							})
						}
					/>
				</div>
			)}

			{/* Categories */}
			{section.type === "categories" && (
				<div className="mb-4">
					<InputMultipleSelectField
						label="Select Categories"
						inputName={`categories_${section.id}`}
						inputPlaceholder="Select Categories"
						options={categoriesOptions}
						setValue={setValue}
						errorName={errors[`categories_${section.id}`]}
						defaultSelected={
							categoriesOptions.filter((cat) =>
								section.config?.category_ids?.includes(cat.id),
							) || []
						}
						isVertical
						isHandleChange={false}
						onChange={(selected) => {
							onUpdate({
								...section,
								config: {
									...section.config,
									category_ids: selected.map((item) => item.id),
								},
							});
						}}
					/>
					<Controller
						name={`categories_layout_${section.id}`}
						control={control}
						defaultValue={section.config?.layout || "grid"}
						render={({ field }) => (
							<select
								{...field}
								className="border p-2 rounded w-full mt-2"
								onChange={(e) =>
									onUpdate({
										...section,
										config: { ...section.config, layout: e.target.value },
									})
								}>
								<option value="grid">Grid</option>
								<option value="slider">Slider</option>
							</select>
						)}
					/>
					<Controller
						name={`categories_design_${section.id}`}
						control={control}
						defaultValue={section.config?.design || "grid"}
						render={({ field }) => (
							<select
								{...field}
								className="border p-2 rounded w-full mt-2"
								onChange={(e) =>
									onUpdate({
										...section,
										config: { ...section.config, design: e.target.value },
									})
								}>
								<option value="circle">Circle</option>
								<option value="square">Square</option>
								<option value="fullImage">Full Image</option>
							</select>
						)}
					/>
					<InputAreaField
						label="Cateories per Row"
						required={true}
						register={register}
						inputLabel={`categories_per_row_${section.id}`}
						inputName={`categories_per_row_${section.id}`}
						inputType="number"
						inputPlaceholder="Number of products to show in each tab"
						errorName={errors[`categories_per_row_${section.id}`]}
						defaultValue={section.config?.categories_per_row}
						isVertical
						onChange={(e) =>
							onUpdate({
								...section,
								config: {
									...section.config,
									categories_per_row: Number(e.target.value),
								},
							})
						}
					/>
				</div>
			)}

			{/* Products */}
			{section.type === "products" && (
				<div className="mb-4 space-y-3">
					{/* Category */}
					<select
						className="border p-2 rounded w-full"
						value={section.config?.category_id || ""}
						onChange={(e) => {
							onUpdate({
								...section,
								config: {
									...section.config,
									category_id: e.target.value,
								},
							});
						}}>
						<option value="">Select Category</option>
						<option value="best-selling">Best Selling</option>
						<option value="sale">Sale</option>
						<option value="trending">Trending</option>

						{categories?.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{showSelectedLanguageTranslation(cat?.translations, "title")}
							</option>
						))}
					</select>

					{/* Layout */}
					<select
						className="border p-2 rounded w-full"
						value={section.config?.layout || "grid"}
						onChange={(e) =>
							onUpdate({
								...section,
								config: {
									...section.config,
									layout: e.target.value,
								},
							})
						}>
						<option value="grid">Grid</option>
						<option value="slider">Slider</option>
					</select>

					{/* Limit */}
					<InputAreaField
						label="Number of Products"
						required
						register={register}
						inputLabel={`products_limit_${section.id}`}
						inputName={`products_limit_${section.id}`}
						inputType="number"
						inputPlaceholder="Enter number of products"
						errorName={errors[`products_limit_${section.id}`]}
						isVertical
						defaultValue={section.config?.limit}
						onChange={(e) =>
							onUpdate({
								...section,
								config: {
									...section.config,
									limit: Number(e.target.value),
								},
							})
						}
					/>
				</div>
			)}

			{/* Tab Section */}
			{section.type === "tab" && (
				<div className="mb-4">
					<InputAreaField
						label="Number of Tabs"
						required={true}
						register={register}
						inputLabel={`tab_number_${section.id}`}
						inputName={`tab_number_${section.id}`}
						defaultValue={section.config?.number_of_tabs}
						inputType="number"
						inputPlaceholder="Enter number of tabs"
						errorName={errors[`tab_number_${section.id}`]}
						isVertical
						onChange={(e) =>
							onUpdate({
								...section,
								config: {
									...section.config,
									number_of_tabs: Number(e.target.value),
								},
							})
						}
					/>
					<InputMultipleSelectField
						label="Select Categories for Tabs"
						inputName={`tab_categories_${section.id}`}
						inputPlaceholder="Select categories"
						options={categoriesOptions}
						setValue={setValue}
						errorName={errors[`tab_categories_${section.id}`]}
						// defaultSelected={section.config?.tab_categories || []}
						defaultSelected={
							categoriesOptions.filter((cat) =>
								section.config?.tab_categories?.includes(cat.id),
							) || []
						}
						isVertical
						isHandleChange={false}
						onChange={(selected) =>
							onUpdate({
								...section,
								config: {
									...section.config,
									tab_categories: selected.map((item) => item.id),
								},
							})
						}
					/>
					<InputAreaField
						label="Products per Tab"
						required={true}
						register={register}
						inputLabel={`products_per_tab_${section.id}`}
						inputName={`products_per_tab_${section.id}`}
						inputType="number"
						inputPlaceholder="Number of products to show in each tab"
						errorName={errors[`products_per_tab_${section.id}`]}
						defaultValue={section.config?.products_per_tab}
						isVertical
						onChange={(e) =>
							onUpdate({
								...section,
								config: {
									...section.config,
									products_per_tab: Number(e.target.value),
								},
							})
						}
					/>
				</div>
			)}
		</div>
	);
};

export default SectionForm;
