import React from "react";
import Text from "../text/text";
import LeftSide from "../join-the-conversation/left-side";
import Label from "../atoms/label";
import Image from "next/image";
import CustomButton from "../button/button";
import Icon from "../icon/icons";

function CommunityTopics() {
	return (
		<div>
			<div className="flex flex-col gap-70">
				<div className="grid grid-cols-12 gap-40">
					{/* Left Section */}
					<div className="col-span-12 md:col-span-9 flex flex-col gap-30">
						<Text
							value="Join our real estate centered discussions"
							tagName="h4"
							typography="h4"
						/>

						<div className="relative rounded-[10] overflow-hidden shadow-lg">
							<Image
								src={"/community-card-1.jpeg"}
								alt={"title"}
								className="w-full h-full object-cover max-h-[475px]"
								loading="lazy"
								width={965}
								height={475}
							/>

							{/* Content */}
							<div className="absolute bottom-0 text-white z-10 w-full p-[30px] flex flex-col justify-between">
								<div className="flex justify-between items-center">
									<div className="flex flex-col gap-20">
										<div className="flex flex-row gap-20">
											<Label
												category={"category A"}
												color="green"
											/>
											<Label
												category={"category B"}
												color="green"
											/>
											<Label
												category={"category C"}
												color="green"
											/>
										</div>

										<h4 className="text-h4 text-white font-semibold">{"title"}</h4>
									</div>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-12 gap-40">
							<div className="col-span-12 md:col-span-4 flex">
								<div className="flex flex-col gap-10">
									<div className="border border-divider rounded-[10px] p-20">
										<div className="flex flex-row gap-10 items-center">
											<div className="flex flex-row">
												{Array.from({ length: 5 }).map((_, index) => (
													<div
														key={index}
														className={`w-30 h-30 rounded-full border border-divider dark:border-dark-4 ${
															index !== 0 && "-ml-[7.5px]"
														} ${
															index === 4 &&
															"bg-primary-green text-white text-[9.2px] font-semibold grid place-items-center border-0"
														}`}>
														{index === 4 ? (
															<span
																key={index}
																className="text-inherit">{`${341 - 4}+`}</span>
														) : (
															<Image
																key={index}
																src={`/avatar-small-${index + 1}.svg`}
																alt="avatar-small"
																loading="lazy"
																width={16}
																height={9}
																className="w-full h-full"
															/>
														)}
													</div>
												))}
											</div>
											<span className="text-subtitle2 font-semibold text-foreground dark:text-white">
												{345} Members
											</span>
										</div>
									</div>

									<div className="border border-divider rounded-[10px] p-20 text-body2 font-light">
										Created by: <span className="text-subtitle1 font-semibold">Nicola Rodriguez</span>
									</div>

									<div className="border border-divider rounded-[10px] p-20 text-body2 font-light">
										Created on: <span className="text-subtitle1 font-semibold">23 Dec 2024</span>
									</div>

									<CustomButton classes="mt-10">Invite contributor</CustomButton>
									<CustomButton
										classes="mt-10"
										variant="secondary">
										<Icon name={"share"} />
										Share Discussion
									</CustomButton>
								</div>
							</div>

							<div className="col-span-12 md:col-span-8 flex">
								<div className="flex flex-col gap-30">
									<div className=" flex flex-col gap-20 p-30 bg-primary-lightGold3_20">
										<h5 className="text-h5 font-semibold">About this topic</h5>
										<p className="text-body1 font-light ">
											A community for sustainable construction materials users looking to learn from others, share
											studies and information. Your go to place for resources and conversation about all the latest
											sustainable construction materials.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Section */}
					<div className="col-span-12 md:col-span-3 flex flex-col gap-30">
						<Text
							value="Recently Added"
							tagName="h6"
							typography="h6"
							classes="invisible"
						/>

						<LeftSide />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CommunityTopics;
