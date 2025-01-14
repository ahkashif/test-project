"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./carouselIndicator";
import useEmblaCarousel from "embla-carousel-react";
import CarouselCard from "./carousel-card";
import CustomButton from "../button/button";
import ProfileCard from "./profile-card";

import {
	CAROUSELS_DATA,
	CarouselsData,
	CompanySlide,
	ProfileSlide,
	EventSlide,
	InnovationSlide,
} from "../../mockData/carousels";
import EventCard from "./event-card";
import InnovationCard from "./innovation-cards";
import IgniteCard from "../ignite-card/ignite-card";

type PropType = {
	slidesData: string;
	carouselType: string;
	slidesInView: number;
	slidesArray?: any;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slidesData, carouselType, slidesInView, slidesArray = [] } = props;
	const OPTIONS: EmblaOptionsType = { align: "start", dragFree: true };
	let SLIDE_COUNT;

	if (slidesData in CAROUSELS_DATA) {
		SLIDE_COUNT = CAROUSELS_DATA[slidesData as keyof CarouselsData].length;
	} else {
		SLIDE_COUNT = slidesArray.length || [];
		// console.warn("Invalid key:", slidesData);
	}
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

	const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

	const slideClasses =
		slidesInView === 1
			? "flex-[0_0_66%]"
			: carouselType === "INNOVATION"
			? "flex-[0_0_28.2%]"
			: slidesArray.length > 0
			? "flex-[0_0_30%]"
			: "flex-[0_0_28%]";

	return (
		<section className="mx-auto">
			<div
				className="overflow-hidden"
				ref={emblaRef}>
				<div className="flex ml-[4rem] mr-[4rem]">
					{SLIDES.map((index) => {
						let data;
						if (slidesData !== "") {
							data = CAROUSELS_DATA[slidesData as keyof CarouselsData][index];
						} else {
							data = slidesArray[index];
						}

						return (
							<div
								className={`${slideClasses} pl-[3rem] min-w-0 translate-z-0`}
								key={index}>
								{carouselType === "COMPANIES" && (
									<CarouselCard
										imgUrl={(data as CompanySlide).imgUrl} // Narrow the type to CompanySlide
										companyLogo={(data as CompanySlide).companyLogo}
										companyName={(data as CompanySlide).companyName}
										category={(data as CompanySlide).category}
									/>
								)}

								{carouselType === "PROFILES" && (
									<ProfileCard
										name={(data as ProfileSlide).name} // Narrow the type to ProfileSlide
										designation={(data as ProfileSlide).designation}
										avatarUrl={(data as ProfileSlide).avatarUrl}
										hasBadge={(data as ProfileSlide).hasBadge}
									/>
								)}

								{carouselType === "EVENTS" && (
									<EventCard
										key={index}
										event={{
											eventData: (data as EventSlide).eventData,
											eventName: (data as EventSlide).eventName,
											eventTagLine: (data as EventSlide).eventTagLine,
											eventDescription: (data as EventSlide).eventDescription,
											eventAudience: (data as EventSlide).eventAudience,
										}}
										type="card"
									/>
								)}
								{carouselType === "INNOVATION" && (
									<InnovationCard
										icon={(data as InnovationSlide).icon}
										title={(data as InnovationSlide).title}
										description={(data as InnovationSlide).description}
									/>
								)}

								{carouselType === "IGNITE" && (
									<IgniteCard
										ignite={{
											ideaName: data.ideaName,
											ideaDescription: data.ideaDescription,
											submissionSource: data.submissionSource,
											associatedChallenges: data.associatedChallenges,
											submittedBy: data.submittedBy,
											category: data.category,
											sector: data.sector,
											technologyProvider: data.technologyProvider,
											technologyType: data.technologyType,
											supportingFiles: data.supportingFiles,
											status: data.status,
											submissionDate: data.submissionDate,
										}}
										width={"full"}
										key={index}
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Embla Dots */}
			<div className="mt-60 pl-70">
				<div className="flex flex-wrap justify-end items-center w-full pr-70">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							style={{
								width: `calc(100% / ${scrollSnaps.length})`,
							}}
							className={`w-[calc(100%/${
								scrollSnaps.length
							})] h-[2px] flex items-center justify-center cursor-pointer ${
								index === selectedIndex
									? "shadow-inner border-2 border-primary-lightGreen1"
									: "bg-transparent shadow-inner border-2 border-primary-lightGreen4"
							}`}
						/>
					))}
				</div>
			</div>

			<div className="pl-70">
				<CustomButton
					classes="mt-30"
					variant="primary">
					Show All
				</CustomButton>
			</div>
		</section>
	);
};

export default EmblaCarousel;
