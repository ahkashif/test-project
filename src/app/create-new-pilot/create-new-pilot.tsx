// "use client";
// import Image from "next/image";
// import React, { useRef, useState } from "react";
// import StepIndicator from "../components/step-indicator/step-indicator";
// import MultiStepForm from "./pilot-form";

// const STEPS = ["Pilot info", "Contributors", "Objectives"];

// function CreateNewPilot() {
// 	const [currentStep, setCurrentStep] = useState(0);

// 	const step1Ref = useRef<HTMLButtonElement>(null);
// 	const step2Ref = useRef<HTMLButtonElement>(null);
// 	const step3Ref = useRef<HTMLButtonElement>(null);

// 	const handleForm = () => {
// 		if (currentStep === 0 && step1Ref.current) {
// 			step1Ref.current.click();
// 		} else if (currentStep === 1 && step2Ref.current) {
// 			step2Ref.current.click();
// 		} else if (currentStep === 2 && step3Ref.current) {
// 			step3Ref.current.click();
// 		}
// 	};

// 	return (
// 		<div className="flex flex-row w-full">
// 			<aside className="w-[12%] min-h-[100vh] border-r border-divider">
// 				<div className="border-b border-divider w-full p-20 max-h-[80px]">
// 					<Image
// 						src={"/pif-logo-large.svg"}
// 						alt={"pif-logo"}
// 						width={90}
// 						height={40}
// 					/>
// 				</div>

// 				<div>
// 					<StepIndicator
// 						steps={STEPS}
// 						currentStep={currentStep}
// 					/>
// 				</div>
// 			</aside>
// 			<main className="w-[88%] flex flex-col min-h-screen ">
// 				<header className="h-[80x] max-h-[80px] p-30 border-b border-divider ">
// 					<div className="text-subtitle1 font-semibold ">Creating new pilot</div>
// 				</header>

// 				<section className="flex-grow p-20 bg-background2">
// 					<div className="border border-divider rounded-[10px] p-[30px] bg-white">
// 						<MultiStepForm
// 							userOnStep={currentStep}
// 							step1Ref={step1Ref}
// 							step2Ref={step2Ref}
// 							step3Ref={step3Ref}
// 							onStepChange={setCurrentStep}
// 						/>
// 					</div>
// 				</section>

// 				<footer className="flex flex-row justify-between px-30 py-20 border-t border-divider">
// 					<div className="flex flex-row gap-20">
// 						{currentStep > 0 && (
// 							<button
// 								className={`px-20 py-[13px] border border-secondary-brown text-secondary-brown rounded-full text-button font-regular flex gap-10 items-center`}
// 								onClick={() => setCurrentStep(currentStep - 1)}>
// 								Back
// 							</button>
// 						)}

// 						<button
// 							className={`px-20 py-[13px] border border-secondary-brown text-secondary-brown rounded-full text-button font-regular flex gap-10 items-center`}
// 							onClick={handleForm}>
// 							Cancel
// 						</button>
// 					</div>
// 					<div className="flex flex-row gap-20">
// 						<button
// 							className={`px-20 py-[13px] border border-secondary-brown text-secondary-brown rounded-full text-button font-regular flex gap-10 items-center`}
// 							onClick={handleForm}>
// 							Save & Return
// 						</button>

// 						{currentStep === 2 ? (
// 							<button
// 								className={`px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}
// 								onClick={handleForm}>
// 								Submit
// 							</button>
// 						) : (
// 							<button
// 								type="submit"
// 								className={`px-20 py-[13px] border border-secondary-brown bg-secondary-brown text-white rounded-full text-button font-regular`}
// 								onClick={handleForm}>
// 								Next
// 							</button>
// 						)}
// 					</div>
// 				</footer>
// 			</main>
// 		</div>
// 	);
// }

// export default CreateNewPilot;
