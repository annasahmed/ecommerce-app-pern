import { useAuth } from "@/app/providers/AuthProvider";
import React, { useEffect, useMemo, useState } from "react";

const Profile = () => {
	const { user, updateUser } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	// Fill form when user loads
	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || "",
				email: user.email || "",
				phone: user.phone || "",
			});
		}
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		console.log(formData, "chkking hanle submit111");

		e.preventDefault();

		try {
			// call your API here
			await updateUser(formData);
			setIsEditing(false);
			// optionally refetch user or update auth state
		} catch (error) {
			console.error("Update failed", error);
		}
	};

	const Comp = useMemo(() => {
		return isEditing ? "form" : "div";
	}, [isEditing]);

	return (
		<>
			<div className="bg-white rounded-lg p-6">
				<h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
				<Comp onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Name */}
						<div>
							<label className="text-sm text-gray-500 mb-1 block">Name</label>
							{isEditing ? (
								<input
									name="name"
									placeholder="enter you name"
									value={formData.name}
									onChange={handleChange}
									className="w-full border rounded-lg px-3 py-2"
								/>
							) : (
								<p className="font-medium text-lg">{user?.name || "-"}</p>
							)}
						</div>

						{/* Email */}
						<div>
							<label className="text-sm text-gray-500 mb-1 block">Email</label>
							{isEditing ? (
								<input
									name="email"
									placeholder="email@gmail.com"
									value={formData.email}
									onChange={handleChange}
									className="w-full border rounded-lg px-3 py-2"
								/>
							) : (
								<p className="font-medium text-lg">{user?.email || "-"}</p>
							)}
						</div>

						{/* Phone */}
						<div>
							<label className="text-sm text-gray-500 mb-1 block">Phone</label>
							{isEditing ? (
								<input
									name="phone"
									placeholder="03330000000"
									value={formData.phone}
									onChange={handleChange}
									className="w-full border rounded-lg px-3 py-2"
								/>
							) : (
								<p className="font-medium text-lg">{user?.phone || "-"}</p>
							)}
						</div>
					</div>

					{/* Buttons */}
					<div className="mt-6 flex gap-3">
						{isEditing ? (
							<>
								<button
									type="submit"
									className="bg-secondary text-white px-6 py-2 rounded-lg">
									Save
								</button>
								<button
									type="button"
									onClick={() => setIsEditing(false)}
									className="border px-6 py-2 rounded-lg">
									Cancel
								</button>
							</>
						) : (
							<button
								type="button"
								onClick={() => setIsEditing(true)}
								className="bg-secondary text-white px-6 py-2 rounded-lg">
								Edit Profile
							</button>
						)}
					</div>
				</Comp>
			</div>
			{/* <div className="space-y-4">
				<div className="bg-white rounded-lg p-6 border-2 border-secondary">
					<div className="flex justify-between items-start mb-4">
						<div>
							<div className="font-semibold text-lg mb-2">Home Address</div>
							<p className="text-gray-600">123 Main Street, Block A</p>
							<p className="text-gray-600">Karachi, Sindh, 75500</p>
							<p className="text-gray-600">Pakistan</p>
							<p className="text-gray-600 mt-2">+92 300 1234567</p>
						</div>
						<span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm">
							Default
						</span>
					</div>
					<div className="flex gap-3">
						<button className="text-secondary hover:text-secondary font-medium">
							Edit
						</button>
						<button className="text-gray-500 hover:text-gray-600 font-medium">
							Delete
						</button>
					</div>
				</div>
				<button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-secondary hover:text-secondary transition-colors">
					+ Add New Address
				</button>
			</div> */}
		</>
	);
};

export default Profile;
