import { useState } from "react";

const SwitchToggle = ({ id, title, handleProcess, processOption }) => {
	const [checked, setChecked] = useState(processOption);

	const toggleSwitch = () => {
		const newValue = !checked;
		setChecked(newValue);
		if (handleProcess) handleProcess(newValue);
	};

	return (
		<div className="mb-3">
			<div className="flex flex-wrap items-center">
				<label
					htmlFor={id || title}
					className="text-sm font-semibold text-gray-600 mr-2">
					{title}
				</label>

				{/* Switch */}
				<button
					id={id || title}
					type="button"
					role="switch"
					aria-checked={checked}
					onClick={toggleSwitch}
					className={`relative inline-flex items-center h-8 w-20 rounded-full transition-colors duration-300 focus:outline-none ${
						checked ? "bg-green-600" : "bg-red-600"
					}`}>
					{/* Handle */}
					<span
						className={`absolute left-1 top-1 inline-block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
							checked ? "translate-x-12" : "translate-x-0"
						}`}
					/>

					{/* Labels */}
					<span
						className={`text-xs font-medium text-white w-full text-center transition-opacity duration-300 ${
							checked ? "opacity-100" : "opacity-0"
						}`}>
						Yes
					</span>
					<span
						className={`text-xs font-medium text-white w-full text-center transition-opacity duration-300 ${
							checked ? "opacity-0" : "opacity-100"
						}`}>
						No
					</span>
				</button>
			</div>
		</div>
	);
};

export default SwitchToggle;
