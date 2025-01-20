"use client";

import { Suspense } from "react";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { PilotFormStateSlice, addAttachment, deleteMilestone, updateForm } from "../libs/store/slices/pilotFormSlice";
import { UploadImage } from "../libs/server/upload";
import { RootState } from "../libs/store/store";

import Image from "next/image";
import StepIndicator from "../components/step-indicator/step-indicator";
import TimelineGraph from "../components/timeline-graph/timeline-graph";
import MilestoneModal from "./milestone-modal";
import Icon from "../components/icon/icons";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import GlobalLoading from "../components/atoms/loader";
import { setLoading } from "../libs/store/slices/pagePropertiesSlice";
import CheckboxGroup from "../create-technology/checkbox-group";
import { UserDetailsState } from "../libs/store/slices/userDetailsSlice";
import { fileToBase64 } from "../libs/common/utils";

// interface Milestone {
// 	name: string;
// 	date: string;
// }

// interface PilotFormData {
// 	pilotName: string;
// 	description: string;
// 	objective: string;
// 	location: string;
// 	pilotBudgetCurrency: string;
// 	pilotEstimatedBudget: number;
// 	fundedBy: string;
// 	technologySolution: string;
// 	associatedSector: string[];
// 	technologyProvider: string;
// 	devCoLeadingPilot: string;
// 	pilotLead: string;
// 	pilotTeam: string;
// 	milestones: Milestone[];
// }

interface FormTypesPilot extends PilotFormStateSlice {
	fundedBy: string[];
	associatedSector: string[];
}

const fundedByOptions = ["Public Investment Fund", "Development Company", "Technology Provider", "others"];

const sectorsOptions = [
	"Mobility",
	"Infrastructure & Utilities",
	"Construction",
	"IoT",
	"Smart cities & PropTech",
	"Environment & Sustainability",
	"others",
];

const STEPS = ["Enter Information", "Define Milestone"];

