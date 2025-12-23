import { useStore } from "@/app/providers/StoreProvider";
import React from "react";

const BasePrice = ({ className = "", price = 0.0 }) => {
	const store = useStore();
	return (
		<span className={`whitespace-nowrap ${className}`}>
			{store.currency} {Number(price).toFixed(2)}
		</span>
	);
};

export default BasePrice;
