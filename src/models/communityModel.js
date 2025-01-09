import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
	{
		communityName: {
			type: String,
			required: true,
			unique: true,
		},
		postedDate: {
			type: String,
			required: true,
		},
		communityMembers: {
			type: Number,
			required: true,
		},
		communityImage: {
			type: String,
			required: true,
		},
		discussions: {
			type: Number,
			required: true,
		},
		posts: {
			type: Number,
			required: true,
		},
		events: {
			type: Number,
			required: true,
		},
		engagementRate: {
			type: Number,
			required: true,
		},
	},
	{ collection: "communityData" }
);

const Community = mongoose.models.communityData || mongoose.model("communityData", communitySchema);

export default Community;

// const mockData = [
//   {
//     communityName: "Tech Innovators",
//     postedDate: "2025-01-01",
//     communityMembers: 1500,
//     communityImage: "https://example.com/images/tech-innovators.jpg",
//   },
//   {
//     communityName: "Green Earth Advocates",
//     postedDate: "2025-01-02",
//     communityMembers: 1200,
//     communityImage: "https://example.com/images/green-earth.jpg",
//   },
//   {
//     communityName: "Startup Gurus",
//     postedDate: "2025-01-03",
//     communityMembers: 2500,
//     communityImage: "https://example.com/images/startup-gurus.jpg",
//   },
//   {
//     communityName: "Fitness Enthusiasts",
//     postedDate: "2025-01-04",
//     communityMembers: 1800,
//     communityImage: "https://example.com/images/fitness-enthusiasts.jpg",
//   },
//   {
//     communityName: "Book Lovers Club",
//     postedDate: "2025-01-05",
//     communityMembers: 900,
//     communityImage: "https://example.com/images/book-lovers.jpg",
//   },
//   {
//     communityName: "Art Explorers",
//     postedDate: "2025-01-06",
//     communityMembers: 1100,
//     communityImage: "https://example.com/images/art-explorers.jpg",
//   },
//   {
//     communityName: "Coding Wizards",
//     postedDate: "2025-01-07",
//     communityMembers: 3000,
//     communityImage: "https://example.com/images/coding-wizards.jpg",
//   },
//   {
//     communityName: "Foodies Paradise",
//     postedDate: "2025-01-08",
//     communityMembers: 1700,
//     communityImage: "https://example.com/images/foodies-paradise.jpg",
//   },
//   {
//     communityName: "Travel Buffs",
//     postedDate: "2025-01-09",
//     communityMembers: 2000,
//     communityImage: "https://example.com/images/travel-buffs.jpg",
//   },
//   {
//     communityName: "Photography Geeks",
//     postedDate: "2025-01-10",
//     communityMembers: 1400,
//     communityImage: "https://example.com/images/photography-geeks.jpg",
//   },
// ];
