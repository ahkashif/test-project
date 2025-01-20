import { connect } from "@/dbConfig/dbConfig";
import TechForm from "@/models/techForm";
import { NextRequest, NextResponse } from "next/server";

connect();

export interface TechFormRequest {
	techName: string;
	techDescription: string;
	techProvider: string;
	owner: string;
	selectedOptions: string[];
	sectorOptions: string[];
	techSrcOptions: string[];
	addedValue: string[];
	devCo: string;
	businessChallenge: string;
	challenges: { name: string; description: string }[];
	attachments: string[];
	technologyId: string;
	currentStage: string;
}

export async function POST(request: NextRequest) {
	try {
		const requestBody: TechFormRequest = await request.json();

		console.log(requestBody);

		const {
			techName,
			techDescription,
			techProvider,
			owner,
			selectedOptions,
			sectorOptions,
			techSrcOptions,
			addedValue,
			devCo,
			businessChallenge,
			challenges,
			attachments,
			technologyId,
			currentStage,
		} = requestBody;

		if (!techName || !techDescription || !techProvider || !owner || !devCo || !businessChallenge) {
			return NextResponse.json({ error: "All required fields must be provided." }, { status: 400 });
		}

		const newTechForm = new TechForm({
			techName,
			techDescription,
			techProvider,
			owner,
			selectedOptions,
			sectorOptions,
			techSrcOptions,
			addedValue,
			devCo,
			businessChallenge,
			challenges,
			attachments,
			technologyId,
			currentStage,
		});

		await newTechForm.save();

		return NextResponse.json({ message: "Tech form data saved successfully!" }, { status: 200 });
	} catch (error) {
		console.error("Error saving tech form data:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
