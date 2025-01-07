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
