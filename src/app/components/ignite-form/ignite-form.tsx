import { UploadImage } from "@/app/libs/server/upload";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { setLoading } from "../../libs/store/slices/pagePropertiesSlice";
import { useDispatch } from "react-redux";

export type IgniteFormInputs = {
	ideaName: string;
	ideaDescription: string;
	submissionSource: string;
	associatedChallenges: string;
	submittedBy: string;
	category: string;
	sector: string;
	technologyProvider: string;
	technologyType: string;
	supportingFiles: File | null;
	status: string;
};

type IgniteFormTypes = {
	closeForm: () => void;
};

// const defaultValues = {
// 	ideaName: "",
// 	ideaDescription: "",
// 	submissionSource: "",
// 	associatedChallenges: "",
// 	submittedBy: "",
// 	category: "",
// 	sector: "",
// 	technologyProvider: "",
// 	technologyType: "",
// 	supportingFiles: [],
// 	status: "",
// };

const IgniteForm = ({ closeForm }: IgniteFormTypes) => {
	const {
		register,
		handleSubmit,
		setValue,
		control,
		reset,
		formState: { errors },
	} = useForm<IgniteFormInputs>();

	const dispatch = useDispatch();

	const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
	const [files, setFiles] = useState<File[]>([]);

	const onSubmit: SubmitHandler<IgniteFormInputs> = async (data) => {
		let photoUrl = null;
		dispatch(setLoading({ loading: true }));
		try {
			if (data.supportingFiles) {
				photoUrl = await UploadImage(data.supportingFiles, "ignites");
			}

			const igniteData = {
				...data,
				supportingFiles: photoUrl,
				status: "draft",
			};

			const response = await axios.post("/api/common/add-ignite", igniteData);
			if (response.status === 200) {
				console.log("Ignite Added", response);
			}
			dispatch(setLoading({ loading: false }));
			closeForm();
			reset();
		} catch (error) {
			dispatch(setLoading({ loading: false }));
			console.log(error);
		}
	};

	const handleProfilePhotoChange = (file: File | null) => {
		if (file) {
			setProfilePhotoPreview(URL.createObjectURL(file));
		} else {
			setProfilePhotoPreview(null);
		}
	};

	const clearPhoto = () => {
		setValue("supportingFiles", null);
		setProfilePhotoPreview(null);
		handleProfilePhotoChange(null);
	};

	useEffect(() => {
		setFiles([]);
	}, []);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col h-screen ">
			<div className="p-20 border-b border-divider">
				<h4 className="text-title2 font-semibold">Create new Ignite</h4>
			</div>

			<div className="flex-1 overflow-y-auto flex flex-col gap-20 p-20">
				{/* Idea Name */}
				<div className="flex flex-col gap-10">
					<label className="block text-body-2 font-light">Idea/Technology Name</label>
					<input
						type="text"
						{...register("ideaName", { required: "Idea Name is required" })}
						className="w-full border border-divider rounded-[10px] p-[15px]"
					/>
					{errors.ideaName && <p className="text-red-600">{errors.ideaName.message}</p>}
				</div>

				{/* Idea Description */}
				<div className="flex flex-col gap-10">
					<label className="block text-body-2 font-light">Idea Description</label>
					<textarea
						{...register("ideaDescription", { required: "Description is required" })}
						className="w-full border border-divider rounded-[10px] p-[15px]"></textarea>
					{errors.ideaDescription && <p className="text-red-600">{errors.ideaDescription.message}</p>}
				</div>

				{/* Submission Source */}
				<div className="flex flex-col gap-10">
					<label className="block text-body-2 font-light">Submission Source</label>
					<div className="relative">
						<select
							{...register("submissionSource", { required: "Submission source is required" })}
							className="w-full border border-divider rounded-[10px] p-[15px] appearance-none  bg-white focus:outline-none focus:ring-1 focus:ring-gray-4 focus:border-gray-4">
							<option value="">Select</option>
							<option value="Shuttle Service App">Shuttle Service App</option>
							<option value="Service 1">Service 1</option>
							<option value="Service 2">Service 2</option>
						</select>
						<div className="absolute inset-y-0 right-[10px] flex items-center pointer-events-none">
							<svg
								width="35"
								height="35"
								viewBox="0 0 35 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20.183 24.7484C19.8541 24.7482 19.5387 24.6172 19.3063 24.3845L13.5664 18.628C13.3472 18.3928 13.2279 18.0817 13.2336 17.7603C13.2393 17.4389 13.3696 17.1323 13.5969 16.905C13.8242 16.6777 14.1308 16.5475 14.4522 16.5418C14.7736 16.5361 15.0847 16.6554 15.3199 16.8746L20.183 21.8371L25.0462 16.8746C25.2814 16.6554 25.5924 16.5361 25.9139 16.5418C26.2353 16.5475 26.5419 16.6777 26.7692 16.905C26.9965 17.1323 27.1268 17.4389 27.1325 17.7603C27.1381 18.0817 27.0188 18.3928 26.7997 18.628L21.0598 24.401C20.8247 24.6277 20.5096 24.7526 20.183 24.7484V24.7484Z"
									fill="#292929"
								/>
							</svg>
						</div>
					</div>

					{/* <input
						type="text"
						{...register("submissionSource", { required: "Submission source is required" })}
						className="w-full border border-divider rounded-[10px] p-[15px]"
					/> */}
					{errors.submissionSource && <p className="text-red-600">{errors.submissionSource.message}</p>}
				</div>

				{/* Associated Challenges */}
				<div className="flex flex-col gap-10">
					<label className="block text-body-2 font-light">Associated Challenges</label>
					<div className="relative">
						<select
							{...register("associatedChallenges", { required: "Associated challenges is required" })}
							className="w-full border border-divider rounded-[10px] p-[15px] appearance-none  bg-white focus:outline-none focus:ring-1 focus:ring-gray-4 focus:border-gray-4">
							<option value="">Select</option>
							<option value="Shuttle Service App">Shuttle Service App</option>
							<option value="challenge 1">challenge 1</option>
							<option value="challenge 2">challenge 2</option>
						</select>
						<div className="absolute inset-y-0 right-[10px] flex items-center pointer-events-none">
							<svg
								width="35"
								height="35"
								viewBox="0 0 35 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20.183 24.7484C19.8541 24.7482 19.5387 24.6172 19.3063 24.3845L13.5664 18.628C13.3472 18.3928 13.2279 18.0817 13.2336 17.7603C13.2393 17.4389 13.3696 17.1323 13.5969 16.905C13.8242 16.6777 14.1308 16.5475 14.4522 16.5418C14.7736 16.5361 15.0847 16.6554 15.3199 16.8746L20.183 21.8371L25.0462 16.8746C25.2814 16.6554 25.5924 16.5361 25.9139 16.5418C26.2353 16.5475 26.5419 16.6777 26.7692 16.905C26.9965 17.1323 27.1268 17.4389 27.1325 17.7603C27.1381 18.0817 27.0188 18.3928 26.7997 18.628L21.0598 24.401C20.8247 24.6277 20.5096 24.7526 20.183 24.7484V24.7484Z"
									fill="#292929"
								/>
							</svg>
						</div>
					</div>

					{/* <input
						type="text"
						{...register("associatedChallenges", { required: "Associated challenges is required" })}
						className="w-full border border-divider rounded-[10px] p-[15px]"
					/> */}
					{errors.associatedChallenges && <p className="text-red-600">{errors.associatedChallenges.message}</p>}
				</div>

				{/* Submitted By */}
				<div className="flex flex-col gap-10">
					<label className="block text-body-2 font-light">Submitted By</label>
					<div className="relative">
						<select
							{...register("submittedBy", { required: "Submitter is required" })}
							className="w-full border border-divider rounded-[10px] p-[15px] appearance-none  bg-white focus:outline-none focus:ring-1 focus:ring-gray-4 focus:border-gray-4">
							<option value="">Select</option>
							<option value="Saf Al-Hayani">Saf Al-Hayani</option>
							<option value="Person 1">Person 1</option>
							<option value="Person 2">Person 2</option>
						</select>
						<div className="absolute inset-y-0 right-[10px] flex items-center pointer-events-none">
							<svg
								width="35"
								height="35"
								viewBox="0 0 35 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20.183 24.7484C19.8541 24.7482 19.5387 24.6172 19.3063 24.3845L13.5664 18.628C13.3472 18.3928 13.2279 18.0817 13.2336 17.7603C13.2393 17.4389 13.3696 17.1323 13.5969 16.905C13.8242 16.6777 14.1308 16.5475 14.4522 16.5418C14.7736 16.5361 15.0847 16.6554 15.3199 16.8746L20.183 21.8371L25.0462 16.8746C25.2814 16.6554 25.5924 16.5361 25.9139 16.5418C26.2353 16.5475 26.5419 16.6777 26.7692 16.905C26.9965 17.1323 27.1268 17.4389 27.1325 17.7603C27.1381 18.0817 27.0188 18.3928 26.7997 18.628L21.0598 24.401C20.8247 24.6277 20.5096 24.7526 20.183 24.7484V24.7484Z"
									fill="#292929"
								/>
							</svg>
						</div>
					</div>

					{/* <input
						type="text"
						{...register("submittedBy", { required: "Submitter is required" })}
						className="w-full border border-divider rounded-[10px] p-[15px]"
					/> */}
					{errors.submittedBy && <p className="text-red-600">{errors.submittedBy.message}</p>}
				</div>

				{/* Category */}
				<div className="flex flex-col gap-10">
					<label className="block text-body-2 font-light">Category</label>
					<div className="relative">
						<select
							{...register("category", { required: "Category is required" })}
							className="w-full border border-divider rounded-[10px] p-[15px] appearance-none  bg-white focus:outline-none focus:ring-1 focus:ring-gray-4 focus:border-gray-4">
							<option value="">Select</option>
							<option value="Winner/Finalist">Winner/Finalist</option>
							<option value="Category 1">Category 1</option>
							<option value="Category 2">Category 2</option>
						</select>
						<div className="absolute inset-y-0 right-[10px] flex items-center pointer-events-none">
							<svg
								width="35"
								height="35"
								viewBox="0 0 35 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20.183 24.7484C19.8541 24.7482 19.5387 24.6172 19.3063 24.3845L13.5664 18.628C13.3472 18.3928 13.2279 18.0817 13.2336 17.7603C13.2393 17.4389 13.3696 17.1323 13.5969 16.905C13.8242 16.6777 14.1308 16.5475 14.4522 16.5418C14.7736 16.5361 15.0847 16.6554 15.3199 16.8746L20.183 21.8371L25.0462 16.8746C25.2814 16.6554 25.5924 16.5361 25.9139 16.5418C26.2353 16.5475 26.5419 16.6777 26.7692 16.905C26.9965 17.1323 27.1268 17.4389 27.1325 17.7603C27.1381 18.0817 27.0188 18.3928 26.7997 18.628L21.0598 24.401C20.8247 24.6277 20.5096 24.7526 20.183 24.7484V24.7484Z"
									fill="#292929"
								/>
							</svg>
						</div>
					</div>

					{/* <input
						type="text"
						{...register("category", { required: "Category is required" })}
						className="w-full border border-divider rounded-[10px] p-[15px]"
					/> */}
					{errors.category && <p className="text-red-600">{errors.category.message}</p>}
				</div>

				{/* Sector */}
				<div className="flex flex-col gap-10">
					<label className="block text-body-2 font-light">Sector</label>
					<div className="relative">
						<select
							{...register("sector", { required: "Sector is required" })}
							className="w-full border border-divider rounded-[10px] p-[15px] appearance-none  bg-white focus:outline-none focus:ring-1 focus:ring-gray-4 focus:border-gray-4">
							<option value="">Select</option>
							<option value="Mobility">Mobility</option>
							<option value="Sector 1">Sector 1</option>
							<option value="Sector 2">Sector 2</option>
						</select>
						<div className="absolute inset-y-0 right-[10px] flex items-center pointer-events-none">
							<svg
								width="35"
								height="35"
								viewBox="0 0 35 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20.183 24.7484C19.8541 24.7482 19.5387 24.6172 19.3063 24.3845L13.5664 18.628C13.3472 18.3928 13.2279 18.0817 13.2336 17.7603C13.2393 17.4389 13.3696 17.1323 13.5969 16.905C13.8242 16.6777 14.1308 16.5475 14.4522 16.5418C14.7736 16.5361 15.0847 16.6554 15.3199 16.8746L20.183 21.8371L25.0462 16.8746C25.2814 16.6554 25.5924 16.5361 25.9139 16.5418C26.2353 16.5475 26.5419 16.6777 26.7692 16.905C26.9965 17.1323 27.1268 17.4389 27.1325 17.7603C27.1381 18.0817 27.0188 18.3928 26.7997 18.628L21.0598 24.401C20.8247 24.6277 20.5096 24.7526 20.183 24.7484V24.7484Z"
									fill="#292929"
								/>
							</svg>
						</div>
					</div>

					{/* <input
						type="text"
						{...register("sector", { required: "Sector is required" })}
						className="w-full border border-divider rounded-[10px] p-[15px]"
					/> */}
					{errors.sector && <p className="text-red-600">{errors.sector.message}</p>}
				</div>

				{/* Technology Provider */}
				<div className="flex flex-col gap-10">
					<label className="block text-body-2 font-light">Technology Provider</label>
					<div className="relative">
						<select
							{...register("technologyProvider", { required: "Technology provider is required" })}
							className="w-full border border-divider rounded-[10px] p-[15px] appearance-none  bg-white focus:outline-none focus:ring-1 focus:ring-gray-4 focus:border-gray-4">
							<option value="">Select</option>
							<option value="Mobility">Mobility</option>
							<option value="technologyProvider 1">technologyProvider 1</option>
							<option value="technologyProvider 2">technologyProvider 2</option>
						</select>
						<div className="absolute inset-y-0 right-[10px] flex items-center pointer-events-none">
							<svg
								width="35"
								height="35"
								viewBox="0 0 35 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20.183 24.7484C19.8541 24.7482 19.5387 24.6172 19.3063 24.3845L13.5664 18.628C13.3472 18.3928 13.2279 18.0817 13.2336 17.7603C13.2393 17.4389 13.3696 17.1323 13.5969 16.905C13.8242 16.6777 14.1308 16.5475 14.4522 16.5418C14.7736 16.5361 15.0847 16.6554 15.3199 16.8746L20.183 21.8371L25.0462 16.8746C25.2814 16.6554 25.5924 16.5361 25.9139 16.5418C26.2353 16.5475 26.5419 16.6777 26.7692 16.905C26.9965 17.1323 27.1268 17.4389 27.1325 17.7603C27.1381 18.0817 27.0188 18.3928 26.7997 18.628L21.0598 24.401C20.8247 24.6277 20.5096 24.7526 20.183 24.7484V24.7484Z"
									fill="#292929"
								/>
							</svg>
						</div>
					</div>

					{/* <input
						type="text"
						{...register("technologyProvider", { required: "Technology provider is required" })}
						className="w-full border border-divider rounded-[10px] p-[15px]"
					/> */}
					{errors.technologyProvider && <p className="text-red-600">{errors.technologyProvider.message}</p>}
				</div>

				{/* Technology Type */}
				<div className="flex flex-col gap-10">
					<label className="block text-body-2 font-light">Technology Type</label>
					<div className="relative">
						<select
							{...register("technologyType", { required: "Technology type is required" })}
							className="w-full border border-divider rounded-[10px] p-[15px] appearance-none  bg-white focus:outline-none focus:ring-1 focus:ring-gray-4 focus:border-gray-4">
							<option value="">Select</option>
							<option value="AI">AI</option>
							<option value="Blockchain">Blockchain</option>
							<option value="IoT">IoT</option>
							<option value="Cloud">Cloud</option>
						</select>

						<div className="absolute inset-y-0 right-[10px] flex items-center pointer-events-none">
							<svg
								width="35"
								height="35"
								viewBox="0 0 35 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20.183 24.7484C19.8541 24.7482 19.5387 24.6172 19.3063 24.3845L13.5664 18.628C13.3472 18.3928 13.2279 18.0817 13.2336 17.7603C13.2393 17.4389 13.3696 17.1323 13.5969 16.905C13.8242 16.6777 14.1308 16.5475 14.4522 16.5418C14.7736 16.5361 15.0847 16.6554 15.3199 16.8746L20.183 21.8371L25.0462 16.8746C25.2814 16.6554 25.5924 16.5361 25.9139 16.5418C26.2353 16.5475 26.5419 16.6777 26.7692 16.905C26.9965 17.1323 27.1268 17.4389 27.1325 17.7603C27.1381 18.0817 27.0188 18.3928 26.7997 18.628L21.0598 24.401C20.8247 24.6277 20.5096 24.7526 20.183 24.7484V24.7484Z"
									fill="#292929"
								/>
							</svg>
						</div>
					</div>

					{/* <input
						type="text"
						{...register("technologyType", { required: "Technology type  is required" })}
						className="w-full border border-divider rounded-[10px] p-[15px]"
					/> */}
					{errors.technologyType && <p className="text-red-600">{errors.technologyType.message}</p>}
				</div>

				{/* Supporting Files */}
				<div className="flex flex-col gap-10">
					<label className="block text-body-2 font-light">Supporting Files</label>
					<div
						className="mt-1 border-2 border-dashed border-gray-300 rounded p-4 text-center"
						onClick={() => document.getElementById("file-upload")?.click()}>
						<Controller
							name="supportingFiles"
							control={control}
							render={({ field }) => (
								<div className="flex flex-row justify-between gap-10 w-full">
									<input
										type="file"
										id="file-upload"
										multiple
										{...register("supportingFiles")}
										onChange={(e) => {
											const file = e.target.files?.[0] || null;
											field.onChange(file);
											handleProfilePhotoChange(file);
										}}
										className="hidden"
									/>
									{profilePhotoPreview && (
										<div className="relative inline-block">
											<img
												src={profilePhotoPreview}
												alt="Profile Preview"
												className="w-full h-full  object-cover"
											/>
											<button
												onClick={clearPhoto}
												className="absolute top-0 right-0 bg-gray-4 text-white w-6 h-6 p-[2px] rounded-full flex items-center justify-center">
												x
											</button>
										</div>
									)}
								</div>
							)}
						/>
						{!profilePhotoPreview && (
							<p className="text-gray-500">
								Drag and drop or <span className="text-blue-500 underline">browse</span> to choose a file
							</p>
						)}
					</div>
					{/* Show selected files */}
					{files.length > 0 && (
						<ul className="mt-2">
							{files.map((file, index) => (
								<li
									key={index}
									className="text-gray-700">
									{file.name}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			{/* Submit Button */}
			<div className="p-20 border border-t border-divider">
				{/* <button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
					Submit
				</button> */}

				<div className="flex flex-row gap-10">
					<button
						className={`w-fit px-20 py-[13px] border border-secondary-brown text-secondary-brown bg-white rounded-full text-button font-regular`}>
						Cancel
					</button>
					<button
						type="submit"
						className={`w-fit px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
						Submit for Approval
					</button>
				</div>
			</div>
		</form>
	);
};

export default IgniteForm;
