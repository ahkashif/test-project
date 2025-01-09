import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
	{
		eventData: {
			type: String,
			required: true,
		},
		eventName: {
			type: String,
			required: true,
			unique: true,
		},
		eventTagLine: {
			type: String,
			required: true,
		},
		eventDescription: {
			type: String,
			required: true,
		},
		eventAudience: {
			type: Number,
			required: true,
		},
	},
	{ collection: "eventsData" }
);

const Event = mongoose.models.eventsData || mongoose.model("eventsData", eventSchema);

export default Event;
