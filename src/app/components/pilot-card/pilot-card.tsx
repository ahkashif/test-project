import React from "react";
import Icon from "../icon/icons";
import Image from "next/image";
import { renderDate } from "@/app/libs/common/utils";

interface PilotCardTypes {
	name: string;
	description: string;
	location: string;
	startDate: string;
	owner: string;
	stage: string;
	objective: string;
	image: string;
}

const PIOLT_STAGES: string[] = ["Planning", "Ploting", "Assessment", "Scaling"];

const PioltCard = ({ name, description, location, startDate, owner, stage, objective, image }: PilotCardTypes) => {
	const PIOLT_STAGES_LOWER: string[] = PIOLT_STAGES.map((stg) => stg.toLowerCase());
	const currentIndex = PIOLT_STAGES_LOWER.indexOf(stage.toLowerCase());

	return (
		<div className="border rounded-[10px] flex flex-col md:flex-row">
			{/* Image Section */}
			<div className="flex-shrink-0 w-full md:w-1/2">
				<Image
					src={image}
					alt={name}
					className="max-w-[100%] w-full object-cover rounded-lg"
					width={560}
					height={500}
				/>
			</div>

			{/* Content Section */}
			<div className="flex-grow flex flex-col gap-40 px-30 py-20 justify-between">
				<div className="flex flex-col gap-10">
					<h2 className="text-h5 font-semibold">{name}</h2>
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
						<p className="text-title2 font-regular">{renderDate(startDate)}</p>
					</div>
					<div className="w-[48.5%] border border-divider rounded-[10px] flex flex-row gap-10 items-center px-20 py-10">
						<Icon name="setting" />
						<p className="text-title2 font-regular">{objective}</p>
					</div>
					<div className="w-[48.5%] border border-divider rounded-[10px] flex flex-row gap-10 items-center px-20 py-10">
						<div className="border border-black rounded-full">
							<Image
								src="/avatar-small-1.svg"
								alt={owner}
								width={22}
								height={22}
							/>
						</div>

						<p className="text-title2 font-regular">{owner}</p>
					</div>
				</div>

				<div className="flex flex-col gap-20">
					<div className="flex flex-row gap-10 justify-start items-center">
						<Icon name={stage.toLowerCase()} />
						<p className="text-subtitle2 font-semibold">{stage}</p>
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
						onClick={() => alert(`clicked for ${name}`)}>
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
