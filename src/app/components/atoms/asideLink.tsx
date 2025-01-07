"use client";

import Link from "next/link";
import React from "react";
import Icon from "../icon/icons";
import { usePathname } from "next/navigation";

interface asideLinkProps {
	text: string;
	iconName: string;
	route: string;
}

function AsideLink({ text, iconName, route }: asideLinkProps) {
	const pathName = usePathname();

	return (
		<Link
			href={route}
			className={`p-20  flex flex-row gap-10 ${pathName === route ? "bg-secondary-brown " : "border-b border-dark-2"}`}>
			<Icon
				name={iconName}
				classes="invert"
			/>
			<span className="text-white font-light">{text}</span>
		</Link>
	);
}

export default AsideLink;
