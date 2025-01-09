import { connect } from "@/dbConfig/dbConfig";
import Community from "@/models/communityModel";
import { NextRequest, NextResponse } from "next/server";

export interface CommunityTypes {
	communityName: string;
	postedDate: string;
	communityMembers: number;
	communityImage: string;
	discussions: number;
	posts: number;
	events: number;
	engagementRate: number;
}

connect();

// export async function POST(request: NextRequest) {
// 	try {
// 		const requestBody = await request.json();
// 		console.log(requestBody);
// 		const { communityName, postedDate, communityMembers, communityImage }: CommunityTypes = requestBody;

// 		if (!communityName || !postedDate || !communityMembers || !communityImage) {
// 			return NextResponse.json({ error: "All data is required" }, { status: 400 });
// 		}

// 		const communityData = new Community({
// 			communityName,
// 			postedDate,
// 			communityMembers,
// 			communityImage,
// 		});

// 		await communityData.save();

// 		return NextResponse.json({ error: "Ignite form data saved successfully!" }, { status: 200 });
// 	} catch (error) {
// 		console.error("Error saving ignite Form data:", error);
// 		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
// 	}
// }

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		console.log(requestBody);

		// Check if the requestBody is an array
		if (Array.isArray(requestBody)) {
			// Validate and insert multiple records
			const validData = requestBody.filter(
				(data: CommunityTypes) =>
					data.communityName &&
					data.postedDate &&
					data.communityMembers &&
					data.discussions &&
					data.posts &&
					data.events &&
					data.engagementRate
			);

			if (validData.length === 0) {
				return NextResponse.json({ error: "No valid data to insert" }, { status: 400 });
			}

			const insertedRecords = await Community.insertMany(validData);

			return NextResponse.json(
				{
					message: `${insertedRecords.length} community records saved successfully!`,
					data: insertedRecords,
				},
				{ status: 200 }
			);
		} else {
			// Handle a single record
			const {
				communityName,
				postedDate,
				communityMembers,
				communityImage,
				discussions,
				posts,
				events,
				engagementRate,
			}: CommunityTypes = requestBody;

			if (!communityName || !postedDate || !communityMembers || !communityImage) {
				return NextResponse.json({ error: "All data is required" }, { status: 400 });
			}

			const communityData = new Community({
				communityName,
				postedDate,
				communityMembers,
				communityImage,
				discussions,
				posts,
				events,
				engagementRate,
			});

			await communityData.save();

			return NextResponse.json({ message: "Community data saved successfully!", data: communityData }, { status: 200 });
		}
	} catch (error) {
		console.error("Error saving community data:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
