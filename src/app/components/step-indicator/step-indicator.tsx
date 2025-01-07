"use client";
import React from "react";

interface StepIndicatorProps {
	steps: string[]; // List of steps
	currentStep: number; // Index of the current active step (0-based)
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
	return (
		<div className="flex flex-col gap-20 px-20 py-30">
			{steps.map((step, index) => {
				const isActive = index === currentStep;
				const isCompleted = index < currentStep;

				return (
					<div
						key={index}
						className="flex items-center gap-10 text-sm">
						{/* Circle Indicator */}
						<div
							className={`flex items-center justify-center w-[34px] h-[34px] rounded-full text-center font-light text-body1 ${
								isActive
									? "border border-black text-black"
									: isCompleted
									? "bg-status-green text-white"
									: "border-2 border-gray-300 text-gray-400"
							}`}>
							{isCompleted ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="11"
									viewBox="0 0 16 11"
									fill="none">
									<path
										d="M13.1899 0.447642C13.8328 -0.149214 14.875 -0.149214 15.5179 0.447642C16.1023 0.990237 16.1554 1.83931 15.6773 2.43763L15.5179 2.60905L6.96259 10.5524C6.37808 11.0951 5.46339 11.1443 4.81897 10.7001L4.63436 10.5521L0.481821 6.69453C-0.160847 6.09752 -0.160572 5.12983 0.482436 4.53313C1.06699 3.99068 1.98149 3.94157 2.62578 4.38567L2.81036 4.5337L5.79753 7.31017L13.1899 0.447642Z"
										fill="white"
									/>
								</svg>
							) : (
								index + 1
							)}
						</div>

						{/* Step Label */}
						<span
							className={`font-semibold text-subtitle2 ${
								isActive ? "text-black" : isCompleted ? "text-black" : "text-gray-400"
							}`}>
							{step}
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default StepIndicator;
