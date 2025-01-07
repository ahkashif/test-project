import React from "react";
import CustomButton from "../button/button";
import Image from "next/image";

interface EventData {
	eventData: string; // Date range of the event
	eventName: string; // Name of the event
	eventTagLine: string; // Tagline of the event
	eventDescription: string; // Description of the event
	eventAudience: number; // Expected audience count
}

function EventCard({ ...event }: EventData) {
	return (
		<div className="border border-divider dark:border-dark-4 rounded-[10px] overflow-hidden flex flex-row">
			<div className="w-1/2 p-50 flex flex-col gap-40">
				<div>
					<p className="text-title2 mb-20 dark:text-white">{event.eventData}</p>
					<h4 className="font-semibold text-h4 dark:text-white">{event.eventName}</h4>
					<p className="text-body1 font-light text-primary-gold mb-20">{event.eventTagLine}</p>
					<p className="text-body2 font-light dark:text-white">{event.eventDescription}</p>
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
									<span key={index}>`${event.eventAudience - 4}+`</span>
								) : (
									<Image
										key={index}
										src={`/avatar-small-${index + 1}.svg`}
										alt="avatar-small"
										loading="lazy"
										width={16}
										height={9}
									/>
								)}
							</div>
						))}
					</div>
					<span className="text-subtitle2 font-semibold text-foreground dark:text-white">
						{event.eventAudience} watching
					</span>
				</div>
				<div>
					<CustomButton variant="secondary">Learn More</CustomButton>
				</div>
			</div>
			<div className="w-1/2 relative">
				<Image
					src="/event-1.png"
					alt="event"
					className="w-full h-full object-cover"
					loading="lazy"
					width={400}
					height={390}
				/>
				<Image
					src="/pif-logo-tranparent.svg"
					alt="event"
					className="absolute top-[30px] right-[30px]"
					loading="lazy"
					width={90}
					height={90}
				/>
			</div>
		</div>
	);
}

export default EventCard;
