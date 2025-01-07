"use client";
import EmblaCarousel from "./components/carousel/carousel";
import HeroBanner from "./components/hero-banner/hero-banner";
import LeftSide from "./components/join-the-conversation/left-side";
import RightSide from "./components/join-the-conversation/right-side";
import RecentlyAdded from "./components/recently-added/recently-added-container";
import Spotlight from "./components/spotlight/spotlight";
import Text from "./components/text/text";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import BannerCard from "./components/hero-banner/banner-cards";

export default function Home() {
	return (
		<>
			<Header />
			<main className="dark:bg-dark-2 pt-[90px]">
				<div className="app">
					<HeroBanner />

					<div className="bg-background1 dark:bg-dark-1 overflow-hidden pb-100">
						<Text
							value="Real Estate Innovation Platform serves five focus areas"
							tagName="h4"
							typography="h4"
							classes="mb-[30px] p-70 pt-100 pb-0"
						/>

						<EmblaCarousel
							slidesData={"INNOVATION_SLIDES_DATA"}
							carouselType={"INNOVATION"}
							slidesInView={3}
						/>
					</div>

					<div className="flex-1 p-70 dark:bg-dark-2">
						<div className="mb-20">
							<Text
								value="Shaping the future of Saudi Arabia through our real estate accelerator"
								tagName="h4"
								typography="h4"
								classes="mb-[30px]"
							/>

							<div className="grid grid-cols-12 gap-40">
								{/* Left Section */}
								<div className="col-span-12 md:col-span-9 flex flex-col gap-30">
									<Text
										value="Spotlight"
										tagName="h6"
										typography="h6"
									/>

									<Spotlight />
								</div>

								{/* Right Section */}
								<div className="col-span-12 md:col-span-3 flex flex-col gap-30">
									<Text
										value="Recently Added"
										tagName="h6"
										typography="h6"
									/>

									<RecentlyAdded />
								</div>
							</div>
						</div>
					</div>

					<div className="bg-background1 dark:bg-dark-1 overflow-hidden pb-70">
						<Text
							value="Find companies with a broad spectrum of technological expertise for your pilot"
							tagName="h4"
							typography="h4"
							classes="mb-[30px] p-70 pb-0"
						/>

						<EmblaCarousel
							slidesData={"COMPANY_SLIDES_DATA"}
							carouselType={"COMPANIES"}
							slidesInView={3}
						/>
					</div>

					<div className="flex-1 p-70 dark:bg-dark-2">
						<div className="mb-20">
							<Text
								value="Join the conversation to shape the cities of tomorrow"
								tagName="h4"
								typography="h4"
								classes="mb-[30px]"
							/>

							<div className="grid grid-cols-12 gap-40">
								{/* Left Section */}
								<div className="col-span-12 md:col-span-9 flex flex-col gap-30">
									<RightSide />
								</div>

								{/* Right Section */}
								<div className="col-span-12 md:col-span-3 flex flex-col gap-30">
									<LeftSide />
								</div>
							</div>
						</div>
					</div>

					<div className="bg-background1 dark:bg-dark-1 pb-70 pr-0 overflow-hidden">
						<Text
							value="Connect with subject matter experts from around the globe"
							tagName="h4"
							typography="h4"
							classes="mb-[30px] p-70 pb-0"
						/>

						<EmblaCarousel
							slidesData={"PROFILE_SLIDES_DATA"}
							carouselType={"PROFILES"}
							slidesInView={3}
						/>
					</div>

					<div className="bg-background1 dark:bg-dark-2 pb-70 pr-0 overflow-hidden">
						<Text
							value="Let’s meet in person to drive innovation and transformation"
							tagName="h4"
							typography="h4"
							classes="mb-[30px] p-70 pb-0"
						/>

						<EmblaCarousel
							slidesData={"EVENTS_SLIDES_DATA"}
							carouselType={"EVENTS"}
							slidesInView={1}
						/>
					</div>

					<div className="flex items-center gap-8 relative bg-white dark:bg-dark-2 p-70 overflow-hidden">
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
			</main>

			<Footer />
		</>
	);
}
