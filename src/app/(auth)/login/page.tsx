import Link from "next/link";
import { LoginForm } from "./login-form";
import Image from "next/image";
import { ModeToggle } from "@/app/components/theme-toggle/theme-toogle";

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
				<p className="text-subtitle2 font-light text-right m-[45px]">
					have an account?
					<Link
						href={"/register"}
						className="font-regular text-primary-lightGreen1">
						{" "}
						Sign up!
					</Link>
				</p>
				<div className="w-full flex justify-center items-center flex-col max-w-[340px] gap-[45px] mx-auto mt-[45px]">
					<LoginForm />
				</div>
			</div>

			<div className="hidden">
				<ModeToggle />
			</div>
		</div>
	);
}
