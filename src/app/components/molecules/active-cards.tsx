import React from "react";
import Icon from "../icon/icons";

interface ActiveCardsProps {
	title: string;
	icon: string;
	count: number;
}

function ActiveCards({ title, icon, count }: ActiveCardsProps) {
	return (
		<div className="flex flex-row justify-between rounded-[10px] px-30 py-20 bg-white border border-divider items-center">
			<div className="flex flex-col gap-10">
				<p className="font-light text-title1">{title}</p>
				<h2 className="font-semibold text-h2">{count}</h2>
			</div>
			<div className="bg-gray-7 p-[16px] rounded-full grid place-items-center w-[80px] h-[80px]">
				<Icon
					name={icon}
					size={48}
				/>
			</div>
		</div>
	);
}

export default ActiveCards;
