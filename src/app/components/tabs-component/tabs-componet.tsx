"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Icon from "../icon/icons";
import StatCard from "./stat-card";
import PioltCard from "../pilot-card/pilot-card";
// import ListView from "./list-view";
import { PilotRequest } from "@/app/api/common/pilots/add-pilot/route";
import { RootState } from "@/app/libs/store/store";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import DialogComp from "../dialog-with-overlay/dialog-with-overlay";
// import PlanningToDev from "./planning-to-dev";
import DevToPlotting from "./dev-to-plotting";
// import ToastNotification from "../toast-notification/toast-notification";
import { TechFormTypesSlice } from "@/app/libs/store/slices/techFormSlice";
import TechCard from "../tech-card/tech-card";
import ListViewComp from "./listViewComp";
import Image from "next/image";
import { renderFullDate } from "@/app/libs/common/utils";
import Link from "next/link";

export interface PilotTypes extends PilotRequest {
	_id: string;
}

export interface TechTypes extends TechFormTypesSlice {
	_id: string;
}

function TabsComponent({ pilotsData, techData }: { pilotsData: PilotTypes[]; techData: TechTypes[] }) {
	const [view, setView] = useState("grid");
	const [defaultTab, setDefaultTab] = useState("tech");
	const [pilotsStagesCount, setPilotsStagesCount] = useState({
		Planning: 0,
		Ploting: 0,
		Assessment: 0,
		Scaling: 0,
	});

	const [techStagesCount, setTechStagesCount] = useState({
		Screening: 0,
		Scouting: 0,
		Engagement: 0,
	});

	const [visibleCount, setVisibleCount] = useState(3);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState<PilotTypes[]>(pilotsData);
	const [filteredTechData, setFilteredTechData] = useState<TechTypes[]>(techData);
	const userDetails = useSelector((state: RootState) => state.userDetails);
	const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
	let toastDisplayed = false;
	const [planningPilot, setPlanningPilot] = useState(pilotsData[0]);

	const closeDrawer = () => {
		setIsRightDrawerOpen(false);
	};

	useEffect(() => {
		if (searchQuery) {
			let filtered;
			if (defaultTab === "pilots") {
				filtered = pilotsData.filter((pilot) => pilot.pilotName.toLowerCase().includes(searchQuery.toLowerCase()));
				setFilteredData(filtered);
			} else {
				filtered = techData.filter((tech) => tech.techName.toLowerCase().includes(searchQuery.toLowerCase()));
				setFilteredTechData(filtered);
				console.log(filtered);
			}
		} else {
			// If no search query, show all pilots
			setFilteredData(pilotsData);
			setFilteredTechData(techData);
		}
	}, [searchQuery, pilotsData, techData]);

	useEffect(() => {
		const updatedCounts = filteredData.reduce(
			(counts, item) => {
				const stage = item.currStage || "";
				if (stage in counts) {
					counts[stage as keyof typeof counts] += 1;
				}
				return counts;
			},
			{ Planning: 0, Ploting: 0, Assessment: 0, Scaling: 0 }
		);
		setPilotsStagesCount(updatedCounts);
	}, [filteredData]);

	useEffect(() => {
		const updatedCounts = filteredTechData.reduce(
			(counts, item) => {
				const stage = item.currentStage || "";
				if (stage in counts) {
					counts[stage as keyof typeof counts] += 1;
				}
				return counts;
			},
			{ Screening: 0, Scouting: 0, Engagement: 0 }
		);
		setTechStagesCount(updatedCounts);
	}, [filteredTechData]);

	useEffect(() => {
		if (pilotsData) {
			const updatedCounts = pilotsData.reduce(
				(counts, item) => {
					const stage = item.currStage || "";
					if (stage in counts) {
						counts[stage as keyof typeof counts] += 1;
					}
					return counts;
				},
				{ Planning: 0, Ploting: 0, Assessment: 0, Scaling: 0 }
			);
			setPilotsStagesCount(updatedCounts);
		}
	}, [pilotsData]);

	useEffect(() => {
		if (techData) {
			const updatedCounts = techData.reduce(
				(counts, item) => {
					const stage = item.currentStage || "";
					if (stage in counts) {
						counts[stage as keyof typeof counts] += 1;
					}
					return counts;
				},
				{ Screening: 0, Scouting: 0, Engagement: 0 }
			);
			setTechStagesCount(updatedCounts);
		}
	}, [techData]);

	const handleShowMore = () => {
		setVisibleCount((prevCount) => prevCount + 3);
	};

	const openTheDrawerToApprove = (pilot: any) => {
		toast.dismiss();
		setTimeout(() => {
			setIsRightDrawerOpen(true);
			setPlanningPilot(pilot);
		}, 550);
	};

	const tabChanged = (newTab: string) => {
		setSearchQuery("");
		setDefaultTab((prev) => {
			if (prev === "tech") return "pilots";
			else return "tech";
		});

		if (newTab === "pilots") {
			pilotsData
				.slice()
				.reverse()
				.map((pilot) => {
					if (pilot.currStage === "Planning_1") {
						if (userDetails.designation === "Director" && !toastDisplayed) {
							toast.custom(
								(t: any) => (
									<div
										className={`${
											t.visible ? "animate-enter" : "animate-leave"
										} max-w-[330px] w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 cursor-pointer`}
										onClick={() => {
											openTheDrawerToApprove(pilot);
										}}>
										<div className="flex-1 min-w-[320px] p-30 border-b-[5px] border-status-green">
											<div className="flex items-start flex-col gap-10">
												<div className="flex-shrink-0 pt-0.5 flex flex-row gap-10 w-full">
													<Icon name="check-green" />{" "}
													<span className="text-subtitle2 text-status-green font-semibold">New Pilot Request</span>
													<button
														onClick={(e) => {
															e.preventDefault();
															e.stopPropagation();
															toast.dismiss(t.id);
														}}
														className="w-fit border border-transparent rounded-none flex items-center justify-center text-body2 font-medium ml-auto">
														<Icon
															name="close"
															size={22}
														/>
													</button>
												</div>
												<div className="ml-3 flex-1 relative">
													<p className="mt-1 text-body2 text-gray-1">
														A Technology Pilot request has been submitted and is waiting for your review.
													</p>
												</div>
											</div>
										</div>
									</div>
									// <ToastNotification
									// 	pilot={undefined}
									// 	onApprove={function (pilot: any): void {
									// 		throw new Error("Function not implemented.");
									// 	}}
									// 	message={""}
									// 	title={""}
									// />
								),
								{ duration: Infinity, position: "top-right", removeDelay: 100 }
							);

							toastDisplayed = true;
						}
					}
				});
		}
	};

	return (
		<div>
			<Tabs
				onValueChange={tabChanged}
				defaultValue={defaultTab}
				className="w-full bg-white">
				<TabsList className="w-full flex justify-start bg-white h-auto border-b border-divider px-30">
					<TabsTrigger
						value="tech"
						className="p-10 min-w-[220px] min-h-[60px] text-subtitle1 text-black data-[state=active]:border-b-[5px] data-[state=active]:border-secondary-brown data-[state=active]:bg-background3">
						Technologies (<span className="text-inherit">{techData.length}</span>)
					</TabsTrigger>
					<TabsTrigger
						value="pilots"
						className="p-10 min-w-[220px] min-h-[60px] text-subtitle1 text-black data-[state=active]:border-b-[5px] data-[state=active]:border-secondary-brown data-[state=active]:bg-background3">
						Pilots (<span className="text-inherit">{pilotsData.length}</span>)
					</TabsTrigger>
				</TabsList>
				<div className="w-full p-30 border-b border-divider">
					<div className="flex flex-row items-center justify-between">
						<div className="relative">
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
								value={searchQuery}
							/>
							<Icon
								name="filter-ai"
								size={20}
								classes="absolute top-15 right-30"
							/>
						</div>
						<div className="flex flex-row items-center justify-between gap-30">
							{defaultTab === "pilots" ? (
								<Link
									className={`w-fit px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-subtitle1 font-semibold flex gap-10 items-center`}
									href="/create-pilot">
									<Icon name="plus" />
									Create New Pilot
								</Link>
							) : (
								<Link
									className={`w-fit px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-subtitle1 font-semibold flex gap-10 items-center`}
									href="/create-technology">
									<Icon name="plus" />
									Purpose new technology
								</Link>
							)}
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

				<TabsContent
					className="p-30"
					value="pilots">
					<div className="flex flex-col gap-20">
						<div className="flex flex-row gap-20 bg-white w-full">
							<StatCard
								name={"Planning"}
								iconName={"planning"}
								count={pilotsStagesCount.Planning}
								width={"25%"}
								color={"secondary-red"}
							/>
							<StatCard
								name={"Assessment"}
								iconName={"assessment"}
								count={pilotsStagesCount.Assessment}
								width={"25%"}
								color={"primary-lightGreen1"}
							/>
							<StatCard
								name={"Ploting"}
								iconName={"ploting"}
								count={pilotsStagesCount.Ploting}
								width={"25%"}
								color={"other-cyan"}
							/>
							<StatCard
								name={"Scaling"}
								iconName={"scaling"}
								count={pilotsStagesCount.Scaling}
								width={"25%"}
								color={"button-static"}
							/>
						</div>

						<div>
							{/* for toast and drawer */}
							<Toaster
								toastOptions={{
									style: {
										animation: "slideInRight 0.5s ease-out, fadeOut 0.5s ease-out",
									},
								}}
							/>

							<DialogComp
								direction="right"
								isOpen={isRightDrawerOpen}
								onClose={() => setIsRightDrawerOpen(false)}>
								<div className="">
									{planningPilot && (
										<DevToPlotting
											planningPilot={planningPilot}
											closeForm={() => closeDrawer()}
										/>
									)}
								</div>
							</DialogComp>
						</div>

						{/* Pilot Cards */}
						{view === "grid" ? (
							<div className="flex flex-col gap-30">
								{filteredData.slice(0, visibleCount).map((data, index) => (
									<PioltCard
										key={index}
										pilotName={data.pilotName}
										description={data.description}
										objective={data.objective}
										location={data.location}
										pilotBudgetCurrency={data.pilotBudgetCurrency}
										pilotEstimatedBudget={data.pilotEstimatedBudget}
										fundedBy={data.fundedBy}
										technologySolution={data.technologySolution}
										technologyProvider={data.technologyProvider || ""}
										devCoLeadingPilot={data.devCoLeadingPilot}
										pilotLead={data.pilotLead}
										pilotTeam={data.pilotTeam}
										attachments={data.attachments || ""}
										createdDate={data.createdDate}
										currStage={data.currStage || ""}
										submittedBy={{
											name: data.submittedBy.name,
											email: data.submittedBy.email,
											profilePhoto: data.submittedBy.profilePhoto,
										}}
										id={data._id}
									/>
								))}
							</div>
						) : (
							<div className="flex flex-row w-full">
								{/* <ListView pilotsData={filteredData} /> */}
								<ListViewComp
									data={pilotsData}
									headers={[
										"Pilot ID",
										"Pilot Name",
										"Pilot Stage",
										"Completion Date",
										"Pilot Contributors",
										"Comp./Tech. Provider",
									]}
									renderRow={(pilot, index) => (
										<tr
											key={index}
											className="border-b border-b-divider">
											<td className="px-[15px] py-[20px] text-body3 text-gray-3">{"897"}</td>
											<td className="px-[15px] py-[20px] text-body3 text-gray-3">
												<div className="flex items-center gap-2">
													<div className="flex flex-col gap-5">
														<p className="text-subtitle2 font-semibold">{pilot.pilotName}</p>
														<div className="flex flex-row gap-10 items-center">
															<Image
																src="/avatar-small-1.svg"
																alt={pilot.pilotName}
																className="w-[22px] h-[22px] rounded-full"
																loading="lazy"
																width={22}
																height={22}
															/>
															<p className="text-body3 text-gray-3">by {pilot.pilotName}</p>
														</div>
													</div>
												</div>
											</td>
											<td className="px-[15px] py-[20px] text-body3">
												<span
													className={`px-[15px] py-5 min-w-[95px] rounded-full text-white text-body2 font-light ${
														pilot.currStage === "Planning"
															? "bg-secondary-red"
															: pilot.currStage === "Ploting"
															? "bg-other-cyan"
															: pilot.currStage === "Assessment"
															? "bg-primary-green"
															: "bg-primary-gold"
													}`}>
													{pilot.currStage}
												</span>
											</td>
											<td className="px-[15px] py-[20px] text-body3 text-gray-3">{pilot.createdDate || "N/A"}</td>
											<td className="px-[15px] py-[20px] text-body3 text-gray-3">
												{pilot.technologySolution || "N/A"}
											</td>
											<td className="px-[15px] py-[20px] text-body3 text-gray-3">
												{pilot.technologyProvider || "N/A"}
											</td>
										</tr>
									)}
								/>
							</div>
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
					className="p-30"
					value="tech">
					<div className="flex flex-col gap-20">
						<div className="flex flex-row gap-20 bg-white w-full">
							<StatCard
								name={"Screening"}
								iconName={"search"}
								count={techStagesCount.Screening}
								width={"33%"}
								color={"secondary-brown"}
							/>
							<StatCard
								name={"Scouting"}
								iconName={"show"}
								count={techStagesCount.Scouting}
								width={"33%"}
								color={"secondary-blue1"}
							/>
							<StatCard
								name={"Engagement"}
								iconName={"community-1"}
								count={techStagesCount.Engagement}
								width={"33%"}
								color={"secondary-darkblue"}
							/>
						</div>

						{view === "grid" ? (
							<div className="flex flex-col gap-30">
								{filteredTechData.slice(0, visibleCount).map((data, index) => (
									<TechCard
										key={index}
										_id={data._id}
										techName={data.techName}
										techDescription={data.techDescription}
										techProvider={data.techProvider}
										owner={data.owner}
										selectedOptions={data.selectedOptions}
										sectorOptions={data.sectorOptions}
										techSrcOptions={data.techSrcOptions}
										addedValue={data.addedValue}
										devCo={data.devCo}
										businessChallenge={data.businessChallenge}
										challenges={data.challenges}
										attachments={data.attachments}
										currentStage={data.currentStage}
										technologyId={data.technologyId}
										createdAt={""}
									/>
								))}
							</div>
						) : (
							<div className="flex flex-row w-full">
								<ListViewComp
									data={techData}
									headers={["Tech ID", "Tech Name", "Current Stage", "Creation Date", "Added Value", "Tech Provider"]}
									renderRow={(tech, index) => (
										<tr
											key={index}
											className="border-b border-b-divider">
											<td className="px-[15px] py-[20px] text-body3 text-gray-3">{tech.technologyId || "N/A"}</td>
											<td className="px-[15px] py-[20px] text-body3 text-gray-3">
												<div className="flex items-center gap-2">
													<div className="flex flex-col gap-5">
														<p className="text-subtitle2 font-semibold">{tech.techName}</p>
													</div>
												</div>
											</td>
											<td className="px-[15px] py-[20px] text-body3">
												<span
													className={`px-[15px] py-5 min-w-[95px] rounded-full text-white text-body2 font-light ${
														tech.currentStage === "Screening"
															? "bg-secondary-red"
															: tech.currentStage === "Scouting"
															? "bg-other-cyan"
															: tech.currentStage === "Engagement"
															? "bg-primary-green"
															: "bg-primary-gold"
													}`}>
													{tech.currentStage}
												</span>
											</td>
											<td className="px-[15px] py-[20px] text-body3 text-gray-3">
												{renderFullDate(tech.createdAt) || "N/A"}
											</td>
											<td className="px-[15px] py-[20px] text-body3 text-gray-3">
												{tech.addedValue?.join(", ") || "N/A"}
											</td>
											<td className="px-[15px] py-[20px] text-body3 text-gray-3">{tech.techProvider || "N/A"}</td>
										</tr>
									)}
								/>
							</div>
						)}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default TabsComponent;
