import React from "react";
import Icon from "../icon/icons";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface PilotCardTypes {
	pilotName: string;
	description: string;
	objective: string;
	location: string;
	pilotBudgetCurrency: string;
	pilotEstimatedBudget: number;
	fundedBy: string;
	technologySolution: string;
	technologyProvider: string;
	devCoLeadingPilot: string;
	pilotLead: string;
	pilotTeam: string;
	attachments: string;
	milestones?: { name: string; date: string }[]; // Optional milestones
	createdDate: string; // Optional date
	currStage: string;
	submittedBy: { name: string; email: string; profilePhoto: string };
	id: string;
}

const PIOLT_STAGES: string[] = ["Planning", "Ploting", "Assessment", "Scaling"];

const PioltCard = ({
	pilotName,
	description,
	location,
	createdDate,
	submittedBy,
	currStage,
	attachments,
	pilotTeam,
	id,
}: PilotCardTypes) => {
	const PIOLT_STAGES_LOWER: string[] = PIOLT_STAGES.map((stg) => stg.toLowerCase());
	const currentIndex = PIOLT_STAGES_LOWER.indexOf(currStage.toLowerCase());
	const router = useRouter();

	const editPilot = () => {
		console.log(id);
		router.push(`/create-pilot?id=${id}`);
	};

	return (
		<div className="border rounded-[10px] flex flex-col md:flex-row">
			{/* Image Section */}
			<div className="flex-shrink-0 w-full md:w-1/2">
				<Image
					src={attachments[0]}
					alt={pilotName}
					className="max-w-[100%] w-full object-cover rounded-lg h-full"
					width={560}
					height={500}
				/>
			</div>

			{/* Content Section */}
			<div className="flex-grow flex flex-col gap-40 px-30 py-20 justify-between">
				<div className="flex flex-col gap-10">
					<h2 className="text-h5 font-semibold">{pilotName}</h2>
					<p className="text-title2 font-light">{description}</p>
				</div>

				{/* Meta Info */}
				<div className="flex flex-row items-center text-gray-500 text-sm gap-10 flex-wrap">
					<div className="w-[48.5%] border border-divider rounded-[10px] flex flex-row gap-10 items-center px-20 py-10">
						<Icon name="location" />
						<p className="text-title2 font-regular">{location}</p>
					</div>
					<div className="w-[48.5%] border border-divider rounded-[10px] flex flex-row gap-10 items-center px-20 py-10">
						<Icon name="calender" />
						<p className="text-title2 font-regular">{createdDate}</p>
					</div>
					<div className="w-[48.5%] border border-divider rounded-[10px] flex flex-row gap-10 items-center px-20 py-10">
						<Icon name="setting" />
						<p className="text-title2 font-regular">{pilotTeam}</p>
					</div>
					<div className="w-[48.5%] border border-divider rounded-[10px] flex flex-row gap-10 items-center px-20 py-10">
						<div className="border border-black rounded-full">
							<Avatar className="w-40 h-40">
								<AvatarImage
									src={submittedBy.profilePhoto || ""}
									alt="@shadcn"
									className="w-40 h-40"
								/>
								<AvatarFallback className="text-body1 font-semibold">
									{submittedBy?.name[0]?.toUpperCase() || ""}
								</AvatarFallback>
							</Avatar>
						</div>

						<p className="text-title2 font-regular">{submittedBy.name}</p>
					</div>
				</div>

				<div className="flex flex-col gap-20">
					<div className="flex flex-row gap-10 justify-start items-center">
						<Icon name={currStage.toLowerCase()} />
						<p className="text-subtitle2 font-semibold">{currStage}</p>
					</div>
					<div className="flex flex-row gap-10">
						{PIOLT_STAGES.map((tag, index) => {
							let bgColor = "bg-divider";
							if (index < currentIndex) bgColor = "bg-status-green";
							if (index === currentIndex) bgColor = "bg-status-orange";
							return (
								<div
									key={index}
									className="flex flex-col gap-10 w-1/4 items-center">
									<div className={`w-full h-[12px] ${bgColor} rounded-full`}></div>
									<p className="text-subtitle2 font-semibold">{tag}</p>
								</div>
							);
						})}
					</div>
				</div>

				{/* Actions */}
				<div className="flex gap-10 justify-end">
					<button
						className={`px-20 py-[13px] border border-secondary-brown text-secondary-brown rounded-full text-button font-regular flex gap-10 items-center`}
						onClick={editPilot}>
						Edit
						<Icon name="chevron-down"></Icon>
					</button>

					<button
						className={`px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}
						onClick={() => alert(`clicked for ${name}`)}>
						View Details
					</button>
				</div>
			</div>
		</div>
	);
};

export default PioltCard;
