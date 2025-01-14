// eventsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types.ts
export interface EventData {
	eventData: string;
	eventName: string;
	eventTagLine: string;
	eventDescription: string;
	eventAudience: number;
}

export interface EventsState {
	events: EventData[];
}

// Initial state
const initialState: EventsState = {
	events: [],
};

// Create the slice
const eventsSlice = createSlice({
	name: "events",
	initialState,
	reducers: {
		setEvents: (state, action: PayloadAction<EventData[]>) => {
			state.events = action.payload;
		},
		addEvent: (state, action: PayloadAction<EventData>) => {
			state.events.push(action.payload);
		},
		removeEvent: (state, action: PayloadAction<string>) => {
			state.events = state.events.filter((event) => event.eventName !== action.payload);
		},
	},
});

// Export actions and reducer
export const { setEvents, addEvent, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
