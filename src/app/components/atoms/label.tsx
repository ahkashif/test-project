import React from "react";
interface LabelProps {
	category: string;
	color?: string;
}
function Label({ category, color = "gold" }: LabelProps) {
	let classes;
	if (color === "gold") {
		classes = "bg-primary-gold text-white";
	} else if (color === "green") {
		classes = "bg-primary-lightGreen4 text-status-black";
	}

	return (
		<div className={`mb-2 text-subtitle2 inline-block font-medium px-[15px] py-[5px] rounded-[50px] ${classes}`}>
			{category}
		</div>
	);
}

export default Label;
