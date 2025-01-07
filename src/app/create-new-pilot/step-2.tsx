import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React, { Ref } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateFormData, Step2Data } from "../libs/store/slices/createPilotSlice";

interface FormData {
	companyPortfolio: string;
	sector: string;
	technologySolution: string;
	technologySolutionProvider: string;
	expert: string;
}

function Step2({ step2Ref, onStepChange }: { step2Ref: Ref<HTMLButtonElement>; onStepChange: (step: number) => void }) {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		if (Object.keys(errors).length === 0 && Object.keys(touchedFields).length > 0) {
			onStepChange(2);
			dispatch(updateFormData({ step: "step2", data: { ...(data as Partial<Step2Data>) } }));
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
						value="companyPortfolio"
						className="p-20 border border-divider rounded-[10px] text-body1 font-light">
						<AccordionTrigger className="">Add Portfolio company</AccordionTrigger>
						<AccordionContent>
							<input
								{...register("companyPortfolio", { required: "Company Portfolio is required" })}
								className="w-full border border-divider rounded-[10px] p-[15px] mt-10"
							/>
							{errors.companyPortfolio && (
								<p className="text-red-500 text-body1 font-light mt-10">{errors.companyPortfolio.message}</p>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<Accordion
					type="single"
					collapsible>
					<AccordionItem
						value="sector"
						className="p-20 border border-divider rounded-[10px] text-body1 font-light">
						<AccordionTrigger className="">Add sector</AccordionTrigger>
						<AccordionContent>
							<input
								{...register("sector", { required: "Sector is required" })}
								className="w-full border border-divider rounded-[10px] p-[15px] mt-10"
							/>
							{errors.sector && <p className="text-red-500 text-body1 font-light mt-10">{errors.sector.message}</p>}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<Accordion
					type="single"
					collapsible>
					<AccordionItem
						value="technologySolution"
						className="p-20 border border-divider rounded-[10px] text-body1 font-light">
						<AccordionTrigger className="">Add Technology solution </AccordionTrigger>
						<AccordionContent>
							<input
								{...register("technologySolution", { required: "Technology Solution is required" })}
								className="w-full border border-divider rounded-[10px] p-[15px] mt-10"
							/>
							{errors.technologySolution && (
								<p className="text-red-500 text-body1 font-light mt-10">{errors.technologySolution.message}</p>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<Accordion
					type="single"
					collapsible>
					<AccordionItem
						value="technologySolutionProvider"
						className="p-20 border border-divider rounded-[10px] text-body1 font-light">
						<AccordionTrigger className="">Add Technology solution provider </AccordionTrigger>
						<AccordionContent>
							<input
								{...register("technologySolutionProvider", {
									required: "Technology Solution Provider is required",
								})}
								className="w-full border border-divider rounded-[10px] p-[15px] mt-10"
							/>
							{errors.technologySolutionProvider && (
								<p className="text-red-500 text-body1 font-light mt-10">{errors.technologySolutionProvider.message}</p>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<Accordion
					type="single"
					collapsible>
					<AccordionItem
						value="expert"
						className="p-20 border border-divider rounded-[10px] text-body1 font-light">
						<AccordionTrigger className="">Add Expert</AccordionTrigger>
						<AccordionContent>
							<input
								{...register("expert", { required: "Expert is required" })}
								className="w-full border border-divider rounded-[10px] p-[15px] mt-10"
							/>
							{errors.expert && <p className="text-red-500 text-body1 font-light mt-10">{errors.expert.message}</p>}
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* Submit Button */}
				<div>
					<button
						type="submit"
						ref={step2Ref}
						className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hidden">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default Step2;
