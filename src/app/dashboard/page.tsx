import React from "react";
import ActiveCards from "../components/molecules/active-cards";
import ComboChart from "../components/chart";

function Dashboard() {
	return (
		<div className="p-30">
			<div className="flex gap-30">
				<div className="w-1/2 flex flex-col gap-20">
					<ActiveCards
						title="Active Challenges"
						icon={"active-challenge"}
						count={8}
					/>
					<ActiveCards
						title="Approved Pilot"
						icon={"approved-pilot"}
						count={20}
					/>
					<ActiveCards
						title="Recently Approve Technology"
						icon={"approved-technology"}
						count={5}
					/>
				</div>

				<div className="w-1/2">
					<ComboChart />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
