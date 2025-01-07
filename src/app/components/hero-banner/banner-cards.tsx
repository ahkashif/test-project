import React from "react";
import Icon from "../icon/icons";

interface BannerCardsTypes {
	value: number;
	text: string;
	linkText: string;
}

export default function BannerCard({ value, text, linkText }: BannerCardsTypes) {
	return (
		<div className="flex flex-col justify-between items-start p-6 flex-1 bg-primary-green rounded-[20px] min-h-[220px]">
			<h3 className="text-h3 font-medium text-white">{value}</h3>

			<div>
				<p className="text-title1 font-regular text-white mb-2">{text}</p>

				<a
					href="#"
					className="flex items-center gap-10 text-underline1 text-white underline font-regular">
					{linkText}
					<Icon
						size={18}
						name="arrow-right-white"
					/>
				</a>
			</div>
		</div>
	);
}
