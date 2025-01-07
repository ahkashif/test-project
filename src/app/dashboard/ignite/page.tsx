"use client";

import Text from "@/app/components/text/text";

import React from "react";
import GlobalLoading from "@/app/components/atoms/loader";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const Ignite: React.FC = () => {
	// const dispatch = useDispatch();

	// const getPilotsData = async () => {
	// 	try {
	// 		dispatch(setLoading({ loading: true }));
	// 		const DOMAIN = process.env.DOMAIN || "http://localhost:3000";
	// 		const response = await axios.get(`${DOMAIN}/api/common/get-pilots`);
	// 		dispatch(initializeFormData(response.data.data));
	// 		dispatch(setLoading({ loading: false }));
	// 	} catch (error) {
	// 		console.error("Error fetching data:", error);
	// 		dispatch(setLoading({ loading: false }));
	// 	}
	// };

	// useEffect(() => {
	// 	getPilotsData();
	// }, []);

	return (
		<div>
			<div className="grid place-items-center">
				<GlobalLoading />
			</div>
			<div className="p-30 border-b border-divider">
				<div className="flex flex-row justify-between">
					<Text
						value={"Ignite"}
						tagName={"h4"}
						classes="text-h4 font-semibold"
					/>

					<Sheet>
						<SheetTrigger asChild>
							<button
								className={`w-fit px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
								create ignite
							</button>
						</SheetTrigger>
						<SheetContent className="w-[35%]">
							<SheetHeader className="p-20 border-b border-divider">
								<SheetTitle className="text-title2">Create new Ignite</SheetTitle>
							</SheetHeader>
							<div className="flex flex-col gap-20"></div>
							<SheetFooter className="p-20">
								<SheetClose asChild></SheetClose>
								<div className="flex flex-row gap-10">
									<button
										className={`w-fit px-20 py-[13px] border border-secondary-brown text-secondary-brown bg-white rounded-full text-button font-regular`}>
										Cancel
									</button>
									<button
										className={`w-fit px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
										Submit for Approval
									</button>
								</div>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</div>

			{/* {pilotsData ? <TabsComponent pilotsData={pilotsData} /> : <div>No Data Found</div>} */}
		</div>
	);
};

export default Ignite;
