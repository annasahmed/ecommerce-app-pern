"use client";

import Layout from "@/app/components/Shared/layout/Layout";
import { useAuth } from "@/app/providers/AuthProvider";
import { useEffect, useState } from "react";

export default function EditProfilePage() {
	const { user } = useAuth();
	const [form, setForm] = useState({
		name: user?.name || "",
		phone: user?.phone || "",
	});
	// const [loading, setLoading] = useState(true);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await fetch("/api/update-profile", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(form),
		});
		alert("Profile updated");
	};

	// if (loading) return <p className="p-6">Loading...</p>;

	return (
		<Layout>
			<div className="max-w-md mx-auto p-6">
				<h1 className="text-xl font-semibold mb-6">Edit Profile</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						name="first_name"
						value={form.first_name}
						onChange={handleChange}
						className="input"
						placeholder="First name"
					/>

					<input
						name="last_name"
						value={form.last_name}
						onChange={handleChange}
						className="input"
						placeholder="Last name"
					/>

					<input
						name="phone"
						value={form.phone}
						onChange={handleChange}
						className="input"
						placeholder="Phone number"
					/>

					<button className="btn-primary w-full">Save Changes</button>
				</form>
			</div>
		</Layout>
	);
}
