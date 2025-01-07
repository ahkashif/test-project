"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Icon from "../icon/icons";
import StatCard from "./stat-card";
import PioltCard from "../pilot-card/pilot-card";
import { FormState } from "../../libs/store/slices/createPilotSlice";
import ListView from "./list-view";

function TabsComponent({ pilotsData }: { pilotsData: FormState[] }) {
	const [view, setView] = useState("grid");
	const [pilotsStagesCount, setPilotsStagesCount] = useState({
		Planning: 0,
		Ploting: 0,
		Assessment: 0,
		Scaling: 0,
	});
	const [visibleCount, setVisibleCount] = useState(3);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState<FormState[]>(pilotsData);

	useEffect(() => {
		if (searchQuery) {
			// Filter based on name
			const filtered = pilotsData.filter((pilot) => pilot.step1.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredData(filtered);
		} else {
			// If no search query, show all pilots
			setFilteredData(pilotsData);
		}
	}, [searchQuery, pilotsData]);

	useEffect(() => {
		const updatedCounts = filteredData.reduce(
			(counts, item) => {
				const stage = item.step1.stage;
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
					const stage = item.step1.stage;
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
		setVisibleCount((prevCount) => prevCount + 3); // Show 3 more cards
	};

	return (
		<div>
			<Tabs
				defaultValue="tech"
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

						{/* Pilot Cards */}
						{view === "grid" ? (
							<div className="flex flex-col gap-30">
								{filteredData.slice(0, visibleCount).map((data, index) => (
									<PioltCard
										key={index}
										{...data.step1}
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
