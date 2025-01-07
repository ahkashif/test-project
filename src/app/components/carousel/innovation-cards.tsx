import React from "react";
import Icon from "../icon/icons";
import { InnovationSlide } from "@/app/mockData/carousels";

function InnovationCard({ icon, title, description }: InnovationSlide) {
	return (
		<div className="border border-divider dark:border-dark-4 rounded-[10px] p-30 min-h-[282px]">
			<div className="flex flex-col gap-40 justify-between">
				<div>
					<Icon
						name={icon}
						size={60}
					/>
				</div>
				<div className="flex flex-col gap-5">
					<h6 className="text-h6 font-semibold dark:text-white">{title}</h6>
					<p className="text-body2 font-light dark:text-white">{description}</p>
					<div className="flex gap-10">
						<span className="text-body2 font-light text-foreground underline dark:text-white">View Profile</span>

						<Icon
							name="arrow-right"
							size={24}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default InnovationCard;
