import { Select } from "@windmill/react-ui";
import Error from "../others/Error";
import LabelArea from "../selectOption/LabelArea";

const InputSelectField = ({
	label,
	register,
	inputLabel,
	inputName,
	options = [],
	inputPlaceholder,
	required,
	errorName,
	defaultValue,
	isVertical,
	className = "",
}) => {
	return (
		<div
			className={`${
				isVertical
					? "flex flex-col gap-2"
					: "grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
			} ${className}`}>
			<LabelArea label={label} required={required} />
			<div className="col-span-8 sm:col-span-4">
				<Select
					// defaultValue={defaultValue}
					name={inputName}
					{...register(`${inputName}`, {
						required: required ? `${inputLabel} is required!` : false,
						setValueAs: (value) => {
							return value === "" ? null : value;
						},
					})}>
					<option value="">{inputPlaceholder || "None"}</option>
					{options}
				</Select>
				<Error errorName={errorName} />
			</div>
		</div>
	);
};

export default InputSelectField;
