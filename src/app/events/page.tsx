"use client";
import React, { useEffect, useState } from "react";
import EmblaCarousel from "../components/carousel/carousel";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Text from "../components/text/text";
import GlobalLoading from "../components/atoms/loader";
import { useDispatch } from "react-redux";
import EventCard, { EventDataTypes } from "../components/carousel/event-card";
import { setLoading } from "../libs/store/slices/pagePropertiesSlice";
import axios from "axios";
import { Input } from "@/components/ui/input";

import EventsListView from "../components/events-listview/events-listview";
import Icon from "../components/icon/icons";
import EventBanner from "../components/event-banner/event-banner";

function Events() {
	const dispatch = useDispatch();
	const [visibleCount, setVisibleCount] = useState(6);
	const [communitiesData, setCommunitiesData] = useState([]);
	const [filteredData, setFilteredData] = useState<EventDataTypes[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [view, setView] = useState("grid");

	const getEventsData = async () => {
		try {
			dispatch(setLoading({ loading: true }));
			const DOMAIN = process.env.DOMAIN! || "http://localhost:3000";
			const response = await axios.get(`${DOMAIN}/api/common/get-events`);
			setCommunitiesData(response.data.data);
			setFilteredData(response.data.data);
			dispatch(setLoading({ loading: false }));
		} catch (error) {
			console.error("Error fetching data:", error);
			dispatch(setLoading({ loading: false }));
		}
	};

	useEffect(() => {
		getEventsData();
	}, []);

	useEffect(() => {
		if (searchQuery) {
			const filtered = communitiesData.filter((event: EventDataTypes) =>
				event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredData(filtered);
		} else {
			setFilteredData(communitiesData);
		}
	}, [searchQuery, communitiesData]);

	const handleShowMore = () => {
		setVisibleCount((prevCount) => prevCount + 6);
	};

	return (
		<>
			<div className="grid place-items-center">
				<GlobalLoading />
			</div>
			<Header />
			<main className="dark:bg-dark-2 pt-[90px]">
				<Text
					value={`Events`}
					tagName="h1"
					typography="h1"
					classes="px-70 py-30"
				/>
				<div className="bg-background1 dark:bg-dark-2 pb-70 pr-0 overflow-hidden">
					<Text
						value={`Event of the month`}
						tagName="h4"
						typography="h4"
						classes="mb-[30px] p-70 pb-0"
					/>

					<EmblaCarousel
						slidesData={"EVENTS_SLIDES_DATA"}
						carouselType={"EVENTS"}
						slidesInView={1}
					/>
				</div>

				<div className="p-70 pif-event-banner">
					<EventBanner />
				</div>

				<div className="">
					<div className="w-full py-30 px-70 ">
						<div className="flex flex-row items-center justify-between">
							<div className="relative w-full">
								<Icon
									name="search-2"
									size={20}
									classes="absolute top-15 left-30"
								/>
								<Input
									type="text"
									placeholder="Search"
									className="min-w-[350px] min-h-[50px] px-60 py-10"
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<Icon
									name="filter-ai"
									size={20}
									classes="absolute top-15 right-30"
								/>
							</div>
							<div className="flex flex-row items-center justify-between gap-30 hidden">
								<div className="flex flex-row rounded-full overflow-hidden border border-secondary-brown">
									{/* View Toggle */}
									{["grid", "list"].map((v) => (
										<div
											key={v}
											className={`px-[20px] py-[12px] ${
												view === v ? "bg-secondary-brown" : ""
											} min-w-[24px] transition-colors duration-500 cursor-pointer`}
											onClick={() => setView(v)}>
											<Icon
												name={`${v}-view`}
												size={24}
												color={"#bc6322"}
												classes={`${view === v ? "invert" : ""}`}
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{view === "grid" ? (
						<>
							<div className="p-70">
								<div className="flex flex-wrap gap-20">
									{filteredData.slice(0, visibleCount).map((comm: EventDataTypes, index: number) => {
										return (
											<EventCard
												key={index}
												event={{
													eventData: comm.eventData,
													eventName: comm.eventName,
													eventTagLine: comm.eventTagLine,
													eventDescription: comm.eventDescription,
													eventAudience: comm.eventAudience,
												}}
												type="card"
												width="large"
											/>
										);
									})}
								</div>
							</div>

							{visibleCount < filteredData.length && view === "grid" && (
								<div className="text-center p-30 pt-0">
									<button
										onClick={handleShowMore}
										className={`w-fit min-w-[240px] mx-auto px-20 py-[13px] border border-primary-lightGreen1 bg-primary-lightGreen1 text-white rounded-full text-button font-regular`}>
										Show More
									</button>
								</div>
							)}
						</>
					) : (
						<div className="p-30">
							<EventsListView events={filteredData} />
						</div>
					)}
				</div>
			</main>

			<Footer />
		</>
	);
}

export default Events;
