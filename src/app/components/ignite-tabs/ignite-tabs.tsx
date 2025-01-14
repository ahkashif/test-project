"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Icon from "../icon/icons";
// import ListView from "./list-view";

import GlobalLoading from "@/app/components/atoms/loader";
import IgniteListView from "@/app/dashboard/ignite/ignite-list-view";
import IgniteCard from "../ignite-card/ignite-card";
import { IgniteTypes } from "@/app/api/common/add-ignite/route";

interface IgniteTabsProps {
	ignites: IgniteTypes[];
}

function IgniteTabsComponent({ ignites }: IgniteTabsProps) {
	const [view, setView] = useState("grid");
	const [ignitesData, setIgnitesData] = useState<IgniteTypes[]>([]);

	const [visibleCount, setVisibleCount] = useState(6);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState<IgniteTypes[]>([]);
	const [igniteStagesCount, setIgniteStagesCount] = useState({
		drafts: 0,
		approvals: 0,
		published: 0,
	});

	useEffect(() => setIgnitesData(ignites), [ignites]);

	useEffect(() => {
		// Initialize counts
		const counts = {
			drafts: 0,
			approvals: 0,
			published: 0,
		};

		// Loop through the array and increment counts based on status
		ignitesData.forEach((ignite) => {
			console.log(ignite.status);
			if (ignite.status === "draft") {
				counts.drafts++;
			} else if (ignite.status === "approved") {
				counts.approvals++;
			} else if (ignite.status === "published") {
				counts.published++;
			}
		});

		// Update state with the new counts
		setIgniteStagesCount(counts);
	}, [ignitesData]);

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

	return (
		<div>
			<div className="grid place-items-center">
				<GlobalLoading />
			</div>
			<Tabs
				defaultValue="all"
				className="w-full bg-white">
				<TabsList className="w-full flex justify-start bg-white h-auto border-b border-divider">
					<TabsTrigger
						value="all"
						className="p-10 min-w-[220px] min-h-[60px] text-subtitle1 text-black data-[state=active]:border-b-[5px] data-[state=active]:border-secondary-brown data-[state=active]:bg-background3">
						All (<span className="text-inherit">{ignitesData.length}</span>)
					</TabsTrigger>
					<TabsTrigger
						value="drafts"
						className="p-10 min-w-[220px] min-h-[60px] text-subtitle1 text-black data-[state=active]:border-b-[5px] data-[state=active]:border-secondary-brown data-[state=active]:bg-background3">
						Drafts (<span className="text-inherit">{igniteStagesCount["drafts"]}</span>)
					</TabsTrigger>
					<TabsTrigger
						value="approval_pending"
						className="p-10 min-w-[220px] min-h-[60px] text-subtitle1 text-black data-[state=active]:border-b-[5px] data-[state=active]:border-secondary-brown data-[state=active]:bg-background3">
						Sent for approval (<span className="text-inherit">{igniteStagesCount["approvals"]}</span>)
					</TabsTrigger>
					<TabsTrigger
						value="published"
						className="p-10 min-w-[220px] min-h-[60px] text-subtitle1 text-black data-[state=active]:border-b-[5px] data-[state=active]:border-secondary-brown data-[state=active]:bg-background3">
						Published (<span className="text-inherit">{igniteStagesCount["published"]}</span>)
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
					value="all">
					<div className="flex flex-col gap-20">
						{/* Pilot Cards */}
						{view === "grid" ? (
							<div className="flex flex-row gap-30 flex-wrap">
								{filteredData.slice(0, visibleCount).map((data, index) => (
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
							<div className="flex flex-row w-full">
								<IgniteListView ignites={filteredData} />
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
					value="drafts">
					<div className="flex flex-col gap-20">
						{/* Pilot Cards */}
						{view === "grid" ? (
							<div className="flex flex-row gap-30 flex-wrap">
								{filteredData
									.filter((i) => i.status === "draft")
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
							<div className="flex flex-row w-full">
								<IgniteListView ignites={filteredData.filter((i) => i.status === "draft")} />
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
					value="approval_pending">
					<div className="flex flex-col gap-20">
						{/* Pilot Cards */}
						{view === "grid" ? (
							<div className="flex flex-row gap-30 flex-wrap">
								{filteredData
									.filter((i) => i.status === "approved")
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
							<div className="flex flex-row w-full">
								<IgniteListView ignites={filteredData.filter((i) => i.status === "approved")} />
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
					value="published">
					<div className="flex flex-col gap-20">
						{/* Pilot Cards */}
						{view === "grid" ? (
							<div className="flex flex-row gap-30 flex-wrap">
								{filteredData
									.filter((i) => i.status === "published")
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
							<div className="flex flex-row w-full">
								<IgniteListView ignites={filteredData.filter((i) => i.status === "published")} />
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
			</Tabs>
		</div>
	);
}

export default IgniteTabsComponent;
