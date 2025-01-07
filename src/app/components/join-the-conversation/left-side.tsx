import React from "react";
import Icon from "../icon/icons";
import Image from "next/image";

function LeftSide() {
	return (
		<div className="rounded-[10px] overflow-hidden border border-divider dark:border-dark-4">
			<div className="p-20 bg-primary-lightGold3_20">
				<h5 className="text-title1 text-black flex flex-row gap-10 dark:text-white font-regular">
					<Icon name="trending" />
					Trending
				</h5>
			</div>

			<div className="p-20 border-b dark:border-dark-4">
				<h5 className="text-title1 text-black flex flex-row gap-10 dark:text-white font-regular">Topics</h5>
			</div>

			<div className="p-20 border-b dark:border-dark-4">
				<h5 className="text-body1 text-black dark:text-white font-light flex flex-col gap-5">
					Building Management System
					<p className="text-body3 font-light text-primary-gold ">2 days ago</p>
				</h5>
			</div>
			<div className="p-20 border-b dark:border-dark-4">
				<h5 className="text-body1 text-black  dark:text-white font-light flex flex-col gap-5">
					Energy Monitoring System
					<p className="text-body3 font-light text-primary-gold ">1 week ago</p>
				</h5>
			</div>
			<div className="p-20 border-b dark:border-dark-4">
				<h5 className="text-body1 text-black dark:text-white font-light flex flex-col gap-5">
					Smart HVAC System
					<p className="text-body3 font-light text-primary-gold ">3 months ago</p>
				</h5>
			</div>

			<div className="p-20 border-b dark:border-dark-4">
				<h5 className="text-title1 text-black flex flex-row gap-10 dark:text-white font-regular">Experts</h5>
			</div>

			<div className="p-20 border-b dark:border-dark-4">
				<h5 className="text-body text-black flex flex-row gap-10 dark:text-white font-light ">
					<Image
						className="w-[40px]"
						src="/expert-1.svg"
						alt="expert-1"
						loading="lazy"
						width={40}
						height={40}
					/>
					<div className="flex flex-col gap-5 dark:text-white">
						Jeremy Caulton
						<p className="text-body3 font-light text-primary-gold ">Principal - Urban Design</p>
					</div>
				</h5>
			</div>

			<div className="p-20 border-b dark:border-dark-4">
				<h5 className="text-body1 text-black dark:text-white font-light flex flex-row gap-20">
					<Image
						className="w-[40px]"
						src="/expert-2.svg"
						alt="expert-2"
						loading="lazy"
						width={40}
						height={40}
					/>
					<div className="flex flex-col gap-5 dark:text-white">
						Romil Sheth
						<p className="text-body3 font-light text-primary-gold ">Principal Urban Designer</p>
					</div>
				</h5>
			</div>
			<div className="p-20">
				<h5 className="text-body1 text-black dark:text-white font-light flex flex-row gap-20">
					<Image
						className="w-[40px]"
						src="/expert-3.svg"
						alt="John McAslan"
						loading="lazy"
						width={40}
						height={40}
					/>
					<div className="flex flex-col gap-5 dark:text-white">
						John McAslan
						<p className="text-body3 font-light text-primary-gold ">Managing Director</p>
					</div>
				</h5>
			</div>
		</div>
	);
}

export default LeftSide;
