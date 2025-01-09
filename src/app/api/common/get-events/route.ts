import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/eventsModel";
import { NextResponse } from "next/server";

connect();

export async function GET(): Promise<NextResponse> {
	try {
		const events = await Event.find({});
		return NextResponse.json({ data: events }, { status: 200 });
	} catch (error) {
		console.error("Error fetching events:", error);
		return NextResponse.json({ error: "Error fetching events" }, { status: 500 });
	}
}
