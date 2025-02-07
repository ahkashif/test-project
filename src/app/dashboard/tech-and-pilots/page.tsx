"use client";
import TabsComponent, { PilotTypes } from "@/app/components/tabs-component/tabs-componet";
import Text from "@/app/components/text/text";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { initializeFormData } from "@/app/libs/store/slices/createPilotSlice";
import { useDispatch } from "react-redux";
import { setLoading } from "../../libs/store/slices/pagePropertiesSlice";
import GlobalLoading from "@/app/components/atoms/loader";

const Pilot: React.FC = () => {
	const dispatch = useDispatch();
	const [pilotsData, setPilotsData] = useState<PilotTypes[]>([]);
	const [techData, setTechData] = useState([]);

	const getPilotsData = async () => {
		try {
			dispatch(setLoading({ loading: true }));
			const DOMAIN = process.env.DOMAIN! || window.location.origin;
			const response = await axios.get(`${DOMAIN}/api/common/pilots/get-pilots`);
			setPilotsData(response.data.data);
			dispatch(setLoading({ loading: false }));
		} catch (error) {
			console.error("Error fetching data:", error);
			dispatch(setLoading({ loading: false }));
		}
	};

	const getTechnologies = async () => {
		try {
			dispatch(setLoading({ loading: true }));
			const DOMAIN = process.env.DOMAIN! || window.location.origin;
			const response = await axios.get(`${DOMAIN}/api/common/technologies/get-all`);
			setTechData(response.data.data);
			dispatch(setLoading({ loading: false }));
		} catch (error) {
			console.error("Error fetching data:", error);
			dispatch(setLoading({ loading: false }));
		}
	};

	useEffect(() => {
		getPilotsData();
		getTechnologies();
	}, []);

	return (
		<div>
			<div className="grid place-items-center">
				<GlobalLoading />
			</div>
			<div className="p-30 border-b border-divider">
				<div className="flex flex-row justify-between">
					<Text
						value={"Technologies and Pilots"}
						tagName={"h4"}
						classes="text-h4 font-semibold"
					/>
				</div>
			</div>

			{pilotsData ? (
				<TabsComponent
					pilotsData={pilotsData}
					techData={techData}
				/>
			) : (
				<div>No Data Found</div>
			)}
		</div>
	);
};

export default Pilot;
