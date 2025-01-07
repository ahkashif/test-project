import { ModeToggle } from "@/app/components/theme-toggle/theme-toogle";
import { SignupForm } from "./signup-form";
import Image from "next/image";

export default function Login() {
	return (
		<div className="flex flex-row min-h-[100dvh]">
			<div className="max-w-[620px] relative  w-full">
				<Image
					src="/login-image.png"
					alt="login-image"
					width={610}
					height={900}
					fill={false}
					className="h-full w-full max-w-[620px]"
					priority={true}
				/>
				<div className="absolute top-0 w-full h-full bg-cover bg-no-repeat bg-center bg-custom-gradient">
					<Image
						src="/pif-logo-dark.svg"
						alt="event"
						className="relative top-[65px] left-[75px]"
						loading="lazy"
						width={250}
						height={112}
						fill={false}
					/>
				</div>
			</div>
			<div className="w-full flex flex-col gap-[40px]">
				<div className="w-full flex justify-center items-center flex-col max-w-[340px] gap-[45px] m-auto ">
					<SignupForm />
				</div>
			</div>

			<div className="hidden">
				<ModeToggle />
			</div>
		</div>
	);
}
