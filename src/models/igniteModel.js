import mongoose from "mongoose";

const igniteSchema = new mongoose.Schema(
	{
		ideaName: {
			type: String,
			required: true,
			unique: true,
		},
		ideaDescription: {
			type: String,
			required: true,
		},
		submissionSource: {
			type: String,
			required: true,
		},
		associatedChallenges: {
			type: String,
			required: true,
		},
		submittedBy: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		sector: {
			type: String,
			required: true,
		},
		technologyProvider: {
			type: String,
			required: true,
		},
		technologyType: {
			type: String,
			required: true,
		},
		supportingFiles: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		submissionDate: {
			type: String,
			required: true,
		},
	},
	{ collection: "igniteData" }
);

const Ignite = mongoose.models.igniteData || mongoose.model("igniteData", igniteSchema);

export default Ignite;
