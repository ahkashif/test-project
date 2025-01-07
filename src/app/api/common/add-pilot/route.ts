import { connect } from "@/dbConfig/dbConfig";
import PilotForm from "@/models/pilotFormModel";
import { NextRequest, NextResponse } from "next/server";

interface Step1Data {
	owner: string;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	stage: string;
	objective: string;
	location: string;
	funding: string;
	budgetCurrency: string;
	estimatedBudget: number | string;
	image: string | null;
	documents: { name: string; size: number }[]; // Storing file metadata
}

interface Step2Data {
	companyPortfolio: string;
	sector: string;
	technologySolution: string;
	technologySolutionProvider: string;
	expert: string;
}

interface Step3Data {
	planningPhase: string;
	plotingPhase: string;
	assessmentPhase: string;
	scalingPhase: string;
}

export interface PilotFormDocument {
	step1: Step1Data;
	step2: Step2Data;
	step3: Step3Data;
}

connect();

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { step1, step2, step3 }: PilotFormDocument = requestBody;

		if (!step1 || !step2 || !step3) {
			return NextResponse.json({ error: "All steps data are required." }, { status: 400 });
		}

		const pilotForm = new PilotForm({
			step1,
			step2,
			step3,
		});

		console.log(pilotForm);

		await pilotForm.save();

		return NextResponse.json({ error: "Pilot form data saved successfully!" }, { status: 200 });
	} catch (error) {
		console.error("Error saving pilot data:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
