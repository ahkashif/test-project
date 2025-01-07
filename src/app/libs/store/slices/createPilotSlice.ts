import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Step1Data {
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
	documents: File[]; // Adjust this based on your requirements
	_id?: string;
}

export interface Step2Data {
	companyPortfolio: string;
	sector: string;
	technologySolution: string;
	technologySolutionProvider: string;
	expert: string;
}

export interface Step3Data {
	planningPhase: string;
	plotingPhase: string;
	assessmentPhase: string;
	scalingPhase: string;
}

export interface FormState {
	step1: Step1Data;
	step2: Step2Data;
	step3: Step3Data;
}

export interface PilotFormState {
	forms: FormState[]; // Store an array of FormState
}

const initialState: PilotFormState = {
	forms: [],
};

const pilotFormSlice = createSlice({
	name: "pilotForm",
	initialState,
	reducers: {
		/**
		 * Initialize the state with API data
		 */
		initializeFormData(state, action: PayloadAction<FormState[]>) {
			state.forms = action.payload; // Replace the current forms with the payload
		},
		/**
		 * Update a specific form in the list
		 */
		updateFormData(
			state,
			action: PayloadAction<{ step: keyof FormState; data: Partial<Step1Data | Step2Data | Step3Data> }>
		) {
			const { step, data } = action.payload;
			const lastIndex = state.forms.length - 1;

			if (lastIndex >= 0 && state.forms[lastIndex]) {
				// Ensure the form at the last index exists and update the specified step
				Object.assign(state.forms[lastIndex][step], data);
			} else {
				const defaultStep1 = {
					owner: "",
					name: "",
					description: "",
					startDate: "",
					endDate: "",
					stage: "",
					objective: "",
					location: "",
					funding: "",
					budgetCurrency: "",
					estimatedBudget: "",
					image: "",
					documents: [],
				};

				const defaultStep2 = {
					companyPortfolio: "",
					sector: "",
					technologySolution: "",
					technologySolutionProvider: "",
					expert: "",
				};

				const defaultStep3 = {
					planningPhase: "",
					plotingPhase: "",
					assessmentPhase: "",
					scalingPhase: "",
				};
				// Create a new form if none exists or the last index is invalid
				const newForm: FormState = {
					step1: step === "step1" ? ({ ...data } as Step1Data) : defaultStep1,
					step2: step === "step2" ? ({ ...data } as Step2Data) : defaultStep2,
					step3: step === "step3" ? ({ ...data } as Step3Data) : defaultStep3,
				};
				state.forms.push(newForm);
			}
		},

		/**
		 * Reset a specific form by index
		 */
		resetFormByIndex(state, action: PayloadAction<number>) {
			const index = action.payload;
			if (state.forms[index]) {
				state.forms[index] = { ...initialState.forms[0] }; // Reset to a blank form
			}
		},
		/**
		 * Add a new form
		 */
		addForm(state, action: PayloadAction<FormState>) {
			state.forms.push(action.payload);
		},
		/**
		 * Remove a form by index
		 */
		removeForm(state, action: PayloadAction<number>) {
			const index = action.payload;
			state.forms.splice(index, 1);
		},
	},
});

export const { initializeFormData, updateFormData, resetFormByIndex, addForm, removeForm } = pilotFormSlice.actions;

export default pilotFormSlice.reducer;
