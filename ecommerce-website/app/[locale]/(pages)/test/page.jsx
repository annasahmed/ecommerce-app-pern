import Image from "next/image";
import React from "react";

const TestPage = () => {
	return (
		<div>
			<Image
				src={
					"https://api.babiesnbaba.com/uploads/baby-feeder-cover-welcome-to-the-world-red-little-home%20(2).jpg"
				}
				width={600}
				height={600}
				className="w-40 h-40"
			/>
		</div>
	);
};

export default TestPage;
