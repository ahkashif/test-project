import React from "react";
import Icon from "../icon/icons";

interface ButtonProps {
	variant?: "primary" | "secondary";
	disabled?: boolean;
	loading?: boolean;
	arrow?: "left" | "right" | null;
	children: React.ReactNode;
	classes?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset" | undefined;
}

const CustomButton: React.FC<ButtonProps> = ({
	variant = "primary",
	disabled = false,
	loading = false,
	arrow = null,
	children,
	classes,
	onClick,
	type,
}) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className={`text-button
        inline-flex max-h-[40px] px-5 py-3 justify-center items-center gap-2 rounded-full transition-all duration-300 ease-in-out
        ${
					variant === "primary"
						? `
              bg-primary-lightGreen1 text-white
              hover:bg-primary-lightGreen4 hover:text-foreground
              active:bg-primary-green active:text-white
            `
						: `
              bg-white text-foreground border border-primary-lightGreen1 
              hover:bg-primary-lightGreen4 hover:text-black hover:border-primary-lightGreen4
              active:bg-primary-green active:text-white active:border-primary-green
            `
				}
        ${disabled ? "cursor-not-allowed pointer-events-none opacity-50" : ""}
        ${loading ? "pointer-events-none py-[13px] px-[50px]" : ""}
        ${classes}
      `}
			onClick={!loading && !disabled ? onClick : undefined}>
			{loading ? (
				<span className="w-6 h-6 border-2 border-primary-green border-t-primary-lightGold4 rounded-full animate-spin "></span>
			) : (
				<>
					<div className="w-[24] h-[24]">{arrow === "left" && <Icon name="arrow-left" />}</div>
					{children}
					<div className="w-[24] h-[24]">{arrow === "right" && <Icon name="arrow-right" />}</div>
				</>
			)}
		</button>
	);
};

export default CustomButton;
