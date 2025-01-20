// store/storeProvider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./libs/store/store";

const makeStore = store();

export default function StoreProvider({ children }: { children: React.ReactNode }) {
	return <Provider store={makeStore}>{children}</Provider>;
}
