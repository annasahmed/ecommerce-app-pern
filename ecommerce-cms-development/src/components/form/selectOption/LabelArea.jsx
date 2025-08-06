import React from "react";
import { Label } from "@windmill/react-ui";

const LabelArea = ({ label, required }) => {
	return (
		<Label className=" col-span-4 sm:col-span-2 font-medium text-sm">
			{label}
			{required && <span className="text-red-500 ml-1 text-base">*</span>}
		</Label>
	);
};

export default LabelArea;
