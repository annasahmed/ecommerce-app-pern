import React from "react";

const Error = ({ errorName }) => {
	return (
		<>
			{errorName && (
				<span className="text-customRed-400 text-sm mt-2">
					{errorName.message}
				</span>
			)}
		</>
	);
};

export default Error;
