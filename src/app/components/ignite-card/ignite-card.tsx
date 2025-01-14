import { IgniteTypes } from "@/app/api/common/add-ignite/route";
import React from "react";

function IgniteCard({
	ignite = {
		ideaName: "",
		ideaDescription: "",
		submissionSource: "",
		associatedChallenges: "",
		submittedBy: "",
		category: "",
		sector: "",
		technologyProvider: "",
		technologyType: "",
		supportingFiles: "",
		status: "",
		submissionDate: "",
	},
	width = "small",
}: {
	ignite: IgniteTypes;
	width: string;
}) {
	const cardWidth = width === "full" ? "w-full" : width;
	return (
		<div className={`border rounded-[10px] ${cardWidth} overflow-hidden`}>
			<div className="h-[275px] w-full">
				<img
					src={ignite.supportingFiles}
					alt={ignite.ideaName}
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="flex flex-col justify-between p-30">
				<div className="flex flex-col justify-between min-h-[280px]">
					<div className="flex flex-col gap-30">
						<div className="flex flex-row justify-between ">
							<div className="text-title2 font-regular">{ignite.submissionDate}</div>
							<div className="text-body2 font-light py-[10px] px-[15px] max-h-[28px] bg-foreground text-white rounded-full flex items-center justify-center">
								Long Term
							</div>
						</div>
						<div className="flex flex-col gap-5">
							<h5 className="text-h5 font-semibold">{ignite.ideaName}</h5>
							<p className="text-body2 font-light">{ignite.ideaDescription}</p>
						</div>
						<div className="flex flex-row gap-15 items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="17"
								height="19"
								viewBox="0 0 17 19"
								fill="none">
								<path
									d="M8.74835 4.19531C6.22439 4.19531 4.19531 6.22439 4.19531 8.74835C4.19531 11.2723 6.22439 13.3014 8.74835 13.3014C11.2723 13.3014 13.3014 11.2723 13.3014 8.74835C13.3014 6.22439 11.2228 4.19531 8.74835 4.19531ZM8.74835 12.2621C6.81826 12.2621 5.23459 10.6784 5.23459 8.74835C5.23459 6.81826 6.81826 5.23459 8.74835 5.23459C10.6784 5.23459 12.2621 6.81826 12.2621 8.74835C12.2621 10.6784 10.6784 12.2621 8.74835 12.2621Z"
									fill="#CC963F"
								/>
								<path
									d="M1.47341 8.40271C1.47341 4.28652 4.78066 0.979271 8.89685 0.979271C12.9305 0.979271 16.3203 4.29001 16.3203 8.40271C16.3203 12.5189 13.013 15.8261 8.89685 15.8261C4.78066 15.8261 1.47341 12.5189 1.47341 8.40271Z"
									stroke="#CC963F"
									strokeWidth="0.989791"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M9.53959 12.9553H8.79725H8.0549V17.8052H9.53959V12.9553ZM7.01562 12.0645V18.6466H10.5294V12.0645C10.5294 12.0645 9.93551 12.2624 8.74776 12.2624C7.56001 12.2624 7.01562 12.0645 7.01562 12.0645Z"
									fill="#CC963F"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M9.5396 3.00781V4.54199H8.5498V3.00781H9.5396Z"
									fill="#CC963F"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M13.2582 5.23504L12.2614 6.23187L11.5615 5.53198L12.5583 4.53516L13.2582 5.23504Z"
									fill="#CC963F"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M14.3408 9.39258H12.3612V8.40279H14.3408V9.39258Z"
									fill="#CC963F"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M2.95801 8.40234H4.44269V9.39213H2.95801V8.40234Z"
									fill="#CC963F"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M5.23407 4.33789L6.23089 5.33472L5.531 6.0346L4.53418 5.03778L5.23407 4.33789Z"
									fill="#CC963F"
								/>
							</svg>
							<p className="text-subtitle1 font-semibold text-primary-gold">5 ideas Matched</p>
						</div>
					</div>
					<div className="flex flex-row justify-between">
						<button
							className={`w-fit px-20 py-[13px] border border-secondary-brown text-secondary-brown bg-white rounded-full text-button font-regular`}>
							Submit your idea
						</button>

						<a
							href="#"
							className="flex items-center gap-10 text-underline1  underline font-regular">
							View More
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IgniteCard;
