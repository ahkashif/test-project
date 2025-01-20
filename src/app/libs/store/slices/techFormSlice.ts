import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Challenge {
	name: string;
	description: string;
}

export interface TechFormTypesSlice {
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
	currentStage: string;
	technologyId: string;
}

const initialState: TechFormTypesSlice = {
	techName: "",
	techDescription: "",
	techProvider: "",
	owner: "",
	selectedOptions: [],
	sectorOptions: [],
	techSrcOptions: [],
	addedValue: [],
	devCo: "",
	businessChallenge: "",
	challenges: [],
	attachments: "",
	currentStage: "",
	technologyId: "",
};

const techFormSlice = createSlice({
	name: "techForm",
	initialState,
	reducers: {
		updateForm(state, action: PayloadAction<Partial<TechFormTypesSlice>>) {
			return { ...state, ...action.payload };
		},
		resetForm() {
			return initialState;
		},
		addAttachment(state, action: PayloadAction<string>) {
			state.attachments = action.payload;
		},
		addChallenge(state, action: PayloadAction<Challenge>) {
			state.challenges.push(action.payload);
		},
		updateChallenge(state, action: PayloadAction<{ index: number; challenge: Challenge }>) {
			const { index, challenge } = action.payload;
			state.challenges[index] = challenge;
		},
		deleteChallenge(state, action: PayloadAction<number>) {
			state.challenges.splice(action.payload, 1);
		},
		setSelectedOptions(state, action: PayloadAction<string[]>) {
			state.selectedOptions = action.payload;
		},
		setSectorOptions(state, action: PayloadAction<string[]>) {
			state.sectorOptions = action.payload;
		},
		setTechSrcOptions(state, action: PayloadAction<string[]>) {
			state.techSrcOptions = action.payload;
		},
		setAddedValue(state, action: PayloadAction<string[]>) {
			state.addedValue = action.payload;
		},
	},
});

export const {
	updateForm,
	resetForm,
	addAttachment,
	addChallenge,
	updateChallenge,
	deleteChallenge,
	setSelectedOptions,
	setSectorOptions,
	setTechSrcOptions,
	setAddedValue,
} = techFormSlice.actions;
export default techFormSlice.reducer;
