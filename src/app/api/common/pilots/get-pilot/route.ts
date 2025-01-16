import { connect } from "@/dbConfig/dbConfig";
import Pilot from "@/models/addPilot";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		const pilot = await Pilot.findOne({ _id: id });

		if (!pilot) {
			return NextResponse.json({ error: "Pilot not found" }, { status: 404 });
		}

		return NextResponse.json({ data: pilot }, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
	}
}
