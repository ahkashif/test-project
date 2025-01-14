import React, { useState } from "react";
import RecentlyAdded from "../recently-added/recently-added-container";
import Spotlight from "../spotlight/spotlight";
import Text from "../text/text";
import { useSelector } from "react-redux";
import { RootState } from "@/app/libs/store/store";
import ExpertCard from "../expert-card/expert-card";
import EventCard from "../carousel/event-card";

function CommunityOverview() {
	const { experts } = useSelector((state: RootState) => state.experts);
	const events = useSelector((state: RootState) => state.events.events);
	const [expertsVisibleCount, setExpertsVisibleCount] = useState(3);
	const [eventsVisibleCount, setEventsVisibleCount] = useState(3);

	const handleExpertsShowMore = () => {
		setExpertsVisibleCount((prevCount) => prevCount + 3);
	};

	const handleEventsShowMore = () => {
		setEventsVisibleCount((prevCount) => prevCount + 3);
	};

	return (
		<div>
			<div className="flex flex-col gap-70">
				<div className="grid grid-cols-12 gap-40">
					{/* Left Section */}
					<div className="col-span-12 md:col-span-9 flex flex-col gap-30">
						<Text
							value="Join our real estate centered discussions"
							tagName="h4"
							typography="h4"
						/>

						<Spotlight />
					</div>

					{/* Right Section */}
					<div className="col-span-12 md:col-span-3 flex flex-col gap-30">
						<Text
							value="Recently Added"
							tagName="h6"
							typography="h6"
							classes="invisible"
						/>

						<RecentlyAdded />
					</div>
				</div>

				<div className="flex flex-col gap-30">
					<Text
						value={"Connect with subject matter experts from around the globe"}
						tagName={"h4"}
						typography="h4"
					/>

					<div className="flex flex-row gap-30 flex-wrap">
						{experts.slice(0, expertsVisibleCount).map((expert, index) => {
							return (
								<ExpertCard
									key={index}
									expert={{
										name: expert.name,
										badge: expert.badge,
										title: expert.title,
										company: expert.company,
										yearsOfExperience: expert.yearsOfExperience,
										sector: expert.sector,
										profileImage: expert.profileImage,
									}}
									width="w-[31.5%]"
								/>
							);
						})}
					</div>
					{expertsVisibleCount < experts.length && (
						<div className="pt-30">
							<button
								onClick={handleExpertsShowMore}
								className={`w-fit min-w-[240px] mx-auto px-20 py-[13px] border border-primary-lightGreen1 bg-primary-lightGreen1 text-white rounded-full text-button font-regular`}>
								Show More
							</button>
						</div>
					)}
				</div>

				<div className="flex flex-col gap-30">
					<Text
						value={"Let's meet in person to shape future cityscapes together"}
						tagName={"h4"}
						typography="h4"
					/>

					<div className="flex flex-row gap-30 flex-wrap">
						{events.slice(0, expertsVisibleCount).map((event, index) => {
							return (
								<EventCard
									event={event}
									type="card"
									key={index}
									width="large"
								/>
							);
						})}
					</div>
					{eventsVisibleCount < events.length && (
						<div className="pt-30">
							<button
								onClick={handleEventsShowMore}
								className={`w-fit min-w-[240px] mx-auto px-20 py-[13px] border border-primary-lightGreen1 bg-primary-lightGreen1 text-white rounded-full text-button font-regular`}>
								Show More
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CommunityOverview;
