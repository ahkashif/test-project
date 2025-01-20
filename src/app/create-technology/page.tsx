"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import GlobalLoading from "../components/atoms/loader";
import StepIndicator from "../components/step-indicator/step-indicator";
import { FormProvider, useForm } from "react-hook-form";
import CheckboxGroup from "./checkbox-group";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { UserDetailsState } from "../libs/store/slices/userDetailsSlice";
import Icon from "../components/icon/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Challenge, addAttachment, deleteChallenge } from "../libs/store/slices/techFormSlice";
import { RootState } from "../libs/store/store";
import ChallengeModal from "./challenge-modal";
import { fileToBase64, formatDate } from "../libs/common/utils";
import { setLoading } from "../libs/store/slices/pagePropertiesSlice";
import { UploadImage } from "../libs/server/upload";

const STEPS = ["Enter Information", "Associated Challenges", "Upload resources"];

const techTypeOptions = [
	"AL & Ml",
	"Blockchain",
	"AR & VR",
	"IoT",
	"Big Data Analytics",
	"Cloud Computing",
	"Drones",
	"3D printers",
	"others",
];

const sectorsOptions = [
	"Mobility",
	"Infrastructure & Utilities",
	"Construction",
	"IoT",
	"Smart cities & PropTech",
	"Environment & Sustainability",
	"others",
];

const addedValueOptions = [
	"Cost Efficiency",
	"Addressing a Current Challenge",
	"Enrich Beneficiaries Experience",
	"Higher Quality",
	"Expediting Development/Productivity",
	"Sustainable Solution",
];

const techSourcesOptions = ["Desktop Research", "Expos and conferences", "VC", "Innovation Hub"];

interface TechFormTypes {
	techName: string;
	techDescription: string;
	techProvider: string;
	owner: string;
	selectedOptions: string[];
	sectorOptions: string[];
	techSrcOptions: string[];
	addedValue: string[];
	devCo: string;
	businessChallenge: string;
	challenges: Challenge[];
	attachments: string;
}

