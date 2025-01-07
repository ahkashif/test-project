import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailers";

connect();

interface requestTypes {
	username: string;
	email: string;
	password: string;
	profilePhoto: string;
	designation: string;
}

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const { username, email, password, profilePhoto, designation }: requestTypes = requestBody;
		console.log("requestBody", requestBody);

		const user = await User.findOne({ email });
		if (user) {
			return NextResponse.json({ error: "User Already Exist" }, { status: 400 });
		}

		const salt = await bcryptjs.genSalt(10);
		const hashPass = await bcryptjs.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashPass,
			profilePhoto,
			designation,
		});

		const savedUser = await newUser.save();

		console.log(newUser);

		//send Verification
		// await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

		return NextResponse.json({
			message: "User Registred Successfully",
			success: true,
			savedUser,
		});
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	}
}
