import { Input } from "@windmill/react-ui";

const InputValue = ({
	name,
	label,
	type,
	disabled,
	register,
	required,
	maxValue,
	minValue,
	currency,
	product,
	defaultValue,
	placeholder,
}) => {
	const value = {
		valueAsNumber: true,
		required: required ? `${label} is required!` : false,
		max: {
			value: maxValue,
			message: `Maximum value ${maxValue}!`,
		},
		min: {
			value: minValue,
			message: `Minimum value ${minValue}!`,
		},
		pattern: {
			value: /^[0-9]*$/,
			message: `Invalid ${label}!`,
		},
	};

	return (
		<>
			<div className={`flex flex-row`}>
				{product && (
					<span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-customGray-300 bg-customGray-50 text-customGray-500 text-sm  focus:border-customTeal-300 dark:bg-customGray-700 dark:text-customGray-300 dark:border dark:border-customGray-600">
						{currency}
					</span>
				)}
				<Input
					{...register(`${name}`, value)}
					type={type}
					name={name}
					step={0.01}
					disabled={disabled}
					placeholder={placeholder}
					defaultValue={defaultValue}
					className={`mr-2 p-2 ${product && "rounded-l-none"}`}
				/>
			</div>
		</>
	);
};

export default InputValue;
