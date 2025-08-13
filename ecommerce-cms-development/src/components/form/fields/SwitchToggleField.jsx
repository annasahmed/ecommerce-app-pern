import LabelArea from "../selectOption/LabelArea";
import SwitchToggle from "../switch/SwitchToggle";

const SwitchToggleField = ({ label, handleProcess, processOption }) => {
	return (
		<div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
			<LabelArea label={label} />
			<div className="col-span-8 sm:col-span-4">
				<SwitchToggle
					handleProcess={handleProcess}
					processOption={processOption}
				/>
			</div>
		</div>
	);
};

export default SwitchToggleField;
