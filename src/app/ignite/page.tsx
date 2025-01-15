"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/header/header";
import GlobalLoading from "../components/atoms/loader";
import Footer from "../components/footer/footer";
import Text from "../components/text/text";
import EventBanner from "../components/event-banner/event-banner";
import { IgniteTypes } from "../api/common/add-ignite/route";
import { setLoading } from "../libs/store/slices/pagePropertiesSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import EmblaCarousel from "../components/carousel/carousel";
import IgniteCard from "../components/ignite-card/ignite-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "../components/icon/icons";
import { Input } from "@/components/ui/input";

function IgnitePage() {
	const dispatch = useDispatch();
	const [view, setView] = useState("grid");
	const [ignitesData, setIgnitesData] = useState<IgniteTypes[]>([]);

	const [visibleCount, setVisibleCount] = useState(6);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState<IgniteTypes[]>([]);

	useEffect(() => {
		if (searchQuery) {
			// Filter based on name
			const filtered = ignitesData.filter((ignite) => {
				return ignite.ideaName.toLowerCase().includes(searchQuery.toLowerCase());
			});

			setFilteredData(filtered);
		} else {
			// If no search query, show all pilots
			setFilteredData(ignitesData);
		}
	}, [searchQuery, ignitesData]);

	const handleShowMore = () => {
		setVisibleCount((prevCount) => prevCount + 3); // Show 3 more cards
	};

	const getIgnitesData = async () => {
		try {
			dispatch(setLoading({ loading: true }));
			const DOMAIN = process.env.DOMAIN! || window.location.origin;
			const response = await axios.get(`${DOMAIN}/api/common/get-ignites`);
			console.log(response.data.data);
			setIgnitesData(response.data.data);
			dispatch(setLoading({ loading: false }));
		} catch (error) {
			console.error("Error fetching data:", error);
			dispatch(setLoading({ loading: false }));
		}
	};

	useEffect(() => {
		getIgnitesData();
	}, []);

	return (
		<>
			<Header />
			<main className="pt-[90px]">
				<div className="grid place-items-center">
					<GlobalLoading />
				</div>
				<div className="">
					<div className="py-30 px-70 flex flex-row justify-between gap-30">
						<Text
							value={"Ignites"}
							tagName={"h1"}
							classes="text-h1 font-semibold"
						/>
					</div>

					<div className="bg-background1 dark:bg-dark-2 pb-70 pr-0 overflow-hidden">
						<Text
							value="Recent Ignite campaings"
							tagName="h4"
							typography="h4"
							classes="mb-[30px] p-70 pb-0"
						/>
						{ignitesData.length > 0 && (
							<EmblaCarousel
								slidesData={""}
								carouselType={"IGNITE"}
								slidesArray={ignitesData}
								slidesInView={3}
							/>
						)}
					</div>

					<div className="px-70 pt-60 pb-20 pif-event-banner">
						<EventBanner />
					</div>
					<div className="px-70 py-40">
						<div className="w-full pb-40 border-b border-divider">
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
										className="min-w-full min-h-[50px] px-60 py-10"
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
									<Icon
										name="filter-ai"
										size={20}
										classes="absolute top-15 right-30"
									/>
								</div>
								<div className="flex flex-row items-center justify-between gap-30">
									<div className="flex flex-row rounded-full overflow-hidden border border-secondary-brown hidden">
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
						<Tabs
							defaultValue="mobility"
							className="w-full bg-white">
							<TabsList className="w-full flex justify-start bg-white h-auto border-divider">
								<TabsTrigger
									value="mobility"
									className="p-10 min-w-[260px] min-h-[90px] text-subtitle1 text-black border-b-[5px] data-[state=active]:border-b-[5px] data-[state=active]:border-primary-lightGreen1 data-[state=active]:bg-background4 data-[state=active]:text-primary-lightGreen1">
									Mobility
								</TabsTrigger>
								<TabsTrigger
									value="construction"
									className="p-10 min-w-[260px] min-h-[90px] text-subtitle1 text-black border-b-[5px] data-[state=active]:border-b-[5px] data-[state=active]:border-primary-lightGreen1 data-[state=active]:bg-background4 data-[state=active]:text-primary-lightGreen1">
									Construction
								</TabsTrigger>
								<TabsTrigger
									value="infra"
									className="p-10 min-w-[260px] min-h-[90px] text-subtitle1 text-black border-b-[5px] data-[state=active]:border-b-[5px] data-[state=active]:border-primary-lightGreen1 data-[state=active]:bg-background4 data-[state=active]:text-primary-lightGreen1">
									Infrastructure & Utilities
								</TabsTrigger>
								<TabsTrigger
									value="smart_city"
									className="p-10 min-w-[260px] min-h-[90px] text-subtitle1 text-black border-b-[5px] data-[state=active]:border-b-[5px] data-[state=active]:border-primary-lightGreen1 data-[state=active]:bg-background4 data-[state=active]:text-primary-lightGreen1">
									Smart City & Proptech
								</TabsTrigger>
								<TabsTrigger
									value="environment"
									className="p-10 min-w-[260px] min-h-[90px] text-subtitle1 text-black border-b-[5px] data-[state=active]:border-b-[5px] data-[state=active]:border-primary-lightGreen1 data-[state=active]:bg-background4 data-[state=active]:text-primary-lightGreen1">
									Environment & Sustainability
								</TabsTrigger>
							</TabsList>

							<TabsContent
								className="py-30"
								value="mobility">
								<div className="flex flex-col gap-20">
									{/* Pilot Cards */}
									<div className="flex flex-row gap-30 flex-wrap">
										{filteredData
											.filter((i) => i.sector === "Mobility")
											.slice(0, visibleCount)
											.map((data, index) => (
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
													width={"w-[31%]"}
													key={index}
												/>
											))}
									</div>

									{/* Show More Button */}
									{visibleCount < filteredData.length && (
										<div className="text-center mt-4">
											<button
												onClick={handleShowMore}
												className={`w-fit mx-auto px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
												Show More
											</button>
										</div>
									)}
								</div>
							</TabsContent>
							<TabsContent
								className="py-30"
								value="construction">
								<div className="flex flex-col gap-20">
									{/* Pilot Cards */}
									{view === "grid" ? (
										<div className="flex flex-row gap-30 flex-wrap">
											{filteredData
												.filter((i) => i.sector === "Construction")
												.slice(0, visibleCount)
												.map((data, index) => (
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
														width={"w-[31%]"}
														key={index}
													/>
												))}
										</div>
									) : (
										""
									)}

									{/* Show More Button */}
									{visibleCount < filteredData.length && view === "grid" && (
										<div className="text-center mt-4">
											<button
												onClick={handleShowMore}
												className={`w-fit mx-auto px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
												Show More
											</button>
										</div>
									)}
								</div>
							</TabsContent>

							<TabsContent
								className="py-30"
								value="infra">
								<div className="flex flex-col gap-20">
									{/* Pilot Cards */}
									{view === "grid" ? (
										<div className="flex flex-row gap-30 flex-wrap">
											{filteredData
												.filter((i) => i.sector === "Infrastructure & Utilities")
												.slice(0, visibleCount)
												.map((data, index) => (
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
														width={"w-[31%]"}
														key={index}
													/>
												))}
										</div>
									) : (
										""
									)}

									{/* Show More Button */}
									{visibleCount < filteredData.length && view === "grid" && (
										<div className="text-center mt-4">
											<button
												onClick={handleShowMore}
												className={`w-fit mx-auto px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
												Show More
											</button>
										</div>
									)}
								</div>
							</TabsContent>
							<TabsContent
								className="py-30"
								value="smart_city">
								<div className="flex flex-col gap-20">
									{/* Pilot Cards */}
									<div className="flex flex-row gap-30 flex-wrap">
										{filteredData
											.filter((i) => i.sector === "Smart City & Proptech")
											.slice(0, visibleCount)
											.map((data, index) => (
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
													width={"w-[31%]"}
													key={index}
												/>
											))}
									</div>

									{/* Show More Button */}
									{visibleCount < filteredData.length && (
										<div className="text-center mt-4">
											<button
												onClick={handleShowMore}
												className={`w-fit mx-auto px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
												Show More
											</button>
										</div>
									)}
								</div>
							</TabsContent>

							<TabsContent
								className="py-30"
								value="environment">
								<div className="flex flex-col gap-20">
									{/* Pilot Cards */}
									<div className="flex flex-row gap-30 flex-wrap">
										{filteredData
											.filter((i) => i.sector === "Environment & Sustainability")
											.slice(0, visibleCount)
											.map((data, index) => (
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
													width={"w-[31%]"}
													key={index}
												/>
											))}
									</div>

									{/* Show More Button */}
									{visibleCount < filteredData.length && (
										<div className="text-center mt-4">
											<button
												onClick={handleShowMore}
												className={`w-fit mx-auto px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
												Show More
											</button>
										</div>
									)}
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

export default IgnitePage;
