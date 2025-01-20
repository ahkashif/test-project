import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import pagePropertiesSlice from "./slices/pagePropertiesSlice";
import userDetails from "./slices/userDetailsSlice";
// import pilotFormSlice from "./slices/createPilotSlice";
import expertsDataSlice from "./slices/expertsDataSlice";
import eventsSlice from "./slices/eventsDataSlice";
import newPilotFormSlice from "./slices/pilotFormSlice";
import techFormSlice from "./slices/techFormSlice";

export const store = () => {
	return configureStore({
		reducer: {
			pageProperties: pagePropertiesSlice,
			counter: counterReducer,
			userDetails: userDetails,
			experts: expertsDataSlice,
			events: eventsSlice,
			newPilotForm: newPilotFormSlice,
			techFormSlice: techFormSlice,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					// Ignore the `attachments` field
					ignoredPaths: ["pilotForm.step1.attachments"],
					ignoredActions: ["pilotForm/addAttachment"],
				},
			}),
	});
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
