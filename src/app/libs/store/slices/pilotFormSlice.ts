import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Milestone {
	name: string;
	date: string;
}

export interface PilotFormStateSlice {
	pilotName: string;
	description: string;
	objective: string;
	location: string;
	pilotBudgetCurrency: string;
	pilotEstimatedBudget: number | null;
	fundedBy: string[];
	technologySolution: string;
	associatedSector: string[];
	technologyProvider: string;
	devCoLeadingPilot: string;
	pilotLead: string;
	pilotTeam: string;
	attachments: string;
	milestones: Milestone[];
}

const initialState: PilotFormStateSlice = {
	pilotName: "",
	description: "",
	objective: "",
	location: "",
	pilotBudgetCurrency: "",
	pilotEstimatedBudget: null,
	fundedBy: [],
	technologySolution: "",
	associatedSector: [],
	technologyProvider: "",
	devCoLeadingPilot: "",
	pilotLead: "",
	pilotTeam: "",
	attachments: "",
	milestones: [],
};

const newPilotFormSlice = createSlice({
	name: "newPilotForm",
	initialState,
	reducers: {
		updateForm(state, action: PayloadAction<Partial<any>>) {
			return { ...state, ...action.payload };
		},
		resetForm() {
			return initialState;
		},
		addAttachment(state, action: PayloadAction<any>) {
			state.attachments = action.payload;
		},

		setMilestones(state, action: PayloadAction<Milestone[]>) {
			state.milestones = action.payload;
		},
		addMilestone(state, action: PayloadAction<Milestone>) {
			state.milestones.push(action.payload);
		},
		updateMilestone(state, action: PayloadAction<{ index: number; milestone: Milestone }>) {
			const { index, milestone } = action.payload;
			state.milestones[index] = milestone;
		},
		deleteMilestone(state, action: PayloadAction<number>) {
			state.milestones.splice(action.payload, 1);
		},
	},
});

export const { updateForm, resetForm, addAttachment, addMilestone, setMilestones, updateMilestone, deleteMilestone } =
	newPilotFormSlice.actions;
export default newPilotFormSlice.reducer;
