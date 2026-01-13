import Multiselect from "multiselect-react-dropdown";
import Error from "../others/Error";
import LabelArea from "../selectOption/LabelArea";

export default function InputMultipleSelectField({
	label,
	inputName,
	inputPlaceholder,
	options = [],
	errorName,
	setValue, // from react-hook-form
	required = false,
	defaultSelected = [],
	isVertical,
	onChange = () => {},
	isHandleChange = true,
}) {
	const handleChange = (selectedList) => {
		// console.log("cjnaskdmsam1");
		if (isHandleChange) {
			const ids = selectedList.map((item) => item.id);
			// onChange(selectedList);
			setValue(inputName, ids, { shouldValidate: true });
		} else {
			
			onChange(selectedList);
		}
	};

	return (
		<div
			className={
				isVertical
					? "flex flex-col gap-2"
					: `grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6`
			}>
			<LabelArea label={label} required={required} />
			<div className="col-span-8 sm:col-span-4">
				<Multiselect
					options={Array.isArray(options) ? options : []}
					displayValue="name"
					selectedValues={defaultSelected}
					onSelect={handleChange}
					onRemove={handleChange}
					placeholder={inputPlaceholder}
					onChange={onChange}
					// showCheckbox
					style={{
						chips: { background: "#3B82F6" }, // Tailwind blue-500
						multiselectContainer: {
							// border: "1px solid #D1D5DB",
							// borderRadius: "0.5rem",
						},
						// padding:"20px"
					}}
					avoidHighlightFirstOption
				/>
				<Error errorName={errorName} />
			</div>
		</div>
	);
}
