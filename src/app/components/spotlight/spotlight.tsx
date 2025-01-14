"use client";
import React from "react";
import FeatureCard from "./feature-card";
import CustomButton from "../button/button";

function Spotlight() {
	const handleButtonClick = () => {
		alert("Read more clicked!");
	};

	return (
		<>
			<FeatureCard
				category="Infrastructure & Utilities"
				location="Riyadh, Saudi Arabia"
				title="Riyadh's Public Transit System"
				imageUrl="/pilots-medium.jpeg" // Replace with the actual image URL
				buttonText="Read more"
				onButtonClick={handleButtonClick}
			/>

			<FeatureCard
				category="Construction"
				location="KAFD • Saudi Arabia"
				title="Smart Traffic Management"
				imageUrl="/pilots-medium-2.jpeg" // Replace with the actual image URL
				buttonText="Read more"
				onButtonClick={handleButtonClick}
			/>

			<CustomButton
				variant="primary"
				classes="w-max">
				Show all
			</CustomButton>
		</>
	);
}

export default Spotlight;
