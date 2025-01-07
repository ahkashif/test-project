"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "../../components/button/button";
import { updateUserDetails } from "@/app/libs/store/slices/userDetailsSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UploadImage } from "../../libs/server/upload";

interface RegistrationFormData {
	username: string;
	email: string;
	designation: string;
	profilePhoto: File | null;
	password: string;
}

export const SignupForm = () => {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm<RegistrationFormData>({
		defaultValues: {
			username: "",
			email: "",
			designation: "",
			profilePhoto: null,
			password: "",
		},
	});
	const dispatch = useDispatch();
	const router = useRouter();

	const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const handleProfilePhotoChange = (file: File | null) => {
		if (file) {
			setProfilePhotoPreview(URL.createObjectURL(file));
		} else {
			setProfilePhotoPreview(null);
		}
	};

	const clearPhoto = () => {
		setValue("profilePhoto", null);
		setProfilePhotoPreview(null);
		handleProfilePhotoChange(null);
	};

	// Form Submission Handler
	const onSubmit = async (data: RegistrationFormData) => {
		console.log("Form Submitted:", data);

		try {
			setLoading(true);
			let profilePhotoUrl = null;
			if (data.profilePhoto) {
				profilePhotoUrl = await UploadImage(data.profilePhoto);
			}

			const registrationData = {
				...data,
				profilePhoto: profilePhotoUrl,
			};

			console.log(registrationData);
			setLoading(false);

			const response = await axios.post("/api/users/signup", registrationData);
			if (response.status === 200) {
				console.log("User Registered", response);
				dispatch(
					updateUserDetails({
						username: registrationData.username,
						email: registrationData.email,
						profilePhoto: profilePhotoUrl || "",
						designation: registrationData.designation,
					})
				);
				router.push("/login");
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		setButtonDisabled(false);
	}, [buttonDisabled]);

	return (
		<div className="">
			<h3 className="text-h3 font-semibold">Sign Up to Real Estate Innovation Hub</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-6">
				{/* Username */}
				<div>
					<label className="text-body2 text-gray-1 font-light mb-1 dark:text-white">Username</label>
					<input
						type="text"
						{...register("username", { required: "Username is required" })}
						className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px]"
						placeholder="Enter your username"
					/>
					{errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
				</div>

				{/* Email */}
				<div>
					<label className="text-body2 text-gray-1 font-light mb-1 dark:text-white">Email</label>
					<input
						type="email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: "Invalid email address",
							},
						})}
						className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px]"
						placeholder="Enter your email"
					/>
					{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
				</div>

				{/* Designation */}
				<div>
					<label className="text-body2 text-gray-1 font-light mb-1 dark:text-white">Designation</label>
					{/* <select
						{...register("designation", { required: "Designation is required" })}
						className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px]">
						<option value="">Select your designation</option>
						<option value="Developer">Developer</option>
						<option value="Designer">Designer</option>
						<option value="Manager">Manager</option>
						<option value="Other">Other</option>
					</select> */}

					<input
						type="test"
						{...register("designation", {
							required: "designation is required",
						})}
						className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px]"
						placeholder="Enter designation"
					/>
					{errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>}
				</div>

				{/* Profile Photo */}
				<div className="w-full">
					<label className="text-body2 text-gray-1 font-light mb-1 dark:text-white">Profile Photo</label>
					<Controller
						name="profilePhoto"
						control={control}
						render={({ field }) => (
							<div className="flex flex-row justify-between gap-10 w-full">
								<input
									type="file"
									accept="image/*"
									onChange={(e) => {
										const file = e.target.files?.[0] || null;
										field.onChange(file);
										handleProfilePhotoChange(file);
									}}
									className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-[10px] text-body2 text-gray-1 rounded-[10px] px-20 py-[15px] border "
								/>
								{profilePhotoPreview && (
									<div className="relative inline-block">
										<img
											src={profilePhotoPreview}
											alt="Profile Preview"
											className="w-24 h-24 rounded-full object-cover"
										/>
										<button
											onClick={clearPhoto}
											className="absolute top-0 right-0 bg-gray-2 text-white w-6 h-6 p-[2px] rounded-full flex items-center justify-center">
											x
										</button>
									</div>
								)}
							</div>
						)}
					/>
					{errors.profilePhoto && <p className="text-red-500 text-sm mt-1">{errors.profilePhoto.message}</p>}
				</div>

				{/* Password */}
				<div>
					<label className="text-body2 text-gray-1 font-light mb-1 dark:text-white">Password</label>
					<input
						type="password"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 4,
								message: "Password must be at least 6 characters",
							},
						})}
						className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px]"
						placeholder="Enter your password"
					/>
					{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
				</div>

				{/* Submit Button */}
				<div>
					{/* <button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
						Register
					</button> */}
					<CustomButton
						disabled={buttonDisabled}
						type="submit"
						variant="primary"
						loading={loading}>
						Sign Up
					</CustomButton>
				</div>
			</form>
		</div>
	);
};
