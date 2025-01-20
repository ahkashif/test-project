import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

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
import { addChallenge, updateChallenge } from "../libs/store/slices/techFormSlice";

interface ChallengeModalProps {
	isOpen: boolean;
	onClose: () => void;
	index?: number;
	defaultValues?: { name: string; description: string };
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({ isOpen, onClose, index, defaultValues }) => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	// Set default values when the modal opens
	useEffect(() => {
		setName(defaultValues?.name || "");
		setDescription(defaultValues?.description || "");
	}, [defaultValues]);

	const handleModalSubmit = () => {
		if (!name || !description) {
			alert("All fields are required.");
			return;
		}

		if (index !== undefined) {
			dispatch(updateChallenge({ index, challenge: { name, description } }));
		} else {
			dispatch(addChallenge({ name, description }));
		}

		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px] z-[9999] bg-white shadow-lg">
				<DialogHeader>
					<DialogTitle>{index !== undefined ? "Edit Challenge" : "Add Challenge"}</DialogTitle>
					<DialogDescription>
						{index !== undefined
							? "Update the details of your Challenge here"
							: "Enter the details for your new Challenge below."}
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
							placeholder="Enter Challenge name"
							className="col-span-3 w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label
							htmlFor="challenge-description"
							className="text-right">
							Description
						</Label>
						<Input
							id="challenge-description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter Challenge description"
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

export default ChallengeModal;
