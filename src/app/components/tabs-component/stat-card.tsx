import React from "react";
import Icon from "../icon/icons";

interface StatCardProps {
	name: string;
	iconName: string;
	count: number;
	width: string;
	color: string;
}

function StatCard({ name, iconName, count, width, color }: StatCardProps) {
	return (
		<div
			className={`px-30 py-20 rounded-[10px] border border-divider min-w-[120px] flex flex-col items-start gap-30`}
			style={{ width: width, color: color }}>
			<div className="flex flex-row justify-between min-w-[205px] w-full">
				<p className="text-title2">{name}</p>
				<Icon
					name={iconName}
					size={32}></Icon>
			</div>

			<h2 className={`text-h1 text-${color} font-semibold`}>{count}</h2>
		</div>
	);
}

export default StatCard;
