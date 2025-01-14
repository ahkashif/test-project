import React from "react";
import Image from "next/image";

function EventBanner() {
	return (
		<div className="w-full px-100 rounded-[20px] bg-event-card-gradient relative">
			<div className="circle w-[486px] h-[486px] rounded-[486px] opacity-[0.3] bg-white absolute right-[60px] top-[20]"></div>
			<div className="circle w-[486px] h-[486px] rounded-[486px] opacity-[0.3] bg-white absolute bottom-[60px] right-[-135px]"></div>
			<div className="flex flex-row">
				<div className="flex flex-col gap-40 w-3/5 py-70">
					<div className="flex flex-col gap-10">
						<p className="text-body1 text-white font-light">Inspire change and drive innovation.</p>
						<div className="max-w-[87%]">
							<h3 className="text-h3 text-white font-semibold">
								Ignite the Future:
								<span className="inline-block text-inherit">Be the Spark for innovation!</span>{" "}
							</h3>
							<p className="text-body1 text-white font-light">
								Submit your ideas to Ignite and showcase your vision for innovation and impact. Join us in shaping the
								future!
							</p>
						</div>
					</div>
					<div className="flex flex-row gap-20">
						<button className="bg-white border border-white px-20 py-[13px] text-gray-1 rounded-[55px] text-body1 font-regular">
							Submit your idea
						</button>
						<button className="bg-transparent border border-white px-20 py-[13px] text-white rounded-[55px] text-body1 font-regular">
							Know more
						</button>
					</div>
				</div>
				<div className="w-2/5">
					<div className="relative">
						<div className="bg-white rounded-[10px] p-20 max-w-[305px] w-full absolute top-[50%] z-10">
							<div className="mb-15">
								<p className="text-body-3 mb-5 dark:text-white leading-none">March 14 - 16, 2025</p>
								<h4 className="font-regular text-title1 dark:text-white leading-none">PIF Flagship Innovation Expo</h4>
							</div>

							<div className="flex flex-row gap-10 items-center">
								<div className="flex flex-row">
									{Array.from({ length: 5 }).map((_, index) => (
										<div
											key={index}
											className={`w-[22px] h-[22px] rounded-full border border-divider dark:border-dark-4 ${
												index !== 0 && "-ml-[7.5px]"
											} ${
												index === 4 &&
												"bg-primary-green text-white text-[9.2px] font-semibold grid place-items-center border-0"
											}`}>
											{index === 4 ? (
												<span
													key={index}
													className="text-white">{`${345 - 4}+`}</span>
											) : (
												<Image
													key={index}
													src={`/avatar-small-${index + 1}.svg`}
													alt="avatar-small"
													loading="lazy"
													width={22}
													height={22}
													className="w-full h-full"
												/>
											)}
										</div>
									))}
								</div>
								<span className="text-body3 font-light text-foreground dark:text-white">341 Attending</span>
							</div>
						</div>
						<Image
							src={"/event-banner-image-1.png"}
							alt="event-banner-image-1"
							width={285}
							height={420}
							className="max-h-[420px] object-contain ml-auto relative left-[65px]"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EventBanner;
