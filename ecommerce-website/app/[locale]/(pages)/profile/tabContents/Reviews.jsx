import { Star } from "lucide-react";
import React from "react";

const Reviews = () => {
	return (
		<div className="space-y-4">
			<div className="bg-white rounded-lg p-6 border">
				<div className="flex gap-4 mb-4">
					<div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
						📦
					</div>
					<div className="flex-1">
						<div className="font-semibold mb-2">Product Name Here</div>
						<div className="flex gap-1 mb-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className="w-5 h-5 fill-secondary text-secondary"
								/>
							))}
						</div>
						<p className="text-gray-600 text-sm">
							Great product! Really happy with the quality and fast delivery.
						</p>
						<div className="text-xs text-gray-400 mt-2">
							Reviewed on 15 Nov 2025
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Reviews;
