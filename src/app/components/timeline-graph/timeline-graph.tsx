"use client";
import { RootState } from "@/app/libs/store/store";
import React from "react";
import { useSelector } from "react-redux";

const TimelineGraphExact: React.FC = () => {
	const milestones = useSelector((state: RootState) => state.newPilotForm.milestones);

	const containerHeight = 300 + milestones.length * 30;

	// Calculate first and last milestone positions
	const firstMilestonePos = milestones.length > 0 ? `calc(25% + 60px + 0px)` : "0px";
	const lastMilestonePos = milestones.length > 0 ? `calc(25% + 60px + ${(milestones.length - 1) * 50}px)` : "0px";

	return (
		<div className="relative rounded-lg">
			<div className="w-full min-h-[475px] flex flex-row">
				{/* Planning Section */}
				<div className="w-[25%] flex flex-col gap-20">
					<div>
						<p className="text-body2 font-light text-others-blackShade_1">Planning begins</p>
						<p className="text-body2 font-light text-others-blackShade_1">15th Jan 25</p>
					</div>

					<div className="flex-1 custom-dashed-border flex">
						<div
							className="w-full h-50 bg-gray-6 rounded-[10px] relative top-[25%]"
							style={{ top: firstMilestonePos }}></div>
					</div>
					<div className="rounded-[55px] bg-disable px-20 py-[13px] text-center text-button font-regular mt-auto">
						Planning
					</div>
				</div>

				{/* Execution Section */}
				<div className="w-[50%] flex flex-col gap-20">
					<div>
						<p className="text-subtitle2 font-semibold text-others-blackShade_1">Execution begins</p>
						<p className="text-subtitle2 font-semibold text-others-blackShade_1">21st Feb 25</p>
					</div>

					<div
						className={`flex-1 custom-dashed-border flex relative`}
						style={{ minHeight: `${containerHeight}px` }}>
						<div className="w-full h-50 bg-primary-lightGreen1 rounded-[10px] relative top-[25%]"></div>

						{/* Milestones */}
						{milestones.map((milestone, index) => {
							const verticalPosition = `calc(25% + 60px + ${index * 50}px)`; // Vertical spacing
							const horizontalPosition = `${(index % milestones.length) * (100 / milestones.length)}% `; // Shift horizontally every 4 steps

							return (
								<div
									key={index}
									className="absolute flex items-center justify-center px-20 py-[6px] text-body2 font-light bg-white border border-primary-lightGreen1 text-gray-1 rounded-full shadow-sm"
									style={{
										top: verticalPosition,
										left: horizontalPosition,
									}}>
									{milestone.name}
								</div>
							);
						})}
					</div>

					<div className="rounded-[55px] bg-primary-lightGreen1 px-20 py-[13px] text-white text-center text-button font-regular mr-20 ml-20 mt-auto">
						Execution
					</div>
				</div>

				{/* Closing Section */}
				<div className="w-[25%] flex flex-col gap-20">
					<div>
						<p className="text-body2 font-light text-others-blackShade_1">Closing</p>
						<p className="text-body2 font-light text-others-blackShade_1">19th Mar 25</p>
					</div>

					<div className="flex-1 custom-dashed-border flex">
						<div
							className="w-full h-50 bg-gray-6 rounded-[10px] relative top-[25%]"
							style={{ top: lastMilestonePos }}></div>
					</div>
					<div className="rounded-[55px] bg-disable px-20 py-[13px] text-center text-button font-regular mt-auto">
						Closing
					</div>
				</div>
			</div>
		</div>
	);
};

export default TimelineGraphExact;
