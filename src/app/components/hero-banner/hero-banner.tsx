import React from "react";
import BannerCard from "./banner-cards";

function HeroBanner() {
	return (
		<div>
			{/* <section
				className="relative min-h-[650px] overflow-hidden bg-gradient-to-b from-black/50 to-black/50 z-0"
				aria-label="Background video of city skyline">
				<video
					autoPlay
					muted
					loop
					aria-hidden="true"
					className="absolute inset-0 w-full h-full object-cover -z-10">
					<source
						src="/hero-video.mp4"
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>

				<div
					className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 text-shadow-md w-full"
					id="main-content">
					<h1 className="text-mainTitle font-medium mb-2 text-white">Real Estate Innovation Hub</h1>
					<p className="text-subtitle3 font-light text-white">
						Connecting you with the real estate innovation ecosystem
					</p>
				</div>
			</section> */}

			<section
				className="relative min-h-[650px] overflow-hidden bg-gradient-to-b from-black/50 to-black/50 z-0"
				aria-label="Background video of city skyline">
				<video
					autoPlay
					muted
					loop
					aria-hidden="true"
					className="absolute inset-0 w-full h-full object-cover -z-20">
					<source
						src="/hero-video.mp4"
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>

				<div
					className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 -z-10"
					aria-hidden="true"></div>

				<div
					className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 text-shadow-md w-full"
					id="main-content">
					<h1 className="text-mainTitle font-medium mb-2 text-white">Real Estate Innovation Hub</h1>
					<p className="text-subtitle3 font-light text-white">
						Connecting you with the real estate innovation ecosystem
					</p>
				</div>
			</section>

			<div className="flex items-center gap-8 px-70 -mb-[110px] relative bottom-[110px]">
				<BannerCard
					value={65}
					text="Pilot success stories"
					linkText="Get the reports"
				/>

				<BannerCard
					value={174}
					text="Approved technologies for users"
					linkText="View all"
				/>

				<BannerCard
					value={215}
					text="Subject matter experts"
					linkText="View all"
				/>

				<BannerCard
					value={9}
					text="Upcoming events"
					linkText="Get involved"
				/>
			</div>
		</div>
	);
}

export default HeroBanner;