const CreatePilotForm: React.FC = () => {
	const formState = useSelector((state: RootState) => state.newPilotForm);
	const dispatch = useDispatch();
	const router = useRouter();
	const methods = useForm<FormTypesPilot>({ defaultValues: formState });
	const {
		getValues,
		reset,
		watch,
		setValue,
		formState: { errors, touchedFields },
	} = methods;
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [isEditing, setisEditing] = useState(false);

	const milestones = useSelector((state: RootState) => state.newPilotForm.milestones);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [users, setUsers] = useState<UserDetailsState[]>([]);

	const [attm, setAttm] = useState<any>();
	const searchParams = useSearchParams();
	const id = searchParams.get("id") || "";

	const fundedByOptionsValues = watch("fundedBy") || [];
	const sectorsOptionsValues = watch("associatedSector") || [];

	useEffect(() => {
		if (id) {
			setisEditing(true);
		} else {
			setisEditing(false);
		}

		const fetchData = async () => {
			try {
				dispatch(setLoading({ loading: true }));
				const DOMAIN = process.env.DOMAIN! || window.location.origin;
				const response = await axios.get(`${DOMAIN}/api/common/pilots/get-pilot?id=${id}`);

				if (!response) {
					throw new Error(`Error: ${response}`);
				}

				dispatch(updateForm({ ...response.data.data }));
				reset({ ...response.data.data });
			} catch (err) {
				dispatch(setLoading({ loading: false }));
				console.log(err);
			} finally {
				dispatch(setLoading({ loading: false }));
			}
		};

		if (id !== "") {
			fetchData();
		}

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

	const handleEdit = (index: number) => {
		setEditingIndex(index);
		setIsModalOpen(true);
	};

	const handleDelete = (index: number) => {
		dispatch(deleteMilestone(index));
	};

	const saveAndContinue = async () => {
		const formData = getValues();

		if (isEditing) {
			try {
				dispatch(setLoading({ loading: true }));
				const imgUrl = await UploadImage(attm, "uploads");
				dispatch(updateForm({ ...formData, attachments: imgUrl }));
				const response = await axios.put(`/api/common/pilots/update-pilot`, {
					id: id,
					updateData: {
						...formData,
						attachments: imgUrl,
					},
				});
				if (response.status === 200) {
					dispatch(setLoading({ loading: false }));
					router.push("/dashboard/tech-and-pilots");
				} else {
					dispatch(setLoading({ loading: false }));
				}
			} catch (error) {
				dispatch(setLoading({ loading: false }));
				console.log(error);
			}
		} else {
			try {
				if (Object.keys(errors).length === 0 && Object.keys(touchedFields).length > 0) {
					dispatch(setLoading({ loading: true }));
					const imgUrl = await UploadImage(attm, "uploads");
					dispatch(updateForm({ ...formData, attachments: imgUrl, milestones: formState.milestones }));

					const userResponse = await axios.get("/api/users/profile");
					if (userResponse.status === 200) {
						const userDetails = userResponse.data.data;

						const payloadData = {
							...formData,
							attachments: imgUrl,
							milestones: formState.milestones,
							submittedBy: {
								name: userDetails.username,
								email: userDetails.email,
								profilePhoto: userDetails.profilePhoto,
							},
						};

						const response = await axios.post("/api/common/pilots/add-pilot", payloadData);
						if (response.status === 200) {
							dispatch(setLoading({ loading: false }));
							console.log("Pilot Added", response);
							router.push("/dashboard/tech-and-pilots");
						} else {
							dispatch(setLoading({ loading: false }));
						}
					}
				}
			} catch (error) {
				dispatch(setLoading({ loading: false }));
				console.log(error);
			}
		}
	};

	const handleForm = () => {
		if (currentStep === 1) {
			setCurrentStep(2);
		}
	};

	const [preview, setPreview] = useState<string | null>(null);

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		setAttm(selectedFile);
		if (selectedFile) {
			const base64 = await fileToBase64(selectedFile);
			// Generate image preview
			setPreview(URL.createObjectURL(selectedFile));

			dispatch(addAttachment(base64));
		}
	};

	const handleCheckboxChange = (key: "fundedBy" | "associatedSector", option: string) => {
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

	return (
		<div className="flex flex-row w-full h-[100vh]">
			<div className="grid place-items-center">
				<GlobalLoading />
			</div>

			<aside className="w-[15%] max-h-[100vh] overflow-hidden border-r border-divider">
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
						currentStep={currentStep}
					/>
				</div>
			</aside>

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(saveAndContinue)}
					className=" text-gray-900 dark:text-white w-[88%] flex flex-col min-h-screen relative h-[100vh]">
					<header className="fixed h-[80px] flex flex-col min-h-[80px] w-full border-b border-divider bg-white z-10 p-30">
						<div className="text-subtitle1 font-semibold ">Creating new pilot</div>
					</header>
					{currentStep === 1 ? (
						<div className="overflow-y-auto p-30 flex-1 pt-[110px] bg-background2">
							<div className="border border-divider rounded-[10px] bg-white">
								<div className="w-[55%] flex flex-col gap-20 p-30">
									<div className="flex flex-col space-y-2 relative">
										<label
											htmlFor="pilotName"
											className="font-medium">
											Pilot Name
										</label>
										<input
											id="pilotName"
											type="text"
											{...methods.register("pilotName", { required: "Pilot name is required", maxLength: 80 })}
											className="w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light"
										/>

										{errors.pilotName && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">{errors.pilotName.message}</p>
										)}
									</div>
									<div className="flex flex-col space-y-2">
										<label
											htmlFor="description"
											className="font-medium">
											Description
										</label>
										<textarea
											id="description"
											{...methods.register("description", { required: "Pilot description is required" })}
											rows={4}
											className="textarea border border-gray-300 dark:border-gray-600 p-2 rounded-[10px] focus:ring-blue-500 focus:outline-none text-body2 font-light"
										/>
										{errors.description && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">{errors.description.message}</p>
										)}
									</div>
									<div className="flex flex-col space-y-2">
										<label
											htmlFor="objective"
											className="font-medium">
											Objective
										</label>
										<textarea
											id="objective"
											rows={4}
											{...methods.register("objective", { required: "Pilot objective is required" })}
											className="textarea border border-gray-300 dark:border-gray-600 p-2 rounded-[10px] focus:ring-blue-500 focus:outline-none text-body2 font-light"
										/>

										{errors.objective && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">{errors.objective.message}</p>
										)}
									</div>
									<div className="flex flex-col space-y-2">
										<label
											htmlFor="location"
											className="font-medium">
											Location
										</label>
										<input
											id="location"
											type="text"
											{...methods.register("location", { required: "Location is required" })}
											className="w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light bg-no-repeat"
											style={{
												backgroundImage: `url('icons/icon-location.svg')`,
												backgroundPosition: "calc(100% - 10px) center",
												backgroundSize: "22px",
											}}
										/>
										{errors.location && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">{errors.location.message}</p>
										)}
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="flex flex-col space-y-2">
											<label
												htmlFor="pilotBudgetCurrency"
												className="font-medium">
												Budget Currency
											</label>
											<select
												id="pilotBudgetCurrency"
												{...methods.register("pilotBudgetCurrency", { required: "Currency is required" })}
												className="w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light">
												<option value="">Select Currency</option>
												<option value="SAR">SAR</option>
												<option value="USD">USD</option>
											</select>
											{errors.pilotBudgetCurrency && (
												<p className="text-red-500 text-subtitle2 font-light mt-[5px]">
													{errors.pilotBudgetCurrency.message}
												</p>
											)}
										</div>
										<div className="flex flex-col space-y-2">
											<label
												htmlFor="pilotEstimatedBudget"
												className="font-medium">
												Estimated Budget
											</label>
											<input
												id="pilotEstimatedBudget"
												type="number"
												{...methods.register("pilotEstimatedBudget", { required: "Estimated Budget is required" })}
												className="w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light"
											/>
											{errors.pilotEstimatedBudget && (
												<p className="text-red-500 text-subtitle2 font-light mt-[5px]">
													{errors.pilotEstimatedBudget.message}
												</p>
											)}
										</div>
									</div>

									<CheckboxGroup
										options={fundedByOptions}
										selectedOptions={fundedByOptionsValues}
										onChange={(option) => handleCheckboxChange("fundedBy", option)}
										label="Funded By"
									/>
									<div className="flex flex-col space-y-2">
										<label
											htmlFor="technologySolution"
											className="font-medium">
											Technology Solution
										</label>
										<input
											id="technologySolution"
											type="text"
											{...methods.register("technologySolution", { required: "Technology Solution is required" })}
											className="w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light"
										/>
										{errors.technologySolution && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">
												{errors.technologySolution.message}
											</p>
										)}
									</div>
									<CheckboxGroup
										options={sectorsOptions}
										selectedOptions={sectorsOptionsValues}
										onChange={(option) => handleCheckboxChange("associatedSector", option)}
										label="Associated sector"
									/>

									<div className="flex flex-col space-y-2">
										<label
											htmlFor="techProvider"
											className="font-medium">
											Technology Provider
										</label>
										<select
											{...methods.register("technologyProvider", { required: "Technology Provider is required" })}
											className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px] appearance-none pr-12 bg-no-repeat"
											style={{
												backgroundImage: `url('icons/icon-chevron-down.svg')`,
												backgroundPosition: "calc(100% - 12px) center",
											}}>
											<option value="">Select your Technology Provider</option>
											<option value="ABC Smart Transit Solutions">ABC Smart Transit Solutions</option>
											<option value="DEF Smart Transit Solutions">DEF Smart Transit Solutions</option>
											<option value="GHI Smart Transit Solutions">GHI Smart Transit Solutions</option>
											<option value="JKL Smart Transit Solutions">JKL Smart Transit Solutions</option>
											<option value="MNO Smart Transit Solutions">MNO Smart Transit Solutions</option>
											<option value="others">Others</option>
										</select>

										{errors.technologyProvider && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">
												{errors.technologyProvider.message}
											</p>
										)}
									</div>

									<div className="flex flex-col space-y-2">
										<label
											htmlFor="techProvider"
											className="font-medium">
											DevCo leading this pilot
										</label>
										<select
											{...methods.register("devCoLeadingPilot", { required: "DevCo leading this pilot is required" })}
											className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px] appearance-none pr-12 bg-no-repeat"
											style={{
												backgroundImage: `url('icons/icon-chevron-down.svg')`,
												backgroundPosition: "calc(100% - 12px) center",
											}}>
											<option value="">Select your DevCo</option>
											<option value="ABC Smart Transit Solutions">ABC Smart Transit Solutions</option>
											<option value="DEF Smart Transit Solutions">DEF Smart Transit Solutions</option>
											<option value="GHI Smart Transit Solutions">GHI Smart Transit Solutions</option>
											<option value="JKL Smart Transit Solutions">JKL Smart Transit Solutions</option>
											<option value="MNO Smart Transit Solutions">MNO Smart Transit Solutions</option>
											<option value="others">Others</option>
										</select>

										{errors.devCoLeadingPilot && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">
												{errors.devCoLeadingPilot.message}
											</p>
										)}
									</div>

									<div className="flex flex-col space-y-2">
										<label
											htmlFor="techProvider"
											className="font-medium">
											Pilot Lead
										</label>
										<select
											{...methods.register("pilotLead", { required: "pilot Lead is required" })}
											className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px] appearance-none pr-12 bg-no-repeat"
											style={{
												backgroundImage: `url('icons/icon-chevron-down.svg')`,
												backgroundPosition: "calc(100% - 12px) center",
											}}>
											<option value="">Select your pilot lead</option>
											{users.map((user, index) => (
												<option
													key={index}
													value={user.username}>
													{user.username}
												</option>
											))}
											<option value="others">Others</option>
										</select>

										{errors.pilotLead && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">{errors.pilotLead.message}</p>
										)}
									</div>

									<div className="flex flex-col space-y-2">
										<label
											htmlFor="pilotTeam"
											className="font-medium">
											Pilot Team
										</label>
										<input
											id="pilotTeam"
											type="text"
											{...methods.register("pilotTeam", { required: "pilot Team is required" })}
											className="w-full border border-divider rounded-[10px] p-[15px] min-h-[48px] text-body2 font-light"
										/>
										{errors.pilotTeam && (
											<p className="text-red-500 text-subtitle2 font-light mt-[5px]">{errors.pilotTeam.message}</p>
										)}
									</div>
								</div>

								<div className=" border-b border-divider border-divider-1"></div>

								<div className="p-30">
									<div className="flex flex-col space-y-4">
										<label
											htmlFor="attachments"
											className="font-medium text-body1">
											Attachments
										</label>
										<div className="border-2 border-dashed border-divider rounded-lg p-6 bg-background3 flex flex-col items-center justify-center space-y-4 relative">
											<div className="text-center flex flex-col items-center gap-10">
												<p className="text-subtitle2 font-semibold text-gray-1">Upload Images</p>
												<p className="text-body3 text-gray-1">PNG, JPG and GIF files are allowed</p>
												<Icon name="cloud-upload-1" />
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
														className="w-full max-h-[400px] object-contain rounded-lg"
													/>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="h-100 pt-[110px] overflow-y-auto p-30 flex-1 ">
							<div className="flex flex-col gap-20">
								<TimelineGraph />
								<div></div>
								<div className="overflow-x-auto w-full rounded-[10px] border border-divider">
									<table className="min-w-full bg-white">
										<thead className="bg-gray-7 border-b border-divider rounded-[10px] overflow-hidden">
											<tr>
												<th className="text-left p-[15px] text-body3 text-gray-3">Milestone</th>
												<th className="text-left p-[15px] text-body3 text-gray-3">Expected Date</th>
												<th className="text-left p-[15px] text-body3 text-gray-3">Actions</th>
											</tr>
										</thead>
										<tbody>
											{milestones?.length > 0 &&
												milestones.map((milestone: any, index: number) => (
													<tr
														key={index}
														className="border-b border-b-divider">
														<td className="px-[15px] py-[20px] text-body2 text-gray-1">{milestone.name}</td>
														<td className="px-[15px] py-[20px] text-body2 text-gray-1">{milestone.date}</td>
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
								<button
									onClick={() => {
										setEditingIndex(null);
										setIsModalOpen(true);
									}}
									type="button"
									className="px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular w-fit ">
									Add Milestone
								</button>
								{isModalOpen && (
									<MilestoneModal
										isOpen={isModalOpen}
										onClose={() => setIsModalOpen(false)}
										index={editingIndex ?? undefined}
										defaultValues={editingIndex !== null ? milestones[editingIndex] : undefined}
									/>
								)}
							</div>
						</div>
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
								className={`px-20 py-[13px] border border-secondary-brown text-secondary-brown rounded-full text-button font-regular flex gap-10 items-center`}
								type="button"
								onClick={handleForm}>
								Save & Continue
							</button>

							{currentStep === 2 ? (
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
			</FormProvider>
		</div>
	);
};

// export default CreatePilotForm;

const CreatePilotWrapper = () => {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<CreatePilotForm />
		</Suspense>
	);
};

export default CreatePilotWrapper;
