"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Text from "@/app/components/text/text";
import { useDispatch } from "react-redux";
import GlobalLoading from "@/app/components/atoms/loader";
import { setLoading } from "@/app/libs/store/slices/pagePropertiesSlice";
import Icon from "@/app/components/icon/icons";
import { Input } from "@/components/ui/input";
import ExpertCard, { ExpertCardTypes } from "@/app/components/expert-card/expert-card";
import ExpertListView from "@/app/components/experts-listview/expert-listview";

const Community = () => {
	const dispatch = useDispatch();
	const [visibleCount, setVisibleCount] = useState(12);
	const [communitiesData, setCommunitiesData] = useState([]);
	const [filteredData, setFilteredData] = useState<ExpertCardTypes[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [view, setView] = useState("grid");

	const getCommunityData = async () => {
		try {
			dispatch(setLoading({ loading: true }));
			const DOMAIN = process.env.DOMAIN! || window.location.origin;
			const response = await axios.get(`${DOMAIN}/api/common/get-experts`);
			setCommunitiesData(response.data.data);
			setFilteredData(response.data.data);
			dispatch(setLoading({ loading: false }));
		} catch (error) {
			console.error("Error fetching data:", error);
			dispatch(setLoading({ loading: false }));
		}
	};

	useEffect(() => {
		getCommunityData();
	}, []);

	useEffect(() => {
		if (searchQuery) {
			const filtered = communitiesData.filter((event: ExpertCardTypes) =>
				event.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredData(filtered);
		} else {
			setFilteredData(communitiesData);
		}
	}, [searchQuery, communitiesData]);

	const handleShowMore = () => {
		setVisibleCount((prevCount) => prevCount + 4);
	};

	return (
		<div className="">
			<div className="grid place-items-center">
				<GlobalLoading />
			</div>
			<div className="border-b border-divider">
				<div className="p-30 flex flex-row justify-between gap-30">
					<Text
						value={"Networking"}
						tagName={"h4"}
						classes="text-h4 font-semibold"
					/>
				</div>
			</div>

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

			{view === "grid" ? (
				<>
					<div className="p-30">
						<div className="flex flex-wrap justify-between gap-20">
							{filteredData.slice(0, visibleCount).map((comm: ExpertCardTypes, index: number) => {
								return (
									<ExpertCard
										key={index}
										expert={{
											name: comm.name,
											badge: comm.badge,
											title: comm.title,
											company: comm.company,
											yearsOfExperience: comm.yearsOfExperience,
											sector: comm.sector,
											profileImage: comm.profileImage,
										}}
										width="w-[32%]"
									/>
								);
							})}
						</div>
					</div>

					<div className="text-center my-30">
						<button
							onClick={handleShowMore}
							className={`w-fit mx-auto px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
							Show More
						</button>
					</div>
				</>
			) : (
				<div className="p-30">
					<ExpertListView experts={filteredData} />
				</div>
			)}
		</div>
	);
};

export default Community;
