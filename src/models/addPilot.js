import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

const submittedUserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	profilePhoto: {
		type: String,
		required: true,
	},
});

const pilotSchema = new mongoose.Schema(
	{
		pilotName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		objective: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		pilotBudgetCurrency: {
			type: String,
			required: true,
		},
		pilotEstimatedBudget: {
			type: Number,
			required: true,
		},
		fundedBy: {
			type: String,
			required: true,
			enum: ["Tech Investment Fund", "Development Company", "Others"], // Predefined options
		},
		technologySolution: {
			type: String,
			required: true,
		},
		associatedSector: {
			type: [String],
			required: false,
			default: [], // Array of sectors, e.g., Mobility, Infrastructure, etc.
		},
		technologyProvider: {
			type: String,
			required: false,
		},
		devCoLeadingPilot: {
			type: String,
			required: true,
		},
		pilotLead: {
			type: String,
			required: true,
		},
		pilotTeam: {
			type: String,
			required: true,
		},
		attachments: {
			type: [String], // Array of S3 URLs
			default: [],
		},
		milestones: {
			type: [milestoneSchema],
			default: [],
		},
		submittedBy: {
			type: submittedUserSchema,
			required: true,
		},
		currStage: {
			type: String,
			required: true,
		},
		createdDate: {
			type: String,
			required: true,
		},
	},
	{ collection: "pilotsData", timestamps: true } // Adds createdAt and updatedAt
);

const Pilot = mongoose.models.pilotsData || mongoose.model("pilotsData", pilotSchema);

export default Pilot;
