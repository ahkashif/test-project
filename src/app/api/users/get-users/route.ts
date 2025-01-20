import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET() {
	try {
		const users = await User.find({});
		return NextResponse.json({
			mesaaage: "Users found",
			data: users,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}
