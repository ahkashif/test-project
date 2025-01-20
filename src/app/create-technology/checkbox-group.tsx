import React from "react";

interface CheckboxGroupProps {
	options: string[];
	selectedOptions: string[];
	onChange: (option: string) => void;
	label: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, selectedOptions, onChange, label }) => {
	return (
		<div className="flex flex-col space-y-2">
			<label className="font-medium">{label}</label>
			<div className="flex flex-wrap gap-10">
				{options.map((option) => (
					<label
						key={option}
						className="flex items-center space-x-2 cursor-pointer w-[45%]">
						<input
							type="checkbox"
							value={option}
							checked={selectedOptions.includes(option)}
							onChange={() => onChange(option)}
							className="form-checkbox text-gray-1 hidden peer"
						/>
						<div className="w-[20px] h-[20px] border border-divider rounded bg-white flex items-center justify-center peer-checked:bg-secondary-brown peer-checked:border-secondary-brown">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-[15px] w-[15px] text-white"
								viewBox="0 0 20 20"
								fill="white">
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<span className="text-body2 font-light text-gray-800 pl-10">{option}</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default CheckboxGroup;
