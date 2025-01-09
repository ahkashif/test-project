import Community from "@/models/communityModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET() {
	try {
		const communities = await Community.find({});

		return NextResponse.json({ data: communities }, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	}
}
