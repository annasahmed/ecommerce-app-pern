"use client";

import CheckboxInput from "@/app/components/Shared/form/CheckboxInput";
import InputArea from "@/app/components/Shared/form/InputArea";
import PrimaryButton from "@/app/components/Shared/PrimaryButton";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function OtpForm({ onSuccess, switchToLogin }) {
	const [isOtpVerification, setIsOtpVerification] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { register: signUp, sendOtp } = useAuth();
	const router = useRouter();

	const onSubmit = async (values) => {
		if (isOtpVerification) {
			await sendOtp(values.email, values.name);
		} else {
			const user = await signUp(values.email, values.password, values.name);
			if (user) {
				onSuccess?.();
				router.push("/");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<div>
				<h1 className="h2 font-semibold">Sign Up</h1>
				<p className="text-muted font-medium mt-3">
					Already have an account?{" "}
					<button
						type="button"
						onClick={switchToLogin}
						className="text-secondary font-medium">
						Sign In
					</button>
				</p>
			</div>

			<InputArea
				name="name"
				label="Name:"
				register={register}
				placeholder="Enter your name"
				errorName={errors.name}
			/>

			<InputArea
				name="email"
				label="Email:"
				type="email"
				register={register}
				placeholder="Enter your email"
				errorName={errors.email}
			/>

			<InputArea
				name="password"
				label="Password:"
				type="password"
				register={register}
				placeholder="Enter your password"
				errorName={errors.password}
			/>

			<CheckboxInput
				name="terms"
				label="I agree with Privacy Policy and Terms of Use"
				register={register}
				errorName={errors.terms}
			/>

			<PrimaryButton className="w-full">Sign Up</PrimaryButton>
		</form>
	);
}
