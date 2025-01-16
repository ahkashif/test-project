import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMilestones, updateMilestone } from "../libs/store/slices/pilotFormSlice";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "../libs/store/store";

interface MilestoneModalProps {
	isOpen: boolean;
	onClose: () => void;
	index?: number;
	defaultValues?: { name: string; date: string };
}

const MilestoneModal: React.FC<MilestoneModalProps> = ({ isOpen, onClose, index, defaultValues }) => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [date, setDate] = useState("");
	const milestones = useSelector((state: RootState) => state.newPilotForm.milestones);

	// Set default values when the modal opens
	useEffect(() => {
		setName(defaultValues?.name || "");
		setDate(defaultValues?.date || "");
	}, [defaultValues]);

	const handleModalSubmit = () => {
		if (!name || !date) {
			alert("All fields are required.");
			return;
		}

		if (index !== undefined) {
			dispatch(updateMilestone({ index, milestone: { name, date } }));
		} else {
			dispatch(setMilestones([...milestones, { name, date }]));
		}

		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px] z-[9999] bg-white shadow-lg">
				<DialogHeader>
					<DialogTitle>{index !== undefined ? "Edit Milestone" : "Add Milestone"}</DialogTitle>
					<DialogDescription>
						{index !== undefined
							? "Update the details of your milestone here."
							: "Enter the details for your new milestone below."}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label
							htmlFor="milestone-name"
							className="text-right">
							Name
						</Label>
						<Input
							id="milestone-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter milestone name"
							className="col-span-3 w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label
							htmlFor="milestone-date"
							className="text-right">
							Date
						</Label>
						<Input
							id="milestone-date"
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="col-span-3 w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={onClose}
						type="button"
						className="px-20 py-[13px] border border-secondary-brown text-secondary-brown rounded-full text-button font-regular flex gap-10 items-center">
						Cancel
					</Button>
					<Button
						onClick={handleModalSubmit}
						type="button"
						className="px-20 py-[13px] border border-secondary-brown bg-secondary-brown rounded-full text-button font-regular text-white">
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default MilestoneModal;
