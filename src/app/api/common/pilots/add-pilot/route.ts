import { connect } from "@/dbConfig/dbConfig";
import Pilot from "@/models/addPilot";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

// Helper function to format dates
const formatDate = (date: Date): string => {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	return `${day} ${month} ${year}`;
};

// Define the type for incoming request data
export interface PilotRequest {
	pilotName: string;
	description: string;
	objective: string;
	location: string;
	pilotBudgetCurrency: string;
	pilotEstimatedBudget: number;
	fundedBy: string;
	technologySolution: string;
	associatedSector: string[];
	technologyProvider?: string;
	devCoLeadingPilot: string;
	pilotLead: string;
	pilotTeam: string;
	attachments?: ""; // Optional field for image URLs
	milestones?: { name: string; date: string }[]; // Optional milestones
	createdDate: string; // Optional date
	currStage?: string;
	submittedBy: { name: string; email: string; profilePhoto: string };
}

export async function POST(request: NextRequest) {
	try {
		// Parse the request body
		const requestBody: PilotRequest = await request.json();

		// Destructure fields from the request body
		const {
			pilotName,
			description,
			objective,
			location,
			pilotBudgetCurrency,
			pilotEstimatedBudget,
			fundedBy,
			technologySolution,
			devCoLeadingPilot,
			pilotLead,
			pilotTeam,
			attachments = "",
			milestones = [],
			createdDate = formatDate(new Date()),
			submittedBy,
		} = requestBody;

		// Validate required fields
		if (
			!pilotName ||
			!description ||
			!objective ||
			!location ||
			!pilotBudgetCurrency ||
			!pilotEstimatedBudget ||
			!fundedBy ||
			!technologySolution ||
			!devCoLeadingPilot ||
			!pilotLead ||
			!pilotTeam
		) {
			return NextResponse.json({ error: "All required fields must be provided." }, { status: 400 });
		}

		console.log(createdDate);

		// Create a new Pilot document
		const newPilot = new Pilot({
			pilotName,
			description,
			objective,
			location,
			pilotBudgetCurrency,
			pilotEstimatedBudget,
			fundedBy,
			technologySolution,
			devCoLeadingPilot,
			pilotLead,
			pilotTeam,
			attachments, // S3 URLs
			milestones, // Milestone details
			currStage: "Planning",
			createdDate,
			submittedBy,
		});

		// Save the Pilot document to the database
		await newPilot.save();

		// Return success response
		return NextResponse.json({ message: "Pilot form data saved successfully!" }, { status: 200 });
	} catch (error) {
		console.error("Error saving Pilot form data:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
