import React, { useEffect } from "react";

interface DialogCompProps {
	direction: "left" | "right";
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const DialogComp: React.FC<DialogCompProps> = ({ direction, isOpen, onClose, children }) => {
	// Disable scrolling on the background when the drawer is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<>
			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={onClose} // Close drawer on overlay click
				/>
			)}

			{/* Drawer */}
			<div
				className={`fixed top-0 ${direction === "right" ? "right-0" : "left-0"} 
                    h-full w-[40%] bg-white shadow-lg transform transition-transform duration-300 
                    z-50 ${
											isOpen ? "translate-x-0" : direction === "right" ? "translate-x-full" : "-translate-x-full"
										}`}>
				{/* Close Button */}
				{/* <button
					className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
					onClick={onClose}>
					&#x2715;
				</button> */}

				{/* Drawer Content */}
				<div className="overflow-y-auto">{children}</div>
			</div>
		</>
	);
};

export default DialogComp;
