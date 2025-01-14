import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Expert {
	name: string;
	badge: string;
	title: string;
	company: string;
	yearsOfExperience: string;
	sector: string;
	profileImage: string;
}

interface ExpertState {
	experts: Expert[];
	loading: boolean;
	error: string | null;
}

const initialState: ExpertState = {
	experts: [],
	loading: false,
	error: null,
};

const expertSlice = createSlice({
	name: "experts",
	initialState,
	reducers: {
		fetchExpertsStart(state) {
			state.loading = true;
			state.error = null;
		},
		fetchExpertsSuccess(state, action: PayloadAction<Expert[]>) {
			state.loading = false;
			state.experts = action.payload;
		},
		fetchExpertsFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { fetchExpertsStart, fetchExpertsSuccess, fetchExpertsFailure } = expertSlice.actions;

export default expertSlice.reducer;
