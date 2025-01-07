import React, { Ref, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FileUpload from "./file-upload";
import Step3 from "./step-3";
import Step2 from "./step-2";
import { useDispatch, useSelector } from "react-redux";
import { Step1Data, updateFormData } from "../libs/store/slices/createPilotSlice";

import { RootState } from "../libs/store/store";

interface PilotFormData {
	owner: string;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	stage: string;
	objective: string;
	location: string;
	funding: string;
	budgetCurrency: string;
	estimatedBudget: number | string;
	image: string;
	documents: File[];
}

export const Step1 = ({
	step1Ref,
	onStepChange,
}: {
	step1Ref: Ref<HTMLButtonElement>;
	onStepChange: (step: number) => void;
}) => {
	const dispatch = useDispatch();
	const formData = useSelector((state: RootState) => state.pilotForm.forms[state.pilotForm.forms.length]?.step1) || {};
	const base64Image = formData.image;

	const {
		register,
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, touchedFields },
	} = useForm<PilotFormData>({
		defaultValues: formData,
	});

	const [imagePreview, setImagePreview] = useState<string | null>(base64Image || null);

	const [base64String, setBase64String] = useState<string | null | undefined>(null);

	// const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const file = event.target.files?.[0];
	// 	if (file) {
	// 		const reader = new FileReader();

	// 		reader.onload = () => {
	// 			if (reader.result) {
	// 				setBase64String(reader.result.toString()); // Convert the result to a string
	// 			}
	// 		};

	// 		reader.onerror = (error) => {
	// 			console.error("Error reading file:", error);
	// 		};

	// 		reader.readAsDataURL(file); // Read file as Base64 string
	// 	}
	// };

	const onImageChange = (files: FileList | null) => {
		if (files && files[0]) {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.result) {
					const base64String = reader.result.toString();
					setValue("image", base64String);
					setBase64String(base64String);
				}
			};

			reader.onerror = (error) => {
				console.error("Error reading file:", error);
			};

			const imageFile = files[0];
			reader.readAsDataURL(imageFile);
			setImagePreview(URL.createObjectURL(imageFile));
		} else {
			setValue("image", "");
			setImagePreview(null);
		}
	};

	useEffect(() => {
		reset({ image: base64Image });
		setImagePreview(base64Image);
	}, [base64Image, reset]);

	const onDocumentsChange = (files: FileList | null) => {
		if (files) {
			const documentFiles = Array.from(files);
			setValue("documents", documentFiles);
		} else {
			setValue("documents", []);
		}
	};

	const onSubmit = (data: PilotFormData) => {
		if (Object.keys(errors).length === 0 && Object.keys(touchedFields).length > 0) {
			onStepChange(1);
			console.log("Form Data:", {
				...data,
				image: base64String,
			});

			dispatch(updateFormData({ step: "step1", data: { ...(data as Partial<Step1Data>) } }));
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="">
			<div className="flex flex-row gap-30">
				<div className="w-1/2 flex flex-col gap-20">
					{/* Pilot Owner */}
					<div>
						<label className="block text-body-2 font-light">Pilot owner</label>
						<input
							type="text"
							{...register("owner", { required: "Pilot owner is required" })}
							placeholder="Saf Al-Hayani"
							className="w-full border border-divider rounded-[10px] p-[15px]"
						/>
						{errors.owner && <p className="text-red-500 text-subtitle2 mt-[5px]">{errors.owner.message}</p>}
					</div>

					{/* Pilot Name */}
					<div>
						<label className="block text-body-2 font-light">Pilot name</label>
						<input
							type="text"
							{...register("name", { required: "Pilot name is required" })}
							placeholder="Riyadh's Public Transit System"
							className="w-full border border-divider rounded-[10px] p-[15px]"
						/>
						{errors.name && <p className="text-red-500 text-subtitle2 mt-[5px]">{errors.name.message}</p>}
					</div>

					{/* Pilot Description */}
					<div>
						<label className="block text-body-2 font-light">Pilot description</label>
						<textarea
							{...register("description", { required: "Description is required" })}
							placeholder="Enter the pilot description"
							className="w-full border border-divider rounded-[10px] p-[15px]"></textarea>
						{errors.description && <p className="text-red-500 text-subtitle2 mt-[5px]">{errors.description.message}</p>}
					</div>

					<div className="flex flex-row gap-20">
						{/* Pilot Start Date */}
						<div className="w-1/2">
							<label className="block text-body-2 font-light">Pilot start date</label>
							<input
								type="date"
								{...register("startDate", { required: "Start date is required" })}
								className="w-full border border-divider rounded-[10px] p-[15px]"
							/>
							{errors.startDate && <p className="text-red-500 text-subtitle2 mt-[5px]">{errors.startDate.message}</p>}
						</div>

						{/* Pilot End Date */}
						<div className="w-1/2">
							<label className="block text-body-2 font-light">Pilot estd. end date</label>
							<input
								type="date"
								{...register("endDate", { required: "End date is required" })}
								className="w-full border border-divider rounded-[10px] p-[15px]"
							/>
							{errors.endDate && <p className="text-red-500 text-subtitle2 mt-[5px]">{errors.endDate.message}</p>}
						</div>
					</div>

					{/* Pilot Stage */}
					<div>
						<label className="block text-body-2 font-light">Pilot stage</label>
						<select
							{...register("stage", { required: "Stage is required" })}
							className="w-full border border-divider rounded-[10px] p-[15px]">
							<option value="">Select a stage</option>
							<option value="Planning">Planning</option>
							<option value="Ploting">Ploting</option>
							<option value="Assessment">Assessment</option>
							<option value="Scaling">Scaling</option>
						</select>
						{errors.stage && <p className="text-red-500 text-subtitle2 mt-[5px]">{errors.stage.message}</p>}
					</div>

					{/* Pilot Objective */}
					<div>
						<label className="block text-body-2 font-light">Pilot objective</label>
						<input
							type="text"
							{...register("objective", { required: "Objective is required" })}
							placeholder="Shuttle Service App"
							className="w-full border border-divider rounded-[10px] p-[15px]"
						/>
						{errors.objective && <p className="text-red-500 text-subtitle2 mt-[5px]">{errors.objective.message}</p>}
					</div>

					{/* Pilot Location */}
					<div>
						<label className="block text-body-2 font-light">Pilot location</label>
						<input
							type="text"
							{...register("location", { required: "Location is required" })}
							placeholder="Riyadh"
							className="w-full border border-divider rounded-[10px] p-[15px]"
						/>
						{errors.location && <p className="text-red-500 text-subtitle2 mt-[5px]">{errors.location.message}</p>}
					</div>

					{/* Funding */}
					<div>
						<label className="block text-body-2 font-light">Funding</label>
						<select
							{...register("funding", { required: "Funding is required" })}
							className="w-full border border-divider rounded-[10px] p-[15px]">
							<option value="">Select funding</option>
							<option value="Funded by PIF">Funded by PIF</option>
							<option value="Self-Funded">Self-Funded</option>
						</select>
						{errors.funding && <p className="text-red-500 text-subtitle2 mt-[5px]">{errors.funding.message}</p>}
					</div>

					<div className="flex flex-row gap-20">
						{/* Pilot Budget Currency */}
						<div className="w-1/2">
							<label className="block text-body-2 font-light">Pilot budget currency</label>
							<select
								{...register("budgetCurrency", { required: "Currency is required" })}
								className="w-full border border-divider rounded-[10px] p-[15px]">
								<option value="">Select currency</option>
								<option value="USD">USD</option>
								<option value="SAR">SAR</option>
								<option value="EUR">EUR</option>
							</select>
							{errors.budgetCurrency && (
								<p className="text-red-500 text-subtitle2 mt-[5px]">{errors.budgetCurrency.message}</p>
							)}
						</div>

						{/* Pilot Estimated Budget */}
						<div className="w-1/2">
							<label className="block text-body-2 font-light">Pilot estimated budget</label>
							<input
								type="number"
								{...register("estimatedBudget", { required: "Budget is required" })}
								placeholder="e.g. 245,251,256"
								className="w-full border border-divider rounded-[10px] p-[15px]"
							/>
							{errors.estimatedBudget && (
								<p className="text-red-500 text-subtitle2 mt-[5px]">{errors.estimatedBudget.message}</p>
							)}
						</div>
					</div>
				</div>
				<div className="w-1/2 flex flex-col gap-20">
					{/* Image Upload */}
					<div>
						<label className="block text-body-2 font-light">Pilot image</label>
						<Controller
							name="image"
							control={control}
							render={({ field }) => (
								<FileUpload
									label="Pilot image"
									accept="image/*"
									onChange={onImageChange}
									selectedFiles={[]}
									imageFile={field.value || []}
									previewImage={imagePreview}
								/>
							)}
						/>
					</div>

					{/* Documents Upload */}
					<div>
						<label className="block text-body-2 font-light">Upload documents</label>
						<Controller
							name="documents"
							control={control}
							render={({ field }) => (
								<FileUpload
									label="Upload documents"
									accept=".pdf,.doc,.docx"
									multiple
									// onChange={(files) => setDocuments(files ? Array.from(files) : [])}
									onChange={onDocumentsChange}
									selectedFiles={field.value || []}
								/>
							)}
						/>
					</div>
				</div>
			</div>

			<button
				type="submit"
				ref={step1Ref}
				className="hidden">
				Submit
			</button>
		</form>
	);
};

const MultiStepForm = ({
	userOnStep,
	step1Ref,
	step2Ref,
	step3Ref,
	onStepChange,
}: {
	userOnStep: number;
	step1Ref: Ref<HTMLButtonElement>;
	step2Ref: Ref<HTMLButtonElement>;
	step3Ref: Ref<HTMLButtonElement>;
	onStepChange: (step: number) => void;
}) => {
	return (
		<>
			{userOnStep === 0 && (
				<Step1
					step1Ref={step1Ref}
					onStepChange={onStepChange}
				/>
			)}
			{userOnStep === 1 && (
				<Step2
					step2Ref={step2Ref}
					onStepChange={onStepChange}
				/>
			)}
			{userOnStep === 2 && <Step3 step3Ref={step3Ref} />}
		</>
	);
};

export default MultiStepForm;
