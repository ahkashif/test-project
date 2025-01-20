import { connect } from "@/dbConfig/dbConfig";
import TechForm from "@/models/techForm";
import { NextResponse } from "next/server";

connect();

export async function GET() {
	try {
		const tech = await TechForm.find({});

		return NextResponse.json({ data: tech }, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	}
}
