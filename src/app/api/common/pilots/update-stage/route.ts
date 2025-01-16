import { connect } from "@/dbConfig/dbConfig";
import Pilot from "@/models/addPilot";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(request: NextRequest) {
	try {
		// Parse the request body
		const requestBody = await request.json();
		const { id, currStage } = requestBody;

		// Validate required fields
		if (!id || !currStage) {
			return NextResponse.json({ error: "ID and currStage are required" }, { status: 400 });
		}

		// Update the currStage field for the given pilot
		const updatedPilot = await Pilot.findByIdAndUpdate(
			id,
			{ currStage },
			{ new: true, runValidators: true } // Return the updated document and ensure validation
		);

		// Check if the pilot exists
		if (!updatedPilot) {
			return NextResponse.json({ error: "Pilot not found" }, { status: 404 });
		}

		// Return the updated pilot data
		return NextResponse.json({ data: updatedPilot }, { status: 200 });
	} catch (error) {
		console.error("Error updating pilot currStage:", error);

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
	}
}
