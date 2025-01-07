"use client";

import React from "react";
import Link from "next/link";
import Icon from "../icon/icons";
import CustomButton from "../button/button";
import Image from "next/image";

function Footer() {
	return (
		<footer className="bg-primary-lightGold4 flex flex-col dark:bg-dark-1">
			<div className="pif-footer-primary flex justify-between p-70">
				<Link href="/">
					<Image
						src="/pif-logo-large.svg"
						alt="PIF Logo"
						className="h-auto w-48"
						loading="lazy"
						width={250}
						height={110}
					/>
				</Link>

				<div className="flex flex-col gap-2">
					<p className="text-lg font-medium text-black dark:text-white">Main Menu</p>
					<div className="flex flex-col gap-2">
						<Link
							href="/"
							className={`text-body2 text-black font-light dark:text-white`}>
							Home
						</Link>
						<Link
							href="/pilots"
							className={`text-body2 text-black font-light dark:text-white`}>
							Pilots
						</Link>
						<Link
							href="/companies"
							className={`text-body2 text-black font-light dark:text-white`}>
							Companies
						</Link>
						<Link
							href="/community"
							className={`text-body2 text-black font-light dark:text-white`}>
							Community
						</Link>
						<Link
							href="/experts"
							className={`text-body2 text-black font-light dark:text-white`}>
							Experts
						</Link>
						<Link
							href="/events"
							className={`text-body2 text-black font-light dark:text-white`}>
							Events
						</Link>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<p className="text-lg font-medium text-black dark:text-white">Social Media Account</p>
					<div className="flex gap-4">
						<Icon
							name="facebook"
							size={43}
						/>
						<Icon
							name="instagram"
							size={43}
						/>
						<Icon
							name="linkedin"
							size={43}
						/>
						<Icon
							name="twitter"
							size={43}
						/>
						<Icon
							name="youtube"
							size={43}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<p className="text-lg font-medium text-black dark:text-white">For any enquiries, get in touch</p>
					<CustomButton
						variant="primary"
						classes="w-fit"
						loading={false}>
						Contact Us
					</CustomButton>
				</div>
			</div>

			<div className="pif-footer-secondary px-70 py-30 bg-dark-2 flex flex-row justify-between">
				<div className="pif-footer-secondary-links flex flex-row gap-30">
					<Link
						href="/"
						className={`text-body2 font-light text-white`}>
						Terms of Use
					</Link>
					<Link
						href="/pilots"
						className={`text-body2 font-light text-white`}>
						Disclaimer
					</Link>
					<Link
						href="/companies"
						className={`text-body2 font-light text-white`}>
						Privacy Notice
					</Link>
				</div>

				<div className="pif-footer-copyright">
					<p className="body2 font-light text-white">All rights reserved to Public Investment Fund © 2017 - 2024</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
