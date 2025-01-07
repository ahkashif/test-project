import React from "react";
interface LabelProps {
	category: string;
}
function Label({ category }: LabelProps) {
	return (
		<div className="mb-2 text-subtitle2 inline-block bg-primary-gold text-white font-medium px-[15px] py-[5px] rounded-[50px]">
			{category}
		</div>
	);
}

export default Label;
