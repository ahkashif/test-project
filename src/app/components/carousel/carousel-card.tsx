import React from "react";
import Icon from "../icon/icons";
import Image from "next/image";

interface CarouselCardTypes {
	imgUrl: string;
	companyLogo: string;
	companyName: string;
	category: string;
}

function CarouselCard({ imgUrl, companyLogo, companyName, category }: CarouselCardTypes) {
	return (
		<div className="border-divider dark:border-dark-4 flex flex-col justify-between rounded-[10px] bg-white overflow-hidden dark:bg-gray-1">
			<Image
				className="h-[250px] w-full"
				src={imgUrl}
				alt="companyName"
				loading="lazy"
				width={100}
				height={250}
			/>

			<div className="p-20 flex flex-col gap-20 justify-start dark:bg-gray-1">
				<div className="flex flex-row gap-10 justify-start items-center">
					<div className="w-[50px] h-[50px] border border-divider dark:border-dark-4 grid place-items-center bg-white">
						<Image
							src={companyLogo}
							alt="Logo"
							className=""
							loading="lazy"
							width={16}
							height={9}
						/>
					</div>

					<div>
						<div className="text-title1 text-foreground font-regular flex flex-row gap-10 justify-start items-center dark:text-white ">
							{companyName}
							<span className="inline-block">
								<Icon
									name="check-gold"
									size={14.2}
									classes="no-invert"
								/>
							</span>
						</div>

						<div className="text-body2 font-light text-primary-gold">{category}</div>
					</div>
				</div>
				<div className="text-underlineLink2 underline font-regular flex flex-row gap-10 justify-start items-center dark:text-white">
					<Icon
						name="download"
						size={18}
					/>
					<span className="dark:text-white">Download Company Dossier</span>
				</div>
			</div>
		</div>
	);
}

export default CarouselCard;
