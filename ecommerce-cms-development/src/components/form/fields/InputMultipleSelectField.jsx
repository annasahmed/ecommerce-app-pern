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
}) {
	const handleChange = (selectedList) => {
		const ids = selectedList.map((item) => item.id);
		setValue(inputName, ids, { shouldValidate: true });
	};

	return (
		<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
			<LabelArea label={label} required={required} />
			<div className="col-span-8 sm:col-span-4">
				<Multiselect
					options={Array.isArray(options) ? options : []}
					displayValue="name"
					selectedValues={defaultSelected}
					onSelect={handleChange}
					onRemove={handleChange}
					placeholder={inputPlaceholder}
					// showCheckbox
					// style={{
					// 	chips: { background: "#3B82F6" }, // Tailwind blue-500
					// 	multiselectContainer: {
					// 		border: "1px solid #D1D5DB",
					// 		borderRadius: "0.5rem",
					// 	},
					// }}
					avoidHighlightFirstOption
				/>
				<Error errorName={errorName} />
			</div>
		</div>
	);
}
