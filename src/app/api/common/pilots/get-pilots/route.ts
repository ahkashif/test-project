import { connect } from "@/dbConfig/dbConfig";
import Pilot from "@/models/addPilot";
import { NextResponse } from "next/server";

connect();

export async function GET() {
	try {
		const pilots = await Pilot.find({});

		return NextResponse.json({ data: pilots }, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	}
}
