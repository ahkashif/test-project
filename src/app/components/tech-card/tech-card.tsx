import React from "react";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "../icon/icons";

interface TechCardProps {
	_id: string;
	techName: string;
	techDescription: string;
	techProvider: string;
	owner: string;
	selectedOptions: string[];
	sectorOptions: string[];
	techSrcOptions: string[];
	addedValue: string[];
	devCo: string;
	businessChallenge: string;
	challenges: { name: string; description: string }[];
	attachments: string;
	currentStage: string;
	technologyId: string;
	createdAt: string;
}

const TECH_STAGES: string[] = ["Screening", "Scouting", "Engagement"];

const TechCard = ({
	techName,
	techDescription,
	techProvider,
	owner,
	sectorOptions,
	currentStage,
	attachments,
	createdAt,
}: TechCardProps) => {
	const TECH_STAGES_LOWER: string[] = TECH_STAGES.map((stg) => stg.toLowerCase());
	const currentIndex = TECH_STAGES_LOWER.indexOf(currentStage.toLowerCase());

	return (
		<div className="border rounded-[10px] flex flex-col md:flex-col w-[50%]">
			{/* Image Section */}
			<div className="flex-shrink-0 w-full">
				<Image
					src={attachments}
					alt={techName}
					className="max-w-[100%] w-full object-cover rounded-lg"
					width={544}
					height={247}
				/>
			</div>

			{/* Content Section */}
			<div className="flex-grow flex flex-col justify-between">
				<div className="flex flex-col gap-20 p-20 border-b border-divider">
					<div className="flex items-center gap-10">
						<div className="border border-black rounded-full w-fit">
							<Avatar className="w-40 h-40">
								<AvatarImage
									src={""}
									alt="@shadcn"
									className="w-40 h-40"
								/>
								<AvatarFallback className="text-body1 font-semibold">{owner[0]?.toUpperCase() || ""}</AvatarFallback>
							</Avatar>
						</div>
						<span className="text-title2 text-gray-1">Requested By {owner}</span>
					</div>
					<h2 className="text-h5 font-semibold">{techName}</h2>
					<p className="text-title2 font-light">{techDescription}</p>
				</div>

				{/* Meta Info */}
				<div className="flex flex-row items-center text-gray-500 text-sm gap-10 flex-wrap p-30 border-b border-divider">
					<div className="w-[48.5%] border border-divider rounded-[10px] flex flex-row gap-10 items-center px-20 py-10">
						<Icon name="calender" />
						<p className="text-title2 font-regular">{new Date(createdAt).toLocaleDateString()}</p>
					</div>
					<div className="w-[48.5%] border border-divider rounded-[10px] flex flex-row gap-10 items-center px-20 py-10">
						<Icon name="location" />
						<p
							className="text-title2 font-regular truncate overflow-hidden text-ellipsis"
							title={sectorOptions.join(", ")}>
							{sectorOptions.join(", ")}
						</p>
					</div>
					<div className="w-full border border-divider rounded-[10px] flex flex-row gap-10 items-center px-20 py-10">
						<Icon name="setting" />
						<p className="text-title2 font-regular">{techProvider}</p>
					</div>
				</div>

				<div className="flex flex-col gap-20 p-20 border-b border-divider">
					<div className="flex flex-row gap-10 justify-start items-center">
						<Icon name="edit" />
						<p className="text-subtitle2 font-semibold">{currentStage}</p>
					</div>
					<div className="flex flex-row gap-10">
						{TECH_STAGES.map((tag, index) => {
							let bgColor = "bg-divider";
							if (index < currentIndex) bgColor = "bg-status-green";
							if (index === currentIndex) bgColor = "bg-status-orange";
							return (
								<div
									key={index}
									className="flex flex-col gap-10 w-1/3 items-center">
									<div className={`w-full h-[12px] ${bgColor} rounded-full`}></div>
									<p className="text-subtitle2 font-semibold">{tag}</p>
								</div>
							);
						})}
					</div>
				</div>

				{/* Actions */}
				<div className="flex gap-10 justify-end p-20">
					<button
						className={`px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}
						onClick={() => alert(`Viewing details for ${techName}`)}>
						View Details
					</button>
				</div>
			</div>
		</div>
	);
};

export default TechCard;
