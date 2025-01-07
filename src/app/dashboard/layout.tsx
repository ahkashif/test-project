import AsideLink from "../components/atoms/asideLink";
import Header from "../components/header/header";
import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Public Investment Fund",
	description: "Public Investment Fund",
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<main className="flex flex-row">
				<aside className="w-[18%] h-[100dvh] bg-foreground fixed z-30">
					<div className="p-20">
						<Image
							src="/pif-logo-dark.svg"
							alt="event"
							className=""
							loading="lazy"
							width={90}
							height={40}
						/>
					</div>

					<div className="">
						<AsideLink
							text={"Dashboard"}
							iconName={"dashboard"}
							route={"/dashboard"}
						/>
						<AsideLink
							text={"Technology & Pilots"}
							iconName={"pilot"}
							route={"/dashboard/tech-and-pilots"}
						/>
						<AsideLink
							text={"Innovation Challenges"}
							iconName={"challenge"}
							route={"/dashboard/challenges"}
						/>
						<AsideLink
							text={"Ignite"}
							iconName={"backlog"}
							route={"/dashboard/ignite"}
						/>
						<AsideLink
							text={"Companies"}
							iconName={"companies"}
							route={"/dashboard/companies"}
						/>
						<AsideLink
							text={"Community"}
							iconName={"community-1"}
							route={"/dashboard/community"}
						/>
						<AsideLink
							text={"Experts"}
							iconName={"expert"}
							route={"/dashboard/expets"}
						/>
						<AsideLink
							text={"Events"}
							iconName={"calender"}
							route={"/dashboard/events"}
						/>
					</div>
				</aside>
				<div className="pt-90 w-[82%] ml-auto bg-background2">{children}</div>
			</main>
		</>
	);
}
