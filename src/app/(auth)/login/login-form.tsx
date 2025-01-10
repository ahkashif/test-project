"use client";

import { useState, useEffect } from "react";
import CustomButton from "../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/libs/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { updateUserDetails } from "@/app/libs/store/slices/userDetailsSlice";

export function LoginForm() {
	const userDetails = useSelector((state: RootState) => state.userDetails);
	const router = useRouter();
	const dispatch = useDispatch();

	const [user, setUser] = useState({
		email: userDetails.email || "",
		password: "",
	});
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fromError, setFormError] = useState("");

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	const handleLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/login", user);
			if (response.status === 200) {
				dispatch(
					updateUserDetails({
						username: response.data.userDetails.userName,
						email: response.data.userDetails.email,
						profilePhoto: response.data.userDetails.profilePhoto,
						designation: response.data.userDetails.designation,
					})
				);
				router.push("/dashboard");
			} else {
				setFormError(response.statusText);
			}
		} catch (error) {
			setLoading(false);
			console.log("Error Occured", error);
		}
	};

	return (
		<>
			<h3 className="text-h3 font-semibold ">Log in to Real Estate Innovation Hub</h3>
			<div className="flex max-w-[340px] flex-col gap-20">
				<div className="flex flex-col">
					<label
						className="text-body2 text-gray-1 font-light mb-1 dark:text-white"
						htmlFor="email">
						Email Address
					</label>
					<input
						id="email"
						name="email"
						placeholder="username@mail.com"
						className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px]"
						onChange={(e) => setUser({ ...user, email: e.target.value })}
						value={user.email}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label
						className="text-body2 text-gray-1 font-light mb-1 dark:text-white"
						htmlFor="password">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						placeholder=""
						className="text-body2 text-gray-1 rounded-[10px] border border-divider px-20 py-[15px] min-w-[340px]"
						onChange={(e) => setUser({ ...user, password: e.target.value })}
						value={user.password}
					/>
					<div className="text-underlineLink2 underline text-right">Forget Password?</div>
				</div>

				{fromError && <p className="text-body3 font-regular text-red-600">{fromError}</p>}

				<CustomButton
					variant="primary"
					disabled={buttonDisabled}
					loading={loading}
					onClick={handleLogin}>
					Login
				</CustomButton>
			</div>
		</>
	);
}
