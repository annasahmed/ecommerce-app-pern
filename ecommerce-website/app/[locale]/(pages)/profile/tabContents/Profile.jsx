import React from "react";

const Profile = ({ user }) => {
	return (
		<>
			<div className="bg-white rounded-lg p-6">
				<h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="text-sm text-gray-500 mb-1 block">Name</label>
						<p className="font-medium text-lg">{user.name}</p>
					</div>
					<div>
						<label className="text-sm text-gray-500 mb-1 block">Email</label>
						<p className="font-medium text-lg">{user.email}</p>
					</div>
					<div>
						<label className="text-sm text-gray-500 mb-1 block">Phone</label>
						<p className="font-medium text-lg">{user.phone}</p>
					</div>
				</div>
				<button className="mt-6 bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors">
					Edit Profile
				</button>
			</div>
			<div className="space-y-4">
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
			</div>
		</>
	);
};

export default Profile;
