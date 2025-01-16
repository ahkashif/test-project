"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Icon from "../icon/icons";
import StatCard from "./stat-card";
import PioltCard from "../pilot-card/pilot-card";
import ListView from "./list-view";
import { PilotRequest } from "@/app/api/common/pilots/add-pilot/route";
import { RootState } from "@/app/libs/store/store";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import DialogComp from "../dialog-with-overlay/dialog-with-overlay";
import PlanningToScaling from "./planning-to-scaling";

export interface PilotTypes extends PilotRequest {
	_id: string;
}

function TabsComponent({ pilotsData }: { pilotsData: PilotTypes[] }) {
	const [view, setView] = useState("grid");
	const [defaultTab, setDefaultTab] = useState("tech");
	const [pilotsStagesCount, setPilotsStagesCount] = useState({
		Planning: 0,
		Ploting: 0,
		Assessment: 0,
		Scaling: 0,
	});
	const [visibleCount, setVisibleCount] = useState(3);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState<PilotTypes[]>(pilotsData);
	const userDetails = useSelector((state: RootState) => state.userDetails);
	const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
	let toastDisplayed = false;
	const [planningPilot, setPlanningPilot] = useState(pilotsData[0]);

	const closeDrawer = () => {
		setIsRightDrawerOpen(false);
	};

	useEffect(() => {
		if (searchQuery) {
			// Filter based on name
			const filtered = pilotsData.filter((pilot) => pilot.pilotName.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredData(filtered);
		} else {
			// If no search query, show all pilots
			setFilteredData(pilotsData);
		}
	}, [searchQuery, pilotsData]);

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
		setDefaultTab((prev) => {
			if (prev === "tech") return "pilots";
			else return "tech";
		});

		if (newTab === "pilots") {
			pilotsData
				.slice()
				.reverse()
				.map((pilot) => {
					if (pilot.currStage === "Planning") {
						console.log("currStage is planning");

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
						Technologies (<span className="text-inherit">20</span>)
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
							/>
							<Icon
								name="filter-ai"
								size={20}
								classes="absolute top-15 right-30"
							/>
						</div>
						<div className="flex flex-row items-center justify-between gap-30">
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
										<PlanningToScaling
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
								<ListView pilotsData={filteredData} />
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
					Change your password here.
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default TabsComponent;
