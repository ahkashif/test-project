import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const techFormSchema = new mongoose.Schema(
	{
		techName: {
			type: String,
			required: true,
		},
		techDescription: {
			type: String,
			required: true,
		},
		techProvider: {
			type: String,
			required: true,
		},
		owner: {
			type: String,
			required: true,
		},
		selectedOptions: {
			type: [String],
			default: [],
		},
		sectorOptions: {
			type: [String],
			default: [],
		},
		techSrcOptions: {
			type: [String],
			default: [],
		},
		addedValue: {
			type: [String],
			default: [],
		},
		devCo: {
			type: String,
			required: true,
		},
		businessChallenge: {
			type: String,
			required: true,
		},
		challenges: {
			type: [challengeSchema],
			default: [],
		},
		attachments: {
			type: String, // Array of S3 URLs
			required: true,
		},
		currentStage: {
			type: String,
			required: true,
		},
		technologyId: {
			type: String,
			required: true,
		},
	},
	{ collection: "technologyData", timestamps: true } // Adds createdAt and updatedAt
);

const TechForm = mongoose.models.technologyData || mongoose.model("technologyData", techFormSchema);

export default TechForm;
