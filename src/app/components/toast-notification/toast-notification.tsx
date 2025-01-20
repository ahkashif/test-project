import React from "react";
import { toast } from "react-hot-toast";
import Icon from "../icon/icons";

interface ToastNotificationProps {
	pilot: any;
	onApprove: (pilot: any) => void;
	message: string;
	title: string;
	onClose?: () => void;
	borderColor?: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
	pilot,
	onApprove,
	message,
	title,
	onClose,
	borderColor = "border-status-green",
}) => {
	return (
		<div
			className="max-w-[330px] w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 cursor-pointer"
			onClick={() => {
				onApprove(pilot);
			}}>
			<div className={`flex-1 min-w-[320px] p-30 border-b-[5px] ${borderColor}`}>
				<div className="flex items-start flex-col gap-10">
					<div className="flex-shrink-0 pt-0.5 flex flex-row gap-10 w-full">
						<Icon name="check-green" />
						<span className="text-subtitle2 text-status-green font-semibold">{title}</span>
						<button
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								toast.dismiss();
								if (onClose) onClose();
							}}
							className="w-fit border border-transparent rounded-none flex items-center justify-center text-body2 font-medium ml-auto">
							<Icon
								name="close"
								size={22}
							/>
						</button>
					</div>
					<div className="ml-3 flex-1 relative">
						<p className="mt-1 text-body2 text-gray-1">{message}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ToastNotification;
