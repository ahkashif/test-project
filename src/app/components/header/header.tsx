"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import CustomButton from "../button/button";
import Icon from "../icon/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/libs/store/store";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { updateUserDetails } from "@/app/libs/store/slices/userDetailsSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "../theme-toggle/theme-toogle";
import { useRouter } from "next/navigation";

function Header() {
	const pathName = usePathname();
	const dispatch = useDispatch();
	const isDashboardRoute = pathName.startsWith("/dashboard");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const userDetails = useSelector((state: RootState) => state.userDetails);
	const [isRTL, setIsRTL] = useState(false);
	const router = useRouter();

	const toggleDirection = () => {
		setIsRTL((prev) => !prev);
	};

	const logUserOut = async () => {
		try {
			const response = await axios.get("/api/users/logout");
			if (response.status === 200) {
				dispatch(
					updateUserDetails({
						username: "",
						email: "",
						profilePhoto: "",
						designation: "",
					})
				);
				setIsLoggedIn(false);
				router.push("/");
			}
		} catch (error) {
			console.log("Error Occured", error);
		}
	};

	useEffect(() => {
		document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
	}, [isRTL]);

	useEffect(() => {
		const cookies = parseCookies();
		const token = cookies["token"];

		const fetchUser = async () => {
			const response = await axios.get("/api/users/profile");

			if (response.status === 200) {
				const data = response.data.data;

				dispatch(
					updateUserDetails({
						username: data.username,
						email: data.email,
						profilePhoto: data.profilePhoto,
						designation: data.designation,
					})
				);
			} else if (response.status === 400) {
				router.push("/login");
			}
		};

		if (token) {
			setIsLoggedIn(true);

			if (!userDetails.username) {
				fetchUser();
			}
		}
	}, []);

	return (
		<header className="fixed top-0 w-full flex items-center gap-8 px-70 bg-white z-20 border-b border-b-divider backdrop-blur-[25px] min-h-[90px] dark:bg-dark-2">
			{!isDashboardRoute && (
				<>
					<Link
						href="/"
						className="w-90 h-40">
						<Image
							src="/pif-logo.svg"
							alt="PIF Logo"
							className="cursor-pointer dark:hidden"
							loading="lazy"
							width={90}
							height={40}
						/>

						<Image
							src="/pif-logo-dark.svg"
							alt="PIF Logo"
							className="cursor-pointer hidden dark:inline"
							loading="lazy"
							width={90}
							height={40}
						/>
					</Link>

					<nav className="flex gap-20 items-center mx-8">
						<Link
							href="/"
							className={`text-body2 py-2 px-2 flex items-center min-h-[90px] transition-colors duration-300 hover:text-green-700 dark:text-white ${
								pathName === "/"
									? "border-b-4 border-primary-lightGreen1 font-medium text-primary-lightGreen1"
									: "text-foreground"
							}`}>
							Home
						</Link>
						<Link
							href="/pilots"
							className={`text-body2 text-center py-2 px-2 flex items-center min-h-[90px] transition-colors duration-300 hover:text-green-700 dark:text-white ${
								pathName === "/pilots"
									? "border-b-4 border-primary-lightGreen1 font-medium text-primary-lightGreen1"
									: "text-foreground"
							}`}>
							Pilots
						</Link>
						<Link
							href="/companies"
							className={`text-body2 py-2 px-2 flex items-center min-h-[90px] transition-colors duration-300 hover:text-green-700 dark:text-white ${
								pathName === "/companies"
									? "border-b-4 border-primary-lightGreen1 font-medium text-primary-lightGreen1"
									: "text-foreground"
							}`}>
							Companies
						</Link>
						<Link
							href="/community"
							className={`text-body2 py-2 px-2 flex items-center min-h-[90px] transition-colors duration-300 hover:text-green-700 dark:text-white ${
								pathName === "/community"
									? "border-b-4 border-primary-lightGreen1 font-medium text-primary-lightGreen1"
									: "text-foreground"
							}`}>
							Community
						</Link>
						<Link
							href="/experts"
							className={`text-body2 py-2 px-2 flex items-center min-h-[90px] transition-colors duration-300 hover:text-green-700 dark:text-white ${
								pathName === "/experts"
									? "border-b-4 border-primary-lightGreen1 font-medium text-primary-lightGreen1"
									: "text-foreground"
							}`}>
							Experts
						</Link>
						<Link
							href="/events"
							className={`text-body2 py-2 px-2 flex items-center min-h-[90px] transition-colors duration-300 hover:text-green-700 dark:text-white ${
								pathName === "/events"
									? "border-b-4 border-primary-lightGreen1 font-medium text-primary-lightGreen1"
									: "text-foreground"
							}`}>
							Events
						</Link>
					</nav>
				</>
			)}

			<div className="flex gap-20 items-center ml-auto py-2 rtl:mr-auto rtl:ml-[unset]">
				<Icon name="search" />

				<Icon
					name="notification"
					classes="dark:fill-white"
					color="white"
				/>

				<div className="hidden">
					<ModeToggle />
				</div>

				{isLoggedIn ? (
					<div className="flex items-center gap-10">
						<Avatar className="w-40 h-40">
							<AvatarImage
								src={userDetails.profilePhoto || ""}
								alt="@shadcn"
								className="w-40 h-40"
							/>
							<AvatarFallback>{userDetails?.username[0]?.toUpperCase() || ""}</AvatarFallback>
						</Avatar>
						<div className="flex flex-col items-start">
							<p className="text-body2 font-medium">{userDetails.username}</p>
							<p className="text-body3 text-status-gray">{userDetails.designation}</p>
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost">
									<Icon name="chevron-down" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-56"
								side="bottom"
								align="end"
								sideOffset={40}>
								<DropdownMenuLabel className="bg-secondary-brown">
									<div className="flex flex-row w-full justify-between">
										<p className="text-white">{userDetails.designation}</p>
										<Icon
											name={"export"}
											size={18}
											color="white"
											classes="invert"
										/>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<div className="flex flex-row w-full justify-between">
											<div className="flex flex-row gap-10">
												<Icon
													name={"community-1"}
													size={18}
												/>
												<p className="text-body2 font-light">Community</p>
											</div>
											<Icon
												name={"chevron-right"}
												size={18}
											/>
										</div>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<div className="flex flex-row w-full justify-between">
											<div className="flex flex-row gap-10">
												<Icon
													name={"expert"}
													size={18}
												/>
												<p className="text-body2 font-light">My Profile</p>
											</div>
											<Icon
												name={"chevron-right"}
												size={18}
											/>
										</div>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<div className="flex flex-row w-full justify-between">
											<div className="flex flex-row gap-10">
												<Icon
													name={"settings"}
													size={18}
												/>
												<p className="text-body2 font-light">Settings</p>
											</div>
											<Icon
												name={"chevron-right"}
												size={18}
											/>
										</div>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<div className="flex flex-row w-full justify-between">
											<div className="flex flex-row gap-10">
												<Icon
													name={"expert"}
													size={18}
												/>
												<p className="text-body2 font-light">My Profile</p>
											</div>
											<Icon
												name={"chevron-right"}
												size={18}
											/>
										</div>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={toggleDirection}>
										<div className="flex flex-row w-full justify-between">
											<div className="flex flex-row gap-10">
												<Icon
													name={"globe"}
													size={18}
												/>
												<p className="text-body2 font-light">Switch to {!isRTL ? "عربي" : "English"}</p>
											</div>
											<Icon
												name={"chevron-right"}
												size={18}
											/>
										</div>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<div className="flex flex-row w-full justify-between">
											<div className="flex flex-row gap-10">
												<Icon
													name={"switch"}
													size={18}
												/>
												<p className="text-body2 font-light">
													<ModeToggle />
												</p>
											</div>
											<Icon
												name={"chevron-right"}
												size={18}
											/>
										</div>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={logUserOut}>
										<div className="flex flex-row w-full justify-between">
											<div className="flex flex-row gap-10">
												<Icon
													name={"logout"}
													size={18}
												/>
												<p className="text-body2 font-light">Logout</p>
											</div>
											<Icon
												name={"chevron-right"}
												size={18}
											/>
										</div>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				) : (
					<CustomButton
						classes="border border-gray-800"
						variant="secondary"
						loading={false}>
						<Link
							href="/login"
							className={`text-body2 py-2 px-2 flex items-center min-h-[90px] transition-colors duration-300 hover:text-green-700 dark:text-white ${
								pathName === "/login"
									? "border-b-4 border-primary-lightGreen1 font-medium text-primary-lightGreen1"
									: "text-foreground"
							}`}>
							Sign Up
						</Link>
					</CustomButton>
				)}
			</div>
		</header>
	);
}

export default Header;
