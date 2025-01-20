"use client";
import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
	selectedOptions: string[]; // Array to store selected checkboxes
}

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const MultipleCheckboxesForm: React.FC = () => {
	const { handleSubmit, setValue, watch } = useForm<FormData>({
		defaultValues: { selectedOptions: [] },
	});

	const selectedOptions = watch("selectedOptions");

	const onSubmit = (data: FormData) => {
		console.log("Selected Options:", data.selectedOptions);
	};

	const handleCheckboxChange = (option: string) => {
		const currentSelection = selectedOptions || [];
		if (currentSelection.includes(option)) {
			setValue(
				"selectedOptions",
				currentSelection.filter((item) => item !== option)
			);
		} else {
			setValue("selectedOptions", [...currentSelection, option]);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4">
			<h2 className="text-lg font-semibold">Select Options</h2>
			{options.map((option) => (
				<label
					key={option}
					className="flex items-center space-x-2 cursor-pointer">
					<input
						type="checkbox"
						value={option}
						checked={selectedOptions.includes(option)}
						onChange={() => handleCheckboxChange(option)}
						className="form-checkbox text-blue-500"
					/>
					<span className="text-gray-800">{option}</span>
				</label>
			))}
			<button
				type="submit"
				className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
				Submit
			</button>
		</form>
	);
};

export default MultipleCheckboxesForm;
