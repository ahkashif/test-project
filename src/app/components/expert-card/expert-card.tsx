import React from "react";
import Icon from "../icon/icons";
import Image from "next/image";

export type ExpertCardTypes = {
	name: string;
	badge: string;
	title: string;
	company: string;
	yearsOfExperience: string;
	sector: string;
	profileImage: string;
};

interface ExpertCardComp {
	expert: ExpertCardTypes;
	width: string;
}

function ExpertCard({ expert, width }: ExpertCardComp) {
	const { name, badge, title, company, yearsOfExperience, sector, profileImage } = expert;

	return (
		<div className={`border border-divider dark:border-dark-4 text-left rounded-[10px] ${width}`}>
			<div className="p-30 border-b border-divider dark:border-dark-4 bg-white rounded-[10px] dark:bg-gray-1 min-h-[255px]">
				<div className="flex flex-row gap-20">
					<div className="border border-divider dark:border-dark-4 rounded-[80px] min-w-[80px] h-[80px] relative">
						<Image
							src={profileImage}
							alt={name}
							className="w-[80px] h-[80px] rounded-full object-cover"
							loading="lazy"
							width={80}
							height={80}
						/>
						{badge && (
							<Icon
								name="star-badge"
								size={27}
								classes="absolute bottom-[-13px] right-[50%] translate-x-[50%]"
							/>
						)}
					</div>

					<div className="flex flex-col gap-20">
						<div className="bg-primary-lightGold4 rounded-full px-15 py-5 w-fit text-body3 font-light">{badge}</div>
						<div className="">
							<h4 className="text-subtitle1 font-semibold">{name}</h4>
							<h6 className="text-body2 font-light text-primary-gold">
								{title} at {company}
							</h6>
						</div>
						<p className="text-body3 font-light">
							{yearsOfExperience} in {sector}
						</p>
					</div>
				</div>
			</div>
			<div className="flex justify-between p-20 bg-primary-lightGold3_20 dark:bg-dark-2">
				<div className="flex gap-20">
					<Icon
						name="mail"
						size={24}
					/>
					<Icon
						name="calender"
						size={24}
					/>
				</div>

				<div className="flex gap-10">
					<span className="text-body2 font-light text-foreground dark:text-white">View Profile</span>

					<Icon
						name="arrow-right"
						size={24}
					/>
				</div>
			</div>
		</div>
	);
}

export default ExpertCard;
