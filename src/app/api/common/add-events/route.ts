import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/eventsModel";
import { NextResponse } from "next/server";

connect();

export async function POST(): Promise<NextResponse> {
	try {
		const mockData = [
			{
				eventData: "March 14 - 16, 2023",
				eventName: "PIF Flagship Innovation Expo 1",
				eventTagLine: "Joint Aspiration For A Thriving Economy",
				eventDescription: "The PIF Flagship Innovation Expo aims to connect portfolio companies.",
				eventAudience: 341,
			},
			{
				eventData: "March 17 - 19, 2023",
				eventName: "Design Thinking Conference 1",
				eventTagLine: "Empowering Creativity and Innovation",
				eventDescription: "The Design Thinking Conference focuses on fostering a culture of innovation.",
				eventAudience: 232,
			},
			{
				eventData: "April 10 - 12, 2023",
				eventName: "AI for Business Summit 1",
				eventTagLine: "Unlocking AI Potential",
				eventDescription: "The summit explores AI’s transformative role in business.",
				eventAudience: 550,
			},
			{
				eventData: "May 1 - 3, 2023",
				eventName: "Future of Mobility 1",
				eventTagLine: "Driving Tomorrow's Innovation",
				eventDescription: "The event discusses trends and technologies shaping the future of mobility.",
				eventAudience: 400,
			},
			{
				eventData: "June 20 - 22, 2023",
				eventName: "Sustainable Energy Forum 1",
				eventTagLine: "Towards a Greener Future",
				eventDescription: "A forum dedicated to sustainable energy solutions.",
				eventAudience: 600,
			},
		];

		const insertedData = await Event.insertMany(mockData);
		return NextResponse.json({ message: "Mock data added successfully", data: insertedData });
	} catch (error) {
		console.error("Error adding mock data:", error);
		return NextResponse.json({ error: "Error adding mock data" }, { status: 500 });
	}
}
