"use client";
import React from "react";
import Label from "../atoms/label";
import CustomButton from "../button/button";
import Image from "next/image";

interface FeatureCardProps {
	category: string; // The category of the card (e.g., "Infrastructure & Utilities")
	location: string; // The location of the feature (e.g., "Riyadh, Saudi Arabia")
	title: string; // The title of the feature (e.g., "Riyadh's Public Transit System")
	imageUrl: string; // The URL of the image
	buttonText: string; // Text for the button (e.g., "Read more")
	onButtonClick: () => void; // Action when the button is clicked
}

const FeatureCard: React.FC<FeatureCardProps> = ({
	category,
	location,
	title,
	imageUrl,
	buttonText,
	onButtonClick,
}) => {
	return (
		<div className="relative rounded-[10] overflow-hidden shadow-lg">
			<Image
				src={imageUrl}
				alt={title}
				className="w-full h-full object-cover max-h-[350px]"
				loading="lazy"
				width={965}
				height={353}
			/>

			{/* Overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

			{/* Content */}
			<div className="absolute bottom-0 left-0 right-0 text-white z-10 w-full p-[30px] h-full flex flex-col justify-between ">
				<div>
					<Label category={category} />
				</div>

				<div className="flex justify-between items-center">
					<div>
						<p className="text-body1 text-white font-light mb-1">{location}</p>

						<h3 className="text-h6 text-white font-semibold mb-4">{title}</h3>
					</div>
					<CustomButton
						onClick={onButtonClick}
						variant="secondary">
						{buttonText}
					</CustomButton>
				</div>
			</div>
		</div>
	);
};

export default FeatureCard;
