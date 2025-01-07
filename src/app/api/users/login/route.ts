import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/helpers/mailers";

connect();

interface requestTypes {
	username: string;
	email: string;
	password: string;
}

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { email, password }: requestTypes = requestBody;

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json({ error: "User does not Exist" }, { status: 400 });
		}

		console.log("User Exist");

		const validPassword = await bcryptjs.compare(password, user.password);

		if (!validPassword) {
			return NextResponse.json({ error: "Check your Creds" }, { status: 500 });
		}

		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};

		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

		const response = NextResponse.json({
			message: "Logged In Success",
			userDetails: {
				email: user.email,
				userName: user.username,
				profilePhoto: user.profilePhoto,
				designation: user.designation,
			},
			success: true,
		});

		response.cookies.set("token", token, {
			httpOnly: false,
		});

		return response;
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	}
}
