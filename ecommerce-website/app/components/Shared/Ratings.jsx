import { Star } from "lucide-react";
import React from "react";

const Ratings = ({ rating = 4.5 }) => {
	return (
		<div className="flex text-yellow-500">
			{[...Array(5)].map((_, i) => (
				<Star
                className="size-4 max-md:size-3"
					key={i}
					
					fill={i < Math.floor(rating) ? "currentColor" : "none"}
				/>
			))}
		</div>
	);
};

export default Ratings;
