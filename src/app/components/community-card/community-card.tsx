import React from "react";
import Image from "next/image";
import { getRelativeTime } from "@/app/libs/common/utils";

export interface CommunityCardType {
	communityName: string;
	postedDate: string;
	members: number;
	communityImage: string;
}

function CommunityCard({ communityName, postedDate, members, communityImage }: CommunityCardType) {
	return (
		<div className="w-[48.5%] border border-divider">
			<div className="">
				<img
					src={communityImage}
					alt="test"
					className="max-h-[440px] w-full h-full object-cover"
				/>
			</div>
			<div className="p-30 flex flex-col gap-40">
				<div className="flex flex-col gap-5">
					<h4 className="text-h4 font-semibold">{communityName}</h4>
					<p className="text-body1 font-light text-primary-gold">Last posted {getRelativeTime(postedDate)}</p>
				</div>

				<div className="flex flex-row gap-10 items-center">
					<div className="flex flex-row">
						{Array.from({ length: 5 }).map((_, index) => (
							<div
								key={index}
								className={`w-30 h-30 rounded-full border border-divider dark:border-dark-4 ${
									index !== 0 && "-ml-[7.5px]"
								} ${
									index === 4 &&
									"bg-primary-green text-white text-[9.2px] font-semibold grid place-items-center border-0"
								}`}>
								{index === 4 ? (
									<span
										className="text-white"
										key={index}>{`${members - 4}+`}</span>
								) : (
									<Image
										key={index}
										src={`/avatar-small-${index + 1}.svg`}
										alt="avatar-small"
										loading="lazy"
										width={16}
										height={9}
										className="w-full"
									/>
								)}
							</div>
						))}
					</div>
					<span className="text-subtitle2 font-semibold text-foreground dark:text-white">{members} Members</span>

					<button
						className={`ml-auto w-fit px-20 py-[13px] border border-secondary-brown text-secondary-brown bg-white rounded-full text-button font-regular`}>
						Join Community
					</button>
				</div>
			</div>
		</div>
	);
}

export default CommunityCard;
