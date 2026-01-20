import { ChevronRight } from "lucide-react";
import React from "react";

// arrowsPosition: "outside" | "inside"
const SliderArrows = ({ arrowsPosition, prevRef, nextRef }) => {
	return (
		<>
			<div
				ref={prevRef}
				className={`absolute ${
					arrowsPosition === "outside" ? "-left-12" : "left-6 max-md:left-2"
				} top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-light bg-secondary/85 hover:brightness-95 shadow-md rounded-full p-1 max-md:p-0.5 text-xl select-none`}>
				<ChevronRight className="rotate-180 size-6 max-md:size-5" />
			</div>
			<div
				ref={nextRef}
				className={`absolute ${
					arrowsPosition === "outside" ? "-right-12" : "right-6 max-md:right-2"
				} top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-light bg-secondary/85 hover:brightness-95 shadow-md rounded-full p-1 max-md:p-0.5 text-xl select-none`}>
				<ChevronRight className="size-6 max-md:size-5" />
			</div>
		</>
	);
};

export default SliderArrows;
