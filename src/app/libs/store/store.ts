import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import pagePropertiesSlice from "./slices/pagePropertiesSlice";
import userDetails from "./slices/userDetailsSlice";
import pilotFormSlice from "./slices/createPilotSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			pageProperties: pagePropertiesSlice,
			counter: counterReducer,
			userDetails: userDetails,
			pilotForm: pilotFormSlice,
		},
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
