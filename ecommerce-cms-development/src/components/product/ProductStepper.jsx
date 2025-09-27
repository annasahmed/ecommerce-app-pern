import React from "react";

const steps = [
	{ id: 1, title: "Product Information" },
	{ id: 2, title: "Translations" },
	{ id: 3, title: "Variants & Inventory" },
];

export default function ProductStepper({ currentStep = 1 }) {
	return (
		<header
			className={`w-full relative p-6 rounded-lg bg-customGray-50 dark:border-customGray-700 dark:bg-customGray-800 dark:text-customGray-300`}>
			<div className="flex flex-col space-y-4">
				{/* Steps */}
				<div className="flex items-center justify-between">
					{steps.map((step, idx) => {
						const isActive = currentStep === step.id;
						const isCompleted = currentStep > step.id;

						return (
							<div key={step.id} className="flex items-center w-full">
								{/* Circle */}
								<div
									className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold 
                  ${
										isActive
											? "bg-purple-600 text-white"
											: isCompleted
											? "bg-purple-200 text-purple-600 dark:bg-purple-800 dark:text-purple-200"
											: "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
									}`}>
									{step.id}
								</div>

								{/* Title */}
								<span
									className={`ml-2 text-sm font-medium whitespace-nowrap
                  ${
										isActive
											? "text-purple-600 dark:text-purple-400"
											: "text-gray-700 dark:text-gray-300"
									}`}>
									{step.title}
								</span>

								{/* Connector line (except last step) */}
								{idx < steps.length - 1 && (
									<div className="flex-1 h-0.5 mx-2 bg-gray-300 dark:bg-gray-600"></div>
								)}
							</div>
						);
					})}
				</div>

				{/* Progress Bar */}
				<div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
					<div
						className="bg-purple-600 h-2 rounded-full transition-all"
						style={{
							width: `${(currentStep / steps.length) * 100}%`,
						}}></div>
				</div>
			</div>
		</header>
	);
}
