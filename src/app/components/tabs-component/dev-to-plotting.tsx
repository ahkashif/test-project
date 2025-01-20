import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { PilotTypes } from "./tabs-componet";

interface FormTypes {
	action: string;
	comments: string;
	confidentiality: boolean;
}

function DevToPlotting({ planningPilot, closeForm }: { planningPilot: PilotTypes; closeForm: () => void }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormTypes>();

	const onSubmit = async (data: FormTypes) => {
		console.log(data);
		try {
			if (data.action === "approve") {
				const response = await axios.put("/api/common/pilots/update-stage", {
					id: planningPilot._id,
					currStage: "Plotting",
				});

				if (response.status === 200) {
					closeForm();
					window.location.reload();
				}

				console.log("Pilot updated successfully:", response.data);
			}
		} catch (error) {
			console.error("Error updating currStage:", error);
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col h-screen ">
				<div className="p-20 border-b border-divider">
					<h4 className="text-title2 font-semibold">{planningPilot.pilotName}</h4>
				</div>
				<div className="flex-1 overflow-y-auto flex flex-col gap-20 p-20">
					<div className="">
						<div className="flex flex-col gap-4">
							<label className="block text-subtitle2 font-semibold">Review commitment request</label>
							<label className="flex items-center gap-2">
								<input
									{...register("action", { required: true })}
									type="radio"
									value="back"
									className="hidden peer"
								/>
								<div className="w-[16px] h-[16px]  border-2 border-gray-400 rounded-full peer-checked:border-primary-lightGreen1 peer-checked:border-[5px]"></div>
								<span className="text-body2 font-light peer-checked:font-semibold">Send Back</span>
							</label>

							<label className="flex items-center gap-2">
								<input
									{...register("action", { required: true })}
									type="radio"
									value="reject"
									className="hidden peer"
								/>
								<div className="w-[16px] h-[16px]  border-2 border-gray-400 rounded-full peer-checked:border-primary-lightGreen1 peer-checked:border-[5px]"></div>
								<span className="text-body2 font-light peer-checked:font-semibold">Reject</span>
							</label>

							<label className="flex items-center gap-2">
								<input
									{...register("action", { required: true })}
									type="radio"
									value="confirm"
									className="hidden peer"
								/>
								<div className="w-[16px] h-[16px]  border-2 border-gray-400 rounded-full peer-checked:border-primary-lightGreen1 peer-checked:border-[5px]"></div>
								<span className="text-body2 font-light peer-checked:font-semibold">Confirm</span>
							</label>
						</div>
					</div>

					{errors.action && <p className="text-red-600">{errors.action.message}</p>}

					<div className="flex flex-col gap-10">
						<label className="block text-subtitle2 font-semibold">Share comments</label>
						<textarea
							{...register("comments", { required: "comments are required" })}
							className="w-full border border-divider rounded-[10px] p-[15px]"></textarea>
						{errors.comments && <p className="text-red-600">{errors.comments.message}</p>}
					</div>

					{/* <label>
						<input
							type="checkbox"
							placeholder=""
							{...register("confidentiality", { required: true })}
						/>
						<span className="pl-10">
							I agree the confidentiality <a className="text-blue-400 underline ">Terms & conditions</a>
						</span>
						{errors.confidentiality && <p className="text-red-600">{errors.confidentiality.message}</p>}
					</label> */}

					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							placeholder=""
							{...register("confidentiality", { required: "You must agree to the terms" })}
							className="hidden peer"
						/>
						<div className="w-[20px] h-[20px] border border-status-blue rounded bg-white flex items-center justify-center peer-checked:bg-status-blue peer-checked:border-status-blue">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-[15px] w-[15px] text-white"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<span className="text-gray-800">
							I agree to the confidentiality
							<a
								href="#"
								className="text-blue-400 underline">
								Terms & Conditions
							</a>
						</span>
						{errors.confidentiality && (
							<p className="text-red-600 text-body3 block">{errors.confidentiality.message}</p>
						)}
					</label>
				</div>
				<div className="flex flex-row gap-10 p-20 border-t border-divider">
					<button
						className={`min-w-[140px] px-20 py-[13px] border border-primary-lightGreen1 text-primary-lightGreen1 bg-white rounded-full text-button font-regular`}>
						Cancel
					</button>
					<button
						type="submit"
						className={`w-full max-w-full px-20 py-[13px] border border-primary-lightGreen1 bg-primary-lightGreen1 text-white rounded-full text-button font-regular`}>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default DevToPlotting;
