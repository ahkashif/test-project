import React, { useEffect, useState } from "react";
import LeftSide from "../join-the-conversation/left-side";
import GlobalLoading from "../atoms/loader";
import { useDispatch } from "react-redux";
import ExpertCard, { ExpertCardTypes } from "../expert-card/expert-card";
import Icon from "../icon/icons";
import { Input } from "@/components/ui/input";
import { setLoading } from "@/app/libs/store/slices/pagePropertiesSlice";
import axios from "axios";

function CommunityExperts() {
	const dispatch = useDispatch();
	const [visibleCount, setVisibleCount] = useState(8);
	const [communitiesData, setCommunitiesData] = useState([]);
	const [filteredData, setFilteredData] = useState<ExpertCardTypes[]>([]);
	const [searchQuery, setSearchQuery] = useState("");

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
		setVisibleCount((prevCount) => prevCount + 6);
	};

	return (
		<div>
			<div className="grid place-items-center">
				<GlobalLoading />
			</div>
			<div className="flex flex-col gap-70">
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
				<div className="grid grid-cols-12 gap-40">
					{/* Left Section */}
					<div className="col-span-12 md:col-span-9 flex flex-col gap-30">
						<div className="">
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
											width={"w-[48%]"}
										/>
									);
								})}
							</div>

							<div className="text-center my-30">
								<button
									onClick={handleShowMore}
									className={`w-fit mx-auto px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
									Show More
								</button>
							</div>
						</div>
					</div>

					{/* Right Section */}
					<div className="col-span-12 md:col-span-3 flex flex-col gap-30">
						{/* <Text
							value="Recently Added"
							tagName="h6"
							typography="h6"
							classes="invisible"
						/> */}

						<LeftSide />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CommunityExperts;
