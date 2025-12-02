"use client";
import BaseLink from "@/app/components/BaseComponents/BaseLink";
import CheckboxInput from "@/app/components/Shared/form/CheckboxInput";
import InputArea from "@/app/components/Shared/form/InputArea";
import PrimaryButton from "@/app/components/Shared/PrimaryButton";
import AuthLayout from "@/app/components/Themes/KidsTheme/AuthLayout";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const SignupPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { register: signUp } = useAuth();
	const router = useRouter();
	const onSubmit = async (values) => {
		const user = await signUp(values.email, values.password, values.name);
		if (user) {
			// ✅ Go back if user had a previous page, else go home
			if (
				document.referrer &&
				!document.referrer.includes("/login") &&
				!document.referrer.includes("/signup")
			) {
				router.back();
			} else {
				router.push("/");
			}
		}
	};
	return (
		<AuthLayout>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6 w-[75%]">
				<div>
					<h1 className="h2 font-semibold">Sign Up</h1>
					<p className="text-muted font-medium mt-3">
						Already have an account?{" "}
						<BaseLink href="/login" className="text-secondary">
							Sign In
						</BaseLink>
					</p>
				</div>

				<InputArea
					name={"name"}
					label={"Name:"}
					type={"text"}
					register={register}
					placeholder={"Enter your name"}
					errorName={errors.name}
				/>
				<InputArea
					name={"email"}
					label={"Email:"}
					type={"email"}
					register={register}
					placeholder={"Enter your email"}
					errorName={errors.email}
				/>
				<InputArea
					name={"password"}
					label={"Password:"}
					type={"password"}
					register={register}
					placeholder={"Enter your password"}
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
		</AuthLayout>
	);
};

export default SignupPage;
