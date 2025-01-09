import { connect } from "@/dbConfig/dbConfig";
import Ignite from "@/models/igniteModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
	try {
		const ignites = await Ignite.find({});

		return NextResponse.json({ data: ignites }, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	}
}
