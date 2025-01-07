import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please provide a username"],
			unique: false,
		},
		email: {
			type: String,
			required: [true, "Please provide a email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			unique: false,
		},
		profilePhoto: {
			type: String,
			required: [true, "Please provide a profile photo"],
			unique: false,
		},
		designation: {
			type: String,
			required: [true, "Please provide a designation"],
			unique: false,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		forgotPasswordToken: String,
		forgotPasswordTokenExpiry: Date,
		verifyToken: String,
		verifyTokenExpiry: Date,
	},
	{ collection: "usersData" }
);

const User = mongoose.models.usersData || mongoose.model("usersData", userSchema);

export default User;
