import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetailsState {
	username: string;
	email: string;
	profilePhoto: string;
	designation: string;
}

const initialState: UserDetailsState = { username: "", email: "", profilePhoto: "", designation: "" };

const userDetailsSlice = createSlice({
	name: "userDetails",
	initialState,
	reducers: {
		updateUserDetails: (state, action: PayloadAction<UserDetailsState>) => {
			state.username = action.payload.username;
			state.email = action.payload.email;
			state.profilePhoto = action.payload.profilePhoto;
			state.designation = action.payload.designation;
		},
	},
});

export const { updateUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
