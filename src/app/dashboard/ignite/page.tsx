"use client";

import Text from "@/app/components/text/text";
import React, { useEffect, useState } from "react";
import GlobalLoading from "@/app/components/atoms/loader";
import DialogComp from "@/app/components/dialog-with-overlay/dialog-with-overlay";
import IgniteForm from "@/app/components/ignite-form/ignite-form";
import IgniteTabsComponent from "@/app/components/ignite-tabs/ignite-tabs";
import { useDispatch } from "react-redux";
import { setLoading } from "@/app/libs/store/slices/pagePropertiesSlice";
import axios from "axios";
import { IgniteTypes } from "@/app/api/common/add-ignite/route";

const Ignite: React.FC = () => {
	const dispatch = useDispatch();

	const [ignitesData, setIgnitesData] = useState<IgniteTypes[]>([]);

	const getIgnitesData = async () => {
		try {
			dispatch(setLoading({ loading: true }));
			const DOMAIN = process.env.DOMAIN! || window.location.origin;
			const response = await axios.get(`${DOMAIN}/api/common/get-ignites`);

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

	const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

	const closeDrawer = () => {
		setIsRightDrawerOpen(false);
	};

	return (
		<div>
			<div className="grid place-items-center">
				<GlobalLoading />
			</div>
			<div className="border-b border-divider">
				<div className=" border-b border-divider">
					<div className="p-30 flex flex-row justify-between">
						<Text
							value={"Ignite"}
							tagName={"h4"}
							classes="text-h4 font-semibold"
						/>

						<button
							onClick={() => setIsRightDrawerOpen(true)}
							className={`w-fit px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
							Create Ignite
						</button>

						{/* Right Drawer */}
						<DialogComp
							direction="right"
							isOpen={isRightDrawerOpen}
							onClose={() => setIsRightDrawerOpen(false)}>
							<div className="">
								<IgniteForm closeForm={() => closeDrawer()} />
							</div>
						</DialogComp>
					</div>
				</div>
				<IgniteTabsComponent ignites={ignitesData} />
			</div>

			{/* {pilotsData ? <TabsComponent pilotsData={pilotsData} /> : <div>No Data Found</div>} */}
		</div>
	);
};

export default Ignite;
