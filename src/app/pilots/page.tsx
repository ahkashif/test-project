// "use client";

// import React, { useEffect, useState } from "react";
// import PioltCard from "../components/pilot-card/pilot-card";
// // import { FormState } from "../libs/store/slices/createPilotSlice";
// import { setLoading } from "../libs/store/slices/pagePropertiesSlice";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import Header from "../components/header/header";
// import GlobalLoading from "../components/atoms/loader";
// import Icon from "../components/icon/icons";
// import { Input } from "@/components/ui/input";
// import Footer from "../components/footer/footer";

// export default function About() {
// 	const dispatch = useDispatch();
// 	const [visibleCount, setVisibleCount] = useState(3);
// 	const [searchQuery, setSearchQuery] = useState("");
// 	// const [pilotsData, setPilotsData] = useState<FormState[]>([]);
// 	// const [filteredData, setFilteredData] = useState<FormState[]>([]);

// 	const getPilotsData = async () => {
// 		try {
// 			dispatch(setLoading({ loading: true }));
// 			const DOMAIN = process.env.DOMAIN! || window.location.origin;
// 			const response = await axios.get(`${DOMAIN}/api/common/get-pilots`);
// 			getPilotsData();
// 			dispatch(setLoading({ loading: false }));
// 			// setFilteredData(response.data.data);
// 		} catch (error) {
// 			console.error("Error fetching data:", error);
// 			dispatch(setLoading({ loading: false }));
// 		}
// 	};

// 	useEffect(() => {
// 		// setPilotsData([]);
// 		getPilotsData();
// 	}, []);

// 	// useEffect(() => {
// 	// 	if (searchQuery) {
// 	// 		// Filter based on name
// 	// 		dispatch(setLoading({ loading: true }));
// 	// 		const filtered = pilotsData.filter((pilot) => pilot.step1.name.toLowerCase().includes(searchQuery.toLowerCase()));
// 	// 		setFilteredData(filtered);
// 	// 		dispatch(setLoading({ loading: false }));
// 	// 	} else {
// 	// 		// If no search query, show all pilots
// 	// 		dispatch(setLoading({ loading: true }));
// 	// 		setFilteredData(pilotsData);
// 	// 		dispatch(setLoading({ loading: false }));
// 	// 	}
// 	// }, [searchQuery, pilotsData]);

// 	const handleShowMore = () => {
// 		setVisibleCount((prevCount) => prevCount + 3); // Show 3 more cards
// 	};

// 	return (
// 		<>
// 			<Header />
// 			<div className="grid place-items-center">
// 				<GlobalLoading />
// 			</div>
// 			<main className="dark:bg-dark-2 pt-[90px]">
// 				<div className="p-70 pb-0">
// 					<div className="relative">
// 						<Icon
// 							name="search-2"
// 							size={20}
// 							classes="absolute top-15 left-30"
// 						/>
// 						<Input
// 							type="text"
// 							placeholder="Search"
// 							className="min-w-[350px] min-h-[50px] px-60 py-10"
// 							onChange={(e) => setSearchQuery(e.target.value)}
// 						/>
// 						<Icon
// 							name="filter-ai"
// 							size={20}
// 							classes="absolute top-15 right-30"
// 						/>
// 					</div>
// 				</div>

// 				<div className="pif-pilots">
// 					{/* <div className="flex flex-col gap-30 p-70">
// 						{filteredData.slice(0, visibleCount).map((data, index) => (
// 							<PioltCard
// 								key={index}
// 								{...data.step1}
// 							/>
// 						))}
// 					</div> */}

// 					{/* Show More Button */}
// 					{/* {visibleCount < filteredData.length && (
// 						<div className="text-center mt-4 mb-6">
// 							<button
// 								onClick={handleShowMore}
// 								className={`w-fit mx-auto px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
// 								Show More
// 							</button>
// 						</div>
// 					)} */}
// 				</div>
// 			</main>
// 			<Footer />
// 		</>
// 	);
// }

import React from "react";

function page() {
	return <div>page</div>;
}

export default page;
