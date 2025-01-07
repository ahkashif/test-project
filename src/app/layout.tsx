import { ThemeProvider } from "./components/theme-toggle/theme-provider";
import "./globals.css";
import StoreProvider from "./storeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Public Investment Fund",
	description: "Public Investment Fund",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			dir="ltr"
			suppressHydrationWarning>
			<body className={"relative"}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<StoreProvider>{children}</StoreProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
