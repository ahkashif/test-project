export const renderDate = (dateString: string): string => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
};

export const renderFullDate = (dateString: string): string => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(date);
};

export function getRelativeTime(dateString: string): string {
	const inputDate: any = new Date(dateString);
	const currentDate: any = new Date();
	const diffInMs: any = currentDate - inputDate; // Difference in milliseconds
	const diffInSeconds = Math.floor(diffInMs / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);

	if (diffInDays >= 7) {
		const weeks = Math.floor(diffInDays / 7);
		return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
	} else if (diffInDays >= 1) {
		return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
	} else if (diffInHours >= 1) {
		return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
	} else if (diffInMinutes >= 1) {
		return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
	} else {
		return `just now`;
	}
}
