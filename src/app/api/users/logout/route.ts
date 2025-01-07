import { connect } from "@/dbConfig/dbConfig";

import { NextResponse } from "next/server";

connect();

export async function GET() {
	try {
		const response = NextResponse.json({
			message: "Logout Successfully",
			success: true,
		});
		response.cookies.set("token", "", {
			httpOnly: false,
			expires: new Date(0),
		});

		return response;
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	}
}
