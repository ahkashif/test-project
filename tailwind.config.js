/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				light: ["Fund-Light", "sans-serif"],
				regular: ["Fund-Regular", "sans-serif"],
				medium: ["Fund-Medium", "sans-serif"],
				semibold: ["Fund-SemiBold", "sans-serif"],
			},
			fontSize: {
				mainTitle: [
					"64px",
					{
						lineHeight: "72px",
						fontWeight: "500",
						fontFamily: "Fund-Medium",
					},
				],
				h1: [
					"56px",
					{
						lineHeight: "70px",
						fontWeight: "500",
						fontFamily: "Fund-Medium",
					},
				],
				h2: [
					"48px",
					{
						lineHeight: "60px",
						fontWeight: "500",
						fontFamily: "Fund-Medium",
					},
				],
				h3: [
					"40px",
					{
						lineHeight: "50px",
						fontWeight: "500",
						fontFamily: "Fund-Medium",
					},
				],
				h4: [
					"32px",
					{
						lineHeight: "40px",
						fontWeight: "500",
						fontFamily: "Fund-Medium",
					},
				],
				h5: [
					"24px",
					{
						lineHeight: "30px",
						fontWeight: "500",
						fontFamily: "Fund-Medium",
					},
				],
				h6: [
					"20px",
					{
						lineHeight: "25px",
						fontWeight: "500",
						fontFamily: "Fund-Medium",
					},
				],
				title1: [
					"18px",
					{
						lineHeight: "25px",
						fontWeight: "400",
						fontFamily: "Fund-Regular",
					},
				],
				title2: [
					"16px",
					{
						lineHeight: "20px",
						fontWeight: "400",
						fontFamily: "Fund-Regular",
					},
				],
				subtitle1: [
					"16px",
					{
						lineHeight: "20px",
						fontWeight: "500",
						fontFamily: "Fund-Medium",
					},
				],
				subtitle2: [
					"14px",
					{
						lineHeight: "20px",
						fontWeight: "500",
						fontFamily: "Fund-Medium",
					},
				],
				body1: [
					"16px",
					{
						lineHeight: "20px",
						fontWeight: "300",
						fontFamily: "Fund-Light",
					},
				],
				body2: [
					"14px",
					{
						lineHeight: "20px",
						fontWeight: "300",
						fontFamily: "Fund-Light",
					},
				],
				body3: [
					"12px",
					{
						lineHeight: "18px",
						fontWeight: "300",
						fontFamily: "Fund-Light",
					},
				],
				button: [
					"16px",
					{
						lineHeight: "20px",
						fontWeight: "400",
						fontFamily: "Fund-Regular",
					},
				],
				underlineLink1: [
					"16px",
					{
						lineHeight: "20px",
						fontWeight: "400",
						fontFamily: "Fund-Regular",
					},
				],
				underlineLink2: [
					"14px",
					{
						lineHeight: "20px",
						fontWeight: "400",
						fontFamily: "Fund-Regular",
					},
				],
				subtitle3: [
					"28px",
					{
						lineHeight: "normal",
						fontWeight: "300",
						fontFamily: "Fund-Light",
					},
				],
			},
			colors: {
				primary: {
					green: "#005c4d",
					lightGreen1: "#007f71",
					lightGreen2: "#539f94",
					lightGreen3: "#8fbfb8",
					lightGreen4: "#c8dfdb",
					gold: "#cc963f",
					lightGold1: "#d7ab68",
					lightGold2: "#e1c08f",
					lightGold3: "#ebd5b5",
					lightGold3_20: "#ebd5b533",
					lightGold4: "#f5eada",
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					brown: "#bc6322",
					purple1: "#600080",
					purple2: "#29176f",
					red: "#b31d42",
					teal: "#015a66",
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				other: {
					darkGreen: "#00352b",
					mintGreen: "#00d196",
					lightMint: "#53ffe1",
					cyan: "#0298AC",
				},
				dark: {
					1: "#232323",
					2: "#3b3b3b",
					3: "#5b5b5b",
					4: "#555",
				},
				button: {
					static: "#cc963f",
					hover: "#ebd5b5",
					active: "#d7ab68",
					loading: "#cc963f",
					disable: "#b8b8b8",
				},
				status: {
					green: "#3aaa35",
					red: "#ce2828",
					orange: "#faad14",
					blue: "#004de5",
					gray: "#b8b8b8",
					black: "#292929",
				},
				gray: {
					1: "#292929",
					2: "#525252",
					3: "#858585",
					4: "#b8b8b8",
					5: "#e0e0e0",
					6: "#ebebeb",
					7: "#f2f2f2",
					100: "#12131a",
				},
				white: "#ffffff",
				disable: "#d1d1d1",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				divider: "#D9D9D9",
				background1: "#FAF4EB",
				background2: "#FBFBFB",
				background3: "#FFD3991A",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
			spacing: {
				5: "5px",
				10: "10px",
				15: "15px",
				20: "20px",
				25: "25px",
				30: "30px",
				35: "35px",
				40: "40px",
				45: "45px",
				50: "50px",
				55: "55px",
				60: "60px",
				65: "65px",
				70: "70px",
				75: "75px",
				80: "80px",
				85: "85px",
				90: "90px",
				95: "95px",
				100: "100px",
			},
			gridTemplateColumns: {
				12: "repeat(12, 1fr)",
			},
			screens: {
				medium: "768px",
				large: "1024px",
				"x-large": "1440px",
			},
			margin: {
				small: "20px",
				medium: "40px",
				large: "70px",
			},
			gap: {
				column: "20px",
			},
			width: {
				desktopColumn: "90px",
				tabletColumn: "100px",
				mobileColumn: "140px",
			},
			flex: {
				28: "0 0 28%",
				66: "0 0 66%",
			},
			background: {
				"custom-linear-gradient": "linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	darkMode: ["class"],
	safelist: [
		"text-secondary-red",
		"text-primary-lightGreen1",
		"text-other-cyan",
		"text-button-static",
		// Add other classes if necessary
	],
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".bg-custom-gradient": {
					background: "linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)",
				},
			});
		},
		require("tailwindcss-animate"),
	],
};
