import React from "react";
import Icon from "../icon/icons";
import Image from "next/image";

type ProfileCardTypes = {
	name: string;
	designation: string;
	avatarUrl: string;
	hasBadge: boolean;
};

function ProfileCard({ name, designation, avatarUrl, hasBadge }: ProfileCardTypes) {
	return (
		<div className="border border-divider dark:border-dark-4 text-center rounded-[10px]">
			<div className="p-30 border-b border-divider dark:border-dark-4 bg-white rounded-[10px] dark:bg-gray-1">
				<div className="flex flex-col items-center">
					<div className="border border-divider dark:border-dark-4 rounded-full w-[130px] h-[130px] relative mb-[18.5px]">
						<Image
							src={avatarUrl}
							alt={name}
							className="w-full h-full rounded-full"
							loading="lazy"
							width={130}
							height={130}
						/>
						{hasBadge && (
							<Icon
								name="star-badge"
								size={27}
								classes="absolute bottom-[-13px] right-[50%] translate-x-[50%]"
							/>
						)}
					</div>

					<h6 className="font-semibold text-subtitle1 text-dark-1 dark:text-white">{name}</h6>
					<p className="text-body2 font-light text-primary-gold">{designation}</p>
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

export default ProfileCard;
