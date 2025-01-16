import { connect } from "@/dbConfig/dbConfig";
import Pilot from "@/models/addPilot";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(request: NextRequest) {
	try {
		// Parse the request body
		const requestBody = await request.json();
		const { id, ...updateData } = requestBody;

		// Validate the ID
		if (!id) {
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		// Validate if there is data to update
		if (!Object.keys(updateData).length) {
			return NextResponse.json({ error: "No data provided to update" }, { status: 400 });
		}

		// Find the pilot by ID and update the record
		const updatedPilot = await Pilot.findByIdAndUpdate(id, updateData, {
			new: true, // Return the updated document
			runValidators: true, // Ensure schema validation
		});

		// Check if the pilot exists
		if (!updatedPilot) {
			return NextResponse.json({ error: "Pilot not found" }, { status: 404 });
		}

		// Return the updated pilot data
		return NextResponse.json({ data: updatedPilot }, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
	}
}
