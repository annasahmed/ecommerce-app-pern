import React from "react";

const Stock = ({ stock, card }) => {
	return (
		<>
			{stock <= 0 ? (
				<span className="bg-customRed-100 dark:bg-customGray-600 text-customRed-500 dark:text-customRed-400 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-medium font-serif">
					Stock Out
				</span>
			) : (
				<span>
					<span
						className={`${
							card
								? "bg-customGray-100 dark:bg-customGray-600 text-customTeal-500 rounded-full text-xs px-2 py-0 font-medium"
								: "bg-customTeal-100 dark:bg-customGray-600 text-customTeal-500 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-semibold  font-serif"
						}`}>
						Stock :
						<span className="text-customRed-500 dark:text-customRed-400 dark:bg-customGray-600 pl-1 font-bold">
							{stock}{" "}
						</span>
					</span>
				</span>
			)}
		</>
	);
};

export default Stock;
