"use client";
import React, { useEffect } from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Banner from "../components/banner/banner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "../components/icon/icons";
import axios from "axios";
import { setLoading } from "../libs/store/slices/pagePropertiesSlice";
import { useDispatch } from "react-redux";
import { fetchExpertsSuccess } from "../libs/store/slices/expertsDataSlice";
import CommunityOverview from "../components/community-overview/community-overview";
import { setEvents } from "../libs/store/slices/eventsDataSlice";
import CommunityTopics from "../components/community-topics/community-topics";
import CommunityExperts from "../components/community-experts/community-experts";

function Community() {
	const dispatch = useDispatch();

	const getExpertsData = async () => {
		try {
			dispatch(setLoading({ loading: true }));
			const DOMAIN = process.env.DOMAIN! || "http://localhost:3000";
			const response = await axios.get(`${DOMAIN}/api/common/get-experts`);
			dispatch(fetchExpertsSuccess(response.data.data));
			dispatch(setLoading({ loading: false }));
		} catch (error) {
			console.error("Error fetching data:", error);
			dispatch(setLoading({ loading: false }));
		}
	};

	const getEventsData = async () => {
		try {
			dispatch(setLoading({ loading: true }));
			const DOMAIN = process.env.DOMAIN! || "http://localhost:3000";
			const response = await axios.get(`${DOMAIN}/api/common/get-events`);
			dispatch(setEvents(response.data.data));
			dispatch(setLoading({ loading: false }));
		} catch (error) {
			console.error("Error fetching data:", error);
			dispatch(setLoading({ loading: false }));
		}
	};

	useEffect(() => {
		getExpertsData();
		getEventsData();
	}, []);
	return (
		<div>
			<Header />
			<main className="pt-90">
				<Banner />

				<div className="tabs-area px-70 py-30">
					<Tabs
						defaultValue="Overview"
						className="w-full bg-white">
						<TabsList className="w-full flex justify-start bg-white h-auto border-divider">
							<TabsTrigger
								value="Overview"
								className="p-10 min-w-[260px] min-h-[90px] text-subtitle1 text-black border-b-[5px] data-[state=active]:border-b-[5px] data-[state=active]:border-primary-lightGreen1 data-[state=active]:bg-background4 data-[state=active]:text-primary-lightGreen1">
								<Icon
									name={"list-view"}
									classes="pr-5"
								/>
								Overview
							</TabsTrigger>
							<TabsTrigger
								value="Topics"
								className="p-10 min-w-[260px] min-h-[90px] text-subtitle1 text-black border-b-[5px] data-[state=active]:border-b-[5px] data-[state=active]:border-primary-lightGreen1 data-[state=active]:bg-background4 data-[state=active]:text-primary-lightGreen1">
								<Icon
									name={"topics"}
									classes="pr-5"
								/>
								Topics
							</TabsTrigger>
							<TabsTrigger
								value="Experts"
								className="p-10 min-w-[260px] min-h-[90px] text-subtitle1 text-black border-b-[5px] data-[state=active]:border-b-[5px] data-[state=active]:border-primary-lightGreen1 data-[state=active]:bg-background4 data-[state=active]:text-primary-lightGreen1">
								<Icon
									name={"expert"}
									classes="pr-5"
								/>
								Experts
							</TabsTrigger>
							<TabsTrigger
								value="Events"
								className="p-10 min-w-[260px] min-h-[90px] text-subtitle1 text-black border-b-[5px] data-[state=active]:border-b-[5px] data-[state=active]:border-primary-lightGreen1 data-[state=active]:bg-background4 data-[state=active]:text-primary-lightGreen1">
								<Icon
									name={"calender"}
									classes="pr-5"
								/>
								Events
							</TabsTrigger>
							<TabsTrigger
								value="faq"
								className="p-10 min-w-[260px] min-h-[90px] text-subtitle1 text-black border-b-[5px] data-[state=active]:border-b-[5px] data-[state=active]:border-primary-lightGreen1 data-[state=active]:bg-background4 data-[state=active]:text-primary-lightGreen1">
								<Icon
									name={"help"}
									classes="pr-5"
								/>
								FAQ
							</TabsTrigger>
						</TabsList>

						<TabsContent
							className="py-30"
							value="Overview">
							<CommunityOverview />
						</TabsContent>
						<TabsContent
							className="py-30"
							value="Topics">
							<CommunityTopics />
						</TabsContent>

						<TabsContent
							className="py-30"
							value="Experts">
							<CommunityExperts />
						</TabsContent>
						<TabsContent
							className="py-30"
							value="Events"></TabsContent>

						<TabsContent
							className="py-30"
							value="faq"></TabsContent>
					</Tabs>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Community;
