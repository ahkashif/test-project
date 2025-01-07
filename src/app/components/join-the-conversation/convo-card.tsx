import React from "react";
import CustomButton from "../button/button";
import Image from "next/image";

interface ConvoCardTypes {
	name: string;
	timeline: string;
	members: number;
	buttonText: string;
	imageUrl: string;
}

function ConvoCard({ name, timeline, members, buttonText, imageUrl }: ConvoCardTypes) {
	return (
		<div className="flex flex-row border border-divider dark:border-dark-4 rounded-[10px] overflow-hidden">
			<div className="p-50 w-4/6 flex flex-col gap-40">
				<div className="">
					<h4 className="text-h4 font-semibold dark:text-white">{name}</h4>
					<p className="text-body2 font-light text-primary-gold">{timeline}</p>
				</div>
				<div className="flex flex-row justify-between">
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
					</div>
					<CustomButton
						variant="secondary"
						classes="dark:bg-tranparent">
						{buttonText}
					</CustomButton>
				</div>
			</div>
			<div className="w-2/6">
				<Image
					className="min-h-[300px] h-full w-full"
					src={imageUrl}
					alt="community-card"
					loading="lazy"
					width={100}
					height={300}
				/>
			</div>
		</div>
	);
}

export default ConvoCard;
