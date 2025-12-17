import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

const Invoice = ({ data, currency, getNumberTwo }) => {
	return (
		<>
			<TableBody className="bg-customWhite dark:bg-customGray-800 divide-y divide-customGray-100 text-serif text-sm ">
				{data?.cart?.map((item, i) => (
					<TableRow
						key={i}
						className="dark:border-customGray-700 dark:text-customGray-400">
						<TableCell className="px-6 py-1 whitespace-nowrap font-normal text-customGray-500 text-left">
							{i + 1}{" "}
						</TableCell>
						<TableCell className="px-6 py-1 whitespace-nowrap font-normal text-customGray-500">
							<span
								className={`text-customGray-700 font-semibold  dark:text-customGray-300 text-xs ${
									item.title.length > 15 ? "wrap-long-title" : "" // Apply class conditionally
								}`}>
								{item.title}
							</span>
						</TableCell>
						<TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
							{item.quantity}{" "}
						</TableCell>
						<TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
							{currency}
							{getNumberTwo(item.price)}
						</TableCell>

						<TableCell className="px-6 py-1 whitespace-nowrap text-right font-bold text-customRed-500 dark:text-customTeal-500">
							{currency}
							{getNumberTwo(item.itemTotal)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</>
	);
};

export default Invoice;
