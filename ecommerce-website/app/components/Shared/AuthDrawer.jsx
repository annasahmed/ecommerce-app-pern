"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import BaseDrawer from "../BaseComponents/BaseDrawer";

export default function AuthDrawer({ open, setOpen, defaultView = "login" }) {
	const [view, setView] = useState(defaultView);
	const onClose = () => {
		setOpen(false);
	};

	return (
		<BaseDrawer
			open={open}
			onClose={onClose}
			title={view === "login" ? "Sign In" : "Sign Up"}
			side="right"
			width="w-full sm:w-[420px]">
			<div className="px-1">
				{view === "login" ? (
					<LoginForm
						onSuccess={onClose}
						switchToSignup={() => setView("signup")}
					/>
				) : (
					<SignupForm
						onSuccess={onClose}
						switchToLogin={() => setView("login")}
					/>
				)}
			</div>
		</BaseDrawer>
	);
}
