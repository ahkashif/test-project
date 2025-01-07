export interface CompanySlide {
	imgUrl: string;
	companyLogo: string;
	companyName: string;
	category: string;
}

export interface ProfileSlide {
	name: string;
	designation: string;
	avatarUrl: string;
	hasBadge: boolean;
}

export interface EventSlide {
	eventData: string;
	eventName: string;
	eventTagLine: string;
	eventDescription: string;
	eventAudience: number;
}

export interface InnovationSlide {
	icon: string;
	title: string;
	description: string;
}

export interface CarouselsData {
	COMPANY_SLIDES_DATA: CompanySlide[];
	PROFILE_SLIDES_DATA: ProfileSlide[];
	EVENTS_SLIDES_DATA: EventSlide[];
	INNOVATION_SLIDES_DATA: InnovationSlide[];
}

export const CAROUSELS_DATA: CarouselsData = {
	COMPANY_SLIDES_DATA: [
		{
			imgUrl: "/jill.jpeg",
			companyLogo: "/jill-logo.svg",
			companyName: "JILL",
			category: "Commercial Real Estate",
		},
		{
			imgUrl: "/aecom.jpeg",
			companyLogo: "/aecom-logo.svg",
			companyName: "AECOM",
			category: "Infrastructure & Engineering",
		},
		{
			imgUrl: "/mace.jpeg",
			companyLogo: "/mace-logo.svg",
			companyName: "MACE",
			category: "Construction",
		},
		{
			imgUrl: "/wsp.jpeg",
			companyLogo: "/aecom-logo.svg",
			companyName: "WSP",
			category: "Commercial Real Estate",
		},
		{
			imgUrl: "/jill.jpeg",
			companyLogo: "/jill-logo.svg",
			companyName: "WSP",
			category: "Infrastructure & Engineering",
		},
	],
	PROFILE_SLIDES_DATA: [
		{
			name: "Theodore Jovanni",
			designation: "Senior Urban Planner at Dan Company",
			avatarUrl: "/avatar-1.jpeg",
			hasBadge: true,
		},
		{
			name: "Saf Al-Hayani",
			designation: "Smart City Integration Specialist",
			avatarUrl: "/avatar-2.png",
			hasBadge: false,
		},
		{
			name: "Ibrahim Hassan Al-Asiri",
			designation: "Community Engagement Officer",
			avatarUrl: "/avatar-3.png",
			hasBadge: true,
		},
		{
			name: "Wyatt Murphy",
			designation: "Marketing and Sales Director",
			avatarUrl: "/avatar-4.png",
			hasBadge: true,
		},
		{
			name: "Theodore Jovanni",
			designation: "Senior Urban Planner at Dan Company",
			avatarUrl: "/avatar-1.jpeg",
			hasBadge: true,
		},
		{
			name: "Saf Al-Hayani",
			designation: "Smart City Integration Specialist",
			avatarUrl: "/avatar-2.png",
			hasBadge: true,
		},
	],
	EVENTS_SLIDES_DATA: [
		{
			eventData: "March 14 - 16, 2023",
			eventName: "PIF Flagship Innovation Expo",
			eventTagLine: "Joint Aspiration For A Thriving Economy",
			eventDescription: "The PIF Flagship Innovation Expo aims to connect portfolio companies.",
			eventAudience: 341,
		},
		{
			eventData: "March 17 - 19, 2023",
			eventName: "Design Thinking Conference",
			eventTagLine: "Empowering Creativity and Innovation",
			eventDescription: "The Design Thinking Conference focuses on fostering a culture of innovation.",
			eventAudience: 232,
		},
		{
			eventData: "March 14 - 16, 2023",
			eventName: "PIF Flagship Innovation Expo",
			eventTagLine: "Joint Aspiration For A Thriving Economy",
			eventDescription: "The PIF Flagship Innovation Expo aims to connect portfolio companies.",
			eventAudience: 341,
		},
		{
			eventData: "March 17 - 19, 2023",
			eventName: "Design Thinking Conference",
			eventTagLine: "Empowering Creativity and Innovation",
			eventDescription: "The Design Thinking Conference focuses on fostering a culture of innovation.",
			eventAudience: 232,
		},
		{
			eventData: "March 14 - 16, 2023",
			eventName: "PIF Flagship Innovation Expo",
			eventTagLine: "Joint Aspiration For A Thriving Economy",
			eventDescription: "The PIF Flagship Innovation Expo aims to connect portfolio companies.",
			eventAudience: 341,
		},
		{
			eventData: "March 17 - 19, 2023",
			eventName: "Design Thinking Conference",
			eventTagLine: "Empowering Creativity and Innovation",
			eventDescription: "The Design Thinking Conference focuses on fostering a culture of innovation.",
			eventAudience: 232,
		},
	],
	INNOVATION_SLIDES_DATA: [
		{
			icon: "mobility",
			title: "Mobility",
			description: "Driving sustainable transport through EVs, autonomous vehicles, and urban transit innovations.",
		},
		{
			icon: "construction",
			title: "Construction",
			description: "Building efficiently with eco-friendly and cutting-edge methods for modern developments.",
		},
		{
			icon: "infra",
			title: "Infrastructure & Utilities",
			description: "Optimizing energy, water, and resource management with smart systems in real estate.",
		},
		{
			icon: "smart-city",
			title: "Smart City & Proptech",
			description: "Advancing green energy and practices to foster sustainable communities for real estate.",
		},
		{
			icon: "infra",
			title: "Environment & Sustainablity",
			description: "Enhancing urban living and real estate operations with transformative technologies.",
		},
	],
};
