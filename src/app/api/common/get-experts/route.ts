import { connect } from "@/dbConfig/dbConfig";
import Expert from "@/models/expertModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
	try {
		const experts = await Expert.find({});
		return NextResponse.json({ message: "Experts fetched successfully", data: experts });
	} catch (error) {
		console.error("Error fetching experts:", error);
		return NextResponse.json({ error: "Error fetching experts" }, { status: 500 });
	}
}
