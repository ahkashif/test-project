import Image from "next/image";
import React from "react";

interface IconProps {
	name: string; // Name of the icon (e.g., "search", "bell", "sun")
	size?: number; // Customizable size
	color?: string; // Customizable color for inline SVG (optional)
	classes?: string; // Optional className for additional styling
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color, classes }) => {
	const iconPath = `/icons/icon-${name}.svg`;

	return (
		<Image
			src={iconPath}
			alt={`${name} icon`}
			title={`${name} icon`}
			width={size}
			height={size}
			style={{ fill: color, width: size, height: size }}
			className={`icon ${classes}`}
			loading="lazy"
		/>
	);
};

export default Icon;
