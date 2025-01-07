import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React, { Ref } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../libs/store/store";
import { updateFormData, Step3Data } from "../libs/store/slices/createPilotSlice";

interface FormData {
	planningPhase: string;
	plotingPhase: string;
	assessmentPhase: string;
	scalingPhase: string;
}

function Step3({ step3Ref }: { step3Ref: Ref<HTMLButtonElement> }) {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
	} = useForm<FormData>();

	const formData = useSelector((state: RootState) => state.pilotForm.forms[state.pilotForm.forms.length - 1]) || {};

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		if (Object.keys(errors).length === 0 && Object.keys(touchedFields).length > 0) {
			dispatch(updateFormData({ step: "step3", data: { ...(data as Partial<Step3Data>) } }));

			console.log(data, formData.step1);

			// try {
			// 	const response = await axios.post("/api/common/add-pilot", {
			// 		step1: { ...formData.step1 },
			// 		step2: { ...formData.step2 },
			// 		step3: data,
			// 	});
			// 	if (response.status === 200) {
			// 		console.log("Pilot Added", response);
			// 		router.push("/dashboard/tech-and-pilots");
			// 	}
			// } catch (error) {
			// 	console.log(error);
			// }
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4">
				<Accordion
					type="single"
					collapsible>
					<AccordionItem
						value="planningPhase"
						className="p-20 border border-divider rounded-[10px] text-body1 font-light">
						<AccordionTrigger className="">Planning phase</AccordionTrigger>
						<AccordionContent>
							<input
								{...register("planningPhase", { required: "Planning phase is required" })}
								className="w-full border border-divider rounded-[10px] p-[15px] mt-10"
							/>
							{errors.planningPhase && (
								<p className="text-red-500 text-body1 font-light mt-10">{errors.planningPhase.message}</p>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<Accordion
					type="single"
					collapsible>
					<AccordionItem
						value="plotingPhase"
						className="p-20 border border-divider rounded-[10px] text-body1 font-light">
						<AccordionTrigger className="">Piloting phase</AccordionTrigger>
						<AccordionContent>
							<input
								{...register("plotingPhase", { required: "Ploting Phase is required" })}
								className="w-full border border-divider rounded-[10px] p-[15px] mt-10"
							/>
							{errors.plotingPhase && (
								<p className="text-red-500 text-body1 font-light mt-10">{errors.plotingPhase.message}</p>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<Accordion
					type="single"
					collapsible>
					<AccordionItem
						value="assessmentPhase"
						className="p-20 border border-divider rounded-[10px] text-body1 font-light">
						<AccordionTrigger className="">Assessment phase</AccordionTrigger>
						<AccordionContent>
							<input
								{...register("assessmentPhase", { required: "Assessment phase is required" })}
								className="w-full border border-divider rounded-[10px] p-[15px] mt-10"
							/>
							{errors.assessmentPhase && (
								<p className="text-red-500 text-body1 font-light mt-10">{errors.assessmentPhase.message}</p>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<Accordion
					type="single"
					collapsible>
					<AccordionItem
						value="scalingPhase"
						className="p-20 border border-divider rounded-[10px] text-body1 font-light">
						<AccordionTrigger className="">Scaling phase</AccordionTrigger>
						<AccordionContent>
							<input
								{...register("scalingPhase", {
									required: "Scaling Phase is required",
								})}
								className="w-full border border-divider rounded-[10px] p-[15px] mt-10"
							/>
							{errors.scalingPhase && (
								<p className="text-red-500 text-body1 font-light mt-10">{errors.scalingPhase.message}</p>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* Submit Button */}
				<div>
					<button
						type="submit"
						ref={step3Ref}
						className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hidden">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default Step3;
