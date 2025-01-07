import mongoose from "mongoose";

const Step1Schema = new mongoose.Schema({
	owner: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
	startDate: { type: String, required: true },
	endDate: { type: String, required: true },
	stage: { type: String, required: true },
	objective: { type: String, required: true },
	location: { type: String, required: true },
	funding: { type: String, required: true },
	budgetCurrency: { type: String, required: true },
	estimatedBudget: { type: mongoose.Schema.Types.Mixed, required: true }, // Can be number or string
	image: { type: String, default: null }, // Base64 string
	documents: [{ name: String, size: Number }], // File metadata
});

const Step2Schema = new mongoose.Schema({
	companyPortfolio: { type: String, required: true },
	sector: { type: String, required: true },
	technologySolution: { type: String, required: true },
	technologySolutionProvider: { type: String, required: true },
	expert: { type: String, required: true },
});

const Step3Schema = new mongoose.Schema({
	planningPhase: { type: String, required: true },
	plotingPhase: { type: String, required: true },
	assessmentPhase: { type: String, required: true },
	scalingPhase: { type: String, required: true },
});

const PilotFormSchema = new mongoose.Schema({
	step1: { type: Step1Schema, required: true },
	step2: { type: Step2Schema, required: true },
	step3: { type: Step3Schema, required: true },
});

const PilotForm = mongoose.models.pilotData || mongoose.model("pilotData", PilotFormSchema);

export default PilotForm;
