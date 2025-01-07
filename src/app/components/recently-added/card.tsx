import Image from "next/image";
import React from "react";

interface ImageCardProps {
	imgUrl: string; // URL of the image
	imgAlt: string; // Alternative text for the image
	location: string; // Location related to the image
	title: string; // Title of the image or card
}

function Card({ imgUrl, imgAlt, location, title }: ImageCardProps) {
	return (
		<div className="max-h-[350px] w-fit h-full border border-divider dark:border-dark-4 flex flex-col justify-between rounded-[10px] recenlty-added">
			<Image
				className="h-[250px] object-cover w-full"
				src={imgUrl}
				alt={imgAlt}
				title={imgAlt}
				loading="lazy"
				height={0}
				width={0}
				sizes="100vw"
			/>
			<div className="flex flex-col gap-10 p-20">
				<h6 className="text-body1 text-primary-gold">{location}</h6>
				<p className="text-h6 text-foreground font-semibold dark:text-white">{title}</p>
			</div>
		</div>
	);
}

export default Card;
