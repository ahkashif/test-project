import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Public Investment Fund",
	description: "Public Investment Fund",
};

export default function CreatePilotLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
