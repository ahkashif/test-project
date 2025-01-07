import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PagePropertiesState {
	pageTheme: string;
	loading: boolean;
}

const initialState: PagePropertiesState = {
	pageTheme: "light",
	loading: false,
};

const pagePropertiesSlice = createSlice({
	name: "pageProperties",
	initialState,
	reducers: {
		changeTheme: (state, action: PayloadAction<{ pageTheme: string }>) => {
			state.pageTheme = action.payload.pageTheme;
		},
		setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
			state.loading = action.payload.loading;
		},
	},
});

export const { changeTheme, setLoading } = pagePropertiesSlice.actions;
export default pagePropertiesSlice.reducer;