function CreateTechForm() {
	const dispatch = useDispatch();
	const router = useRouter();
	const challenges = useSelector((state: RootState) => state.techFormSlice.challenges);
	const techFormData = useSelector((state: RootState) => state.techFormSlice);

	const [currentStep, setCurrentStep] = useState<number>(1);
	const [users, setUsers] = useState<UserDetailsState[]>([]);
	const [attm, setAttm] = useState<any>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [techId, setTechId] = useState("");

	const methods = useForm<TechFormTypes>({
		defaultValues: techFormData,
	});

	const {
		getValues,
		watch,
		setValue,
		control,
		trigger,
		formState: { errors },
	} = methods;

	const selectedOptions = watch("selectedOptions") || [];
	const sectorOptions = watch("sectorOptions") || [];
	const techSrcOptions = watch("techSrcOptions") || [];
	const addedValue = watch("addedValue") || [];

	const handleEdit = (index: number) => {
		setEditingIndex(index);
		setIsModalOpen(true);
	};

	const handleDelete = (index: number) => {
		dispatch(deleteChallenge(index));
	};

	const saveAndContinue = async () => {
		try {
			dispatch(setLoading({ loading: true }));
			const formData = getValues();
			const isValid = await trigger();
			if (isValid) {
				const imgUrl = await UploadImage(attm, "uploads");

				if (imgUrl) {
					// dispatch(updateForm({ ...formData, attachments: imgUrl }));
					const payload = {
						...formData,
						attachments: imgUrl,
						currentStage: "Screening",
						technologyId: techId,
						challenges: challenges,
					};
					console.log(payload);
					const response = await axios.post("/api/common/technologies/add", payload);
					console.log(response);
					if (response.status === 200) {
						dispatch(setLoading({ loading: false }));
						console.log("first");
						router.push("/dashboard/tech-and-pilots");
					}
				}
			}
		} catch (err) {
			dispatch(setLoading({ loading: false }));
			console.log("Error Occured", err);
		}
	};

	function generateRandomNumber(): string {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		const yearStr = year.toString().slice(-2);
		const monthStr = month.toString().padStart(2, "0");
		const dayStr = day.toString().padStart(2, "0");
		const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
		return `${yearStr}${monthStr}${dayStr}${randomPart}`.slice(0, 8);
	}

	const handleCheckboxChange = (
		key: "selectedOptions" | "sectorOptions" | "techSrcOptions" | "addedValue",
		option: string
	) => {
		const currentSelection = watch(key) || [];
		if (currentSelection.includes(option)) {
			setValue(
				key,
				currentSelection.filter((item: string) => item !== option)
			);
		} else {
			setValue(key, [...currentSelection, option]);
		}
	};

	const handleForm = () => {
		// dispatch(updateForm({ ...formData }));

		if (currentStep === 1) {
			setCurrentStep(2);
		} else {
			setCurrentStep(3);
		}
	};

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		setAttm(selectedFile);
		if (selectedFile) {
			const base64 = await fileToBase64(selectedFile);
			setPreview(URL.createObjectURL(selectedFile));

			dispatch(addAttachment(base64));
		}
	};

	useEffect(() => {
		setTechId(generateRandomNumber());
		const fetchUser = async () => {
			try {
				const response = await axios.get("/api/users/get-users");
				if (response.status === 200) {
					const data = response.data.data;
					setUsers(data);
				}
			} catch (e) {
				console.log(e);
			}
		};

		fetchUser();
	}, []);

	return (
		<div className="flex flex-row w-full h-[100vh]">
			<div className="grid place-items-center">
				<GlobalLoading />
			</div>

			<aside className="w-[20%] max-h-[100vh] overflow-hidden border-r border-divider">
				<div className="border-b border-divider w-full p-20 max-h-[80px]">
					<Image
						src={"/pif-logo-large.svg"}
						alt={"pif-logo"}
						width={90}
						height={40}
					/>
				</div>

				<div>
					<StepIndicator
						steps={STEPS}
						currentStep={currentStep - 1}
					/>
				</div>
			</aside>

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(saveAndContinue)}
					className=" text-gray-900 dark:text-white w-[80%] flex flex-col min-h-screen relative h-[100vh]">
					<header className="fixed h-[80px] flex flex-col min-h-[80px] w-full border-b border-divider bg-white z-10 p-30">
						<div className="text-subtitle1 font-semibold ">Purpose new Technology</div>
					</header>
					{currentStep === 1 ? (
						<div className="overflow-y-auto p-30 flex-1 pt-[110px] bg-background2">
							<div className="border border-divider rounded-[10px]">
								<div className="w-[55%] flex flex-col gap-20 p-30">
									<div className="flex flex-col space-y-2 relative">
										<label
											htmlFor=""
											className="font-medium">
											Stage
										</label>

										<div className="w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light bg-gray-6">
											Screening
										</div>
									</div>
									<div className="flex flex-col space-y-2 relative">
										<label
											htmlFor=""
											className="font-medium">
											Stage
										</label>

										<div className="w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light bg-gray-6">
											{techId}
											{/* {1234} */}
										</div>
									</div>
									<div className="flex flex-col space-y-2">
										<label
											htmlFor="techName"
											className="font-medium">
											Technology Name
										</label>
										<input
											id="techName"
											type="text"
											{...methods.register("techName", { required: "Technology Name is required" })}
											className="w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light"
										/>
										{errors.techName && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">{errors.techName.message}</p>
										)}
									</div>
									<div className="flex flex-col space-y-2">
										<label
											htmlFor="techDescription"
											className="font-medium">
											Technology Description
										</label>
										<textarea
											id="description"
											{...methods.register("techDescription", { required: "Technology description is required" })}
											rows={4}
											className="textarea border border-gray-300 dark:border-gray-600 p-2 rounded-[10px] focus:ring-blue-500 focus:outline-none text-body2 font-light"
										/>
										{errors.techDescription && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">
												{errors.techDescription.message}
											</p>
										)}
									</div>
									<div className="flex flex-col space-y-2">
										<label
											htmlFor="techProvider"
											className="font-medium">
											Technology Provider
										</label>
										<select
											{...methods.register("techProvider", { required: "Technology Provider is required" })}
											className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px] appearance-none pr-12 bg-no-repeat"
											style={{
												backgroundImage: `url('icons/icon-chevron-down.svg')`,
												backgroundPosition: "right",
											}}>
											<option value="">Select your Technology Provider</option>
											<option value="ABC Smart Transit Solutions">ABC Smart Transit Solutions</option>
											<option value="DEF Smart Transit Solutions">DEF Smart Transit Solutions</option>
											<option value="GHI Smart Transit Solutions">GHI Smart Transit Solutions</option>
											<option value="JKL Smart Transit Solutions">JKL Smart Transit Solutions</option>
											<option value="MNO Smart Transit Solutions">MNO Smart Transit Solutions</option>
											<option value="others">Others</option>
										</select>

										{errors.techProvider && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">{errors.techProvider.message}</p>
										)}
									</div>

									<div className="flex flex-col space-y-2">
										<label
											htmlFor="techProvider"
											className="font-medium">
											Owner
										</label>
										<select
											{...methods.register("owner", { required: "owner is required" })}
											className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px] appearance-none pr-12 bg-no-repeat"
											style={{
												backgroundImage: `url('icons/icon-chevron-down.svg')`,
												backgroundPosition: "right",
											}}>
											<option value="">Select the owner</option>
											{users.map((user, index) => (
												<option
													key={index}
													value={user.username}>
													{user.username}
												</option>
											))}
											<option value="others">Others</option>
										</select>

										{errors.owner && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">{errors.owner.message}</p>
										)}
									</div>
									<CheckboxGroup
										options={techTypeOptions}
										selectedOptions={selectedOptions}
										onChange={(option) => handleCheckboxChange("selectedOptions", option)}
										label="Technology Type"
									/>
									<CheckboxGroup
										options={sectorsOptions}
										selectedOptions={sectorOptions}
										onChange={(option) => handleCheckboxChange("sectorOptions", option)}
										label="Associated Sectors"
									/>
									<CheckboxGroup
										options={techSourcesOptions}
										selectedOptions={techSrcOptions}
										onChange={(option) => handleCheckboxChange("techSrcOptions", option)}
										label="Associated Sectors"
									/>
								</div>
							</div>
						</div>
					) : (
						<>
							{currentStep === 2 ? (
								<div className="h-100 pt-[110px] overflow-y-auto p-30 flex-1 bg-background2">
									<div className="border border-divider rounded-[10px] ">
										<div className="w-[60%] flex flex-col gap-10 space-y-2 p-30">
											<div className="flex flex-col space-y-2">
												<label
													htmlFor="devCo"
													className="font-medium">
													Potential DevCo
												</label>
												<select
													{...methods.register("devCo", { required: "Field is required" })}
													className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px] appearance-none pr-12 bg-no-repeat"
													style={{
														backgroundImage: `url('icons/icon-chevron-down.svg')`,
														backgroundPosition: "right",
													}}>
													<option value="">Select the Potential DevCo</option>
													<option value="ABC Smart Transit Solutions">ABC Smart Transit Solutions</option>
													<option value="DEF Smart Transit Solutions">DEF Smart Transit Solutions</option>
													<option value="GHI Smart Transit Solutions">GHI Smart Transit Solutions</option>
													<option value="JKL Smart Transit Solutions">JKL Smart Transit Solutions</option>
													<option value="MNO Smart Transit Solutions">MNO Smart Transit Solutions</option>
													<option value="others">Others</option>
												</select>

												{errors.devCo && (
													<p className="text-red-500 text-subtitle2 font-light mt-[5px]">{errors.devCo.message}</p>
												)}
											</div>

											<div className="flex flex-col gap-10 space-y-2">
												<label className="block text-subtitle2 font-semibold">Relevant to a business challenge</label>
												<div className="flex flex-row">
													<label className="flex items-center gap-2 w-1/2">
														<input
															{...methods.register("businessChallenge", { required: true })}
															type="radio"
															value="Yes"
															className="hidden peer"
														/>
														<div className="w-[16px] h-[16px]  border-2 border-gray-400 rounded-full peer-checked:border-secondary-brown peer-checked:border-[5px]"></div>
														<span className="text-body2 font-light peer-checked:font-semibold">Yes</span>
													</label>

													<label className="flex items-center gap-2 w-1/2">
														<input
															{...methods.register("businessChallenge", { required: true })}
															type="radio"
															value="no"
															className="hidden peer"
														/>
														<div className="w-[16px] h-[16px]  border-2 border-gray-400 rounded-full peer-checked:border-secondary-brown peer-checked:border-[5px]"></div>
														<span className="text-body2 font-light peer-checked:font-semibold">No</span>
													</label>
												</div>

												{errors.businessChallenge && (
													<p className="text-red-500 text-subtitle2 font-light mt-[5px]">
														{errors.businessChallenge.message}
													</p>
												)}
											</div>
										</div>
										<div className=" border-b border-divider border-divider-1"></div>
										<div className="p-30 space-y-[30px]">
											<div className="overflow-x-auto w-full rounded-[10px] border border-divider">
												<table className="min-w-full bg-white">
													<thead className="bg-gray-7 border-b border-divider rounded-[10px] overflow-hidden">
														<tr>
															<th className="text-left p-[15px] text-body3 text-gray-3">Date</th>
															<th className="text-left p-[15px] text-body3 text-gray-3">Name</th>
															<th className="text-left p-[15px] text-body3 text-gray-3">description</th>
															<th className="text-left p-[15px] text-body3 text-gray-3">Actions</th>
														</tr>
													</thead>
													<tbody>
														{challenges?.length > 0 &&
															challenges.map((challenge: any, index: number) => (
																<tr
																	key={index}
																	className="border-b border-b-divider">
																	<td className="px-[15px] py-[20px] text-body2 text-gray-1">
																		{formatDate(new Date())}
																	</td>
																	<td className="px-[15px] py-[20px] text-body2 text-gray-1">{challenge.name}</td>
																	<td className="px-[15px] py-[20px] text-body2 text-gray-1">
																		{challenge.description}
																	</td>
																	<td className="px-[15px] py-[20px] text-body2 text-gray-1">
																		<div className="flex flex-row gap-30">
																			<button
																				onClick={() => handleEdit(index)}
																				className="text-body2 flex gap-10">
																				<Icon
																					name="edit"
																					size={20}
																				/>
																				Edit
																			</button>
																			<button
																				onClick={() => handleDelete(index)}
																				className="text-body2 flex gap-10">
																				<Icon
																					name="delete"
																					size={20}
																				/>
																				Delete
																			</button>
																		</div>
																	</td>
																</tr>
															))}
													</tbody>
												</table>
											</div>
											<div className="space-x-[20px]">
												<button
													type="button"
													className="px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular w-fit ">
													Map Existing Challenges
												</button>
												<button
													onClick={() => {
														setEditingIndex(null);
														setIsModalOpen(true);
													}}
													type="button"
													className="px-20 py-[13px] border border-secondary-brown bg-white text-secondary-brown rounded-full text-button font-regular w-fit ">
													Add Challenge
												</button>
											</div>

											{isModalOpen && (
												<ChallengeModal
													isOpen={isModalOpen}
													onClose={() => setIsModalOpen(false)}
													index={editingIndex ?? undefined}
													defaultValues={editingIndex !== null ? challenges[editingIndex] : undefined}
												/>
											)}
										</div>
										<div className=" border-b border-divider border-divider-1"></div>
										<div className="p-30">
											<CheckboxGroup
												options={addedValueOptions}
												selectedOptions={addedValue}
												onChange={(option) => handleCheckboxChange("addedValue", option)}
												label="Select Added Value"
											/>
										</div>
									</div>
								</div>
							) : (
								<div className="h-100 pt-[110px] overflow-y-auto p-30 flex-1 bg-background2">
									<div className="flex flex-col space-y-4">
										<label
											htmlFor="attachments"
											className="font-medium text-body1">
											Attachments
										</label>
										<div className="border-2 border-dashed border-divider rounded-lg p-6 bg-gray-50 flex flex-col items-center justify-center space-y-4 relative">
											<div className="text-center flex flex-col items-center gap-10">
												<p className="text-subtitle2 font-semibold text-gray-1">Upload Images</p>
												<Icon name="cloud-upload-1" />
												<p className="text-body3 text-gray-1">PNG, JPG and GIF files are allowed</p>
											</div>
											<input
												id="attachments"
												type="file"
												multiple
												onChange={handleFileChange}
												className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
											/>
											<p className="text-body2 text-gray-1 mt-4">Drag and drop or browse to choose a file</p>
										</div>

										{preview && (
											<div className="mt-4">
												<p className="font-medium">Preview:</p>
												<div className="border-2 border-dashed border-divider rounded-lg p-6 bg-gray-50 flex flex-col items-center justify-center space-y-4 relative">
													<img
														src={preview}
														alt="Preview"
														className="w-full max-h-[400px] object-cover rounded-lg border border-divider dark:border-gray-600"
													/>
												</div>
											</div>
										)}
									</div>
								</div>
							)}
						</>
					)}

					<footer className="flex flex-row justify-between px-30 py-20 border-t border-divider">
						<div className="flex flex-row gap-20">
							{currentStep > 1 && (
								<button
									aria-label="Go back to previous step"
									className={`px-20 py-[13px] border border-secondary-brown text-secondary-brown rounded-full text-button font-regular flex gap-10 items-center transition-all duration-300 ease-in-out transform hover:scale-105`}
									type="button"
									onClick={() => {
										setCurrentStep((prevState) => prevState - 1);
									}}>
									Back
								</button>
							)}

							<button
								type="button"
								className={`px-20 py-[13px] border border-secondary-brown text-secondary-brown rounded-full text-button font-regular flex gap-10 items-center`}>
								Cancel
							</button>
						</div>
						<div className="flex flex-row gap-20">
							<button
								className={`px-20 py-[13px] border border-secondary-brown text-white bg-secondary-brown rounded-full text-button font-regular flex gap-10 items-center`}
								type="button"
								onClick={handleForm}>
								Save & Continue
							</button>

							{currentStep === 3 ? (
								<button
									type="submit"
									className={`px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}>
									Submit
								</button>
							) : (
								""
							)}
						</div>
					</footer>
				</form>
				<DevTool control={control} />
			</FormProvider>
		</div>
	);
}

export default CreateTechForm;
