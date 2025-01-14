import React from "react";
import Image from "next/image";

function Banner() {
	return (
		<div>
			<section
				className="relative min-h-[430px] overflow-hidden bg-gradient-to-b from-black/50 to-black/50 z-0"
				aria-label="Background video of city skyline">
				<Image
					src={"/banner-1.png"}
					alt={"banner"}
					fill
					className="max-h-[430px] object-cover absolute -z-20"
				/>

				<div
					className="absolute inset-0 bg-banner-gradient -z-10"
					aria-hidden="true"></div>

				<div className="absolute max-w-[790px] inset-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 text-shadow-md w-full">
					<h5 className="text-h5 font-medium mb-2 text-white">Real Estate Innovation Hub</h5>
					<h4 className="text-h4 font-semibold text-white">Join the conversation to shape the cities of tomorrow</h4>
				</div>
			</section>
		</div>
	);
}

export default Banner;
