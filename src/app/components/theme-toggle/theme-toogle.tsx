"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

export function ModeToggle() {
	const [currtheme, setCurrTheme] = useState("light");
	const { setTheme } = useTheme();

	const changeCurrTheme = () => {
		if (currtheme === "light") {
			setTheme("dark");
			setCurrTheme("dark");
		} else {
			setTheme("light");
			setCurrTheme("light");
		}
	};

	useEffect(() => {
		setTheme("light");
		setCurrTheme("light");
	}, []);

	return (
		<div
			onClick={changeCurrTheme}
			className="cursor-pointer">
			Switch Color mode
		</div>
	);
}
