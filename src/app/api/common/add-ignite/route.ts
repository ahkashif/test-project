import { connect } from "@/dbConfig/dbConfig";
import Ignite from "@/models/igniteModel";
import { NextRequest, NextResponse } from "next/server";

export interface IgniteTypes {
	ideaName: string;
	ideaDescription: string;
	submissionSource: string;
	associatedChallenges: string;
	submittedBy: string;
	category: string;
	sector: string;
	technologyProvider: string;
	technologyType: string;
	supportingFiles: string;
	status: string;
	submissionDate: string;
}

connect();

const formatDate = (date: Date): string => {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
};

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		console.log(requestBody);
		const {
			ideaName,
			ideaDescription,
			submissionSource,
			associatedChallenges,
			submittedBy,
			category,
			sector,
			technologyProvider,
			technologyType,
			supportingFiles,
			status,
			submissionDate = formatDate(new Date()),
		}: IgniteTypes = requestBody;

		if (
			!ideaName ||
			!ideaDescription ||
			!submissionSource ||
			!associatedChallenges ||
			!submittedBy ||
			!category ||
			!sector ||
			!technologyProvider ||
			!technologyType ||
			!supportingFiles ||
			!status ||
			!submissionDate
		) {
			return NextResponse.json({ error: "All steps data are required." }, { status: 400 });
		}

		const igniteForm = new Ignite({
			ideaName,
			ideaDescription,
			submissionSource,
			associatedChallenges,
			submittedBy,
			category,
			sector,
			technologyProvider,
			technologyType,
			supportingFiles,
			status,
			submissionDate,
		});

		await igniteForm.save();

		return NextResponse.json({ error: "Ignite form data saved successfully!" }, { status: 200 });
	} catch (error) {
		console.error("Error saving ignite Form data:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
