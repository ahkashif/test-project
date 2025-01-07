import React, { JSX } from "react";

interface TextTypes {
	value: string;
	tagName: keyof JSX.IntrinsicElements;
	typography?: string; // Accepts Tailwind classes for typography
	classes?: string;
}

const Text: React.FC<TextTypes> = ({ value, tagName, typography, classes }) => {
	const Tag = tagName || "span";

	return <Tag className={`${typography || ""} ${classes || ""} dark:text-white`}>{value}</Tag>;
};

export default Text;
