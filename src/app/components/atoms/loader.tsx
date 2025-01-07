import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../libs/store/store";

const GlobalLoading: React.FC = () => {
	const isLoading = useSelector((state: RootState) => state.pageProperties.loading);

	if (!isLoading) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
		</div>
	);
};

export default GlobalLoading;
