import React from "react";
import Card from "./card";

function RecentlyAdded() {
	return (
		<>
			<Card
				imgUrl="/recently-added-1.png"
				imgAlt={"recently-added-2"}
				location="KAFD • Saudi Arabia"
				title="Mobility as a Service solution (MaaS)"
			/>
			<Card
				imgUrl="/recently-added-2.png"
				imgAlt={"recently-added-2"}
				location="Riyadh, Saudi Arabia"
				title="Green Transportation Initiative"
			/>
		</>
	);
}

export default RecentlyAdded;
