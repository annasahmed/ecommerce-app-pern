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
}) => {
	return (
		<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
			<LabelArea label={label} required={required} />
			<div className="col-span-8 sm:col-span-4">
				<Select
					// multiple={multiple}
					// multiple
					defaultValue={defaultValue}
					name={inputName}
					{...register(`${inputName}`, {
						required: required ? `${inputLabel} is required!` : false,
					})}>
					<option value="" disabled hidden>
						{inputPlaceholder}
					</option>
					{options}
					{/* {parentCategories?.map((pCat, index) => {
						return (
							<option value={pCat.id} key={index}>
								{showingTranslateValue(pCat?.title)}
							</option>
						);
					})} */}
				</Select>
				<Error errorName={errorName} />
			</div>
		</div>
	);
};

export default InputSelectField;
