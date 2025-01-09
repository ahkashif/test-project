import mongoose from "mongoose";

const expertSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		badge: {
			type: String,
		},
		title: {
			type: String,
			required: true,
		},
		company: {
			type: String,
			required: true,
		},
		yearsOfExperience: {
			type: String,
			required: true,
		},
		sector: {
			type: String,
		},
		profileImage: {
			type: String,
			required: true,
		},
	},
	{ collection: "expertData" } // Specify the collection name
);

const Expert = mongoose.models.expertData || mongoose.model("expertData", expertSchema);

export default Expert;
