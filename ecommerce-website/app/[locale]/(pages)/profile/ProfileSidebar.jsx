import React from "react";

const ProfileSidebar = ({ user, menuItems, activeTab, setActiveTab }) => {
	return (
		<div className="lg:w-64 flex-shrink-0">
			<div className="bg-white rounded-lg border sticky top-48">
				<div className="p-4 border-b">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-semibold text-lg">
							{user.name.charAt(0)}
						</div>
						<div>
							<div className="font-medium">
								Hello, {user.name.split(" ")[0]}
							</div>
							<div className="text-sm text-gray-500">Orders & Account</div>
						</div>
					</div>
				</div>

				<nav className="p-2">
					{menuItems.map((item) => {
						const Icon = item.icon;
						const isActive =
							activeTab === item.id ||
							(item.id === "orders" && activeTab.includes("orders"));

						return (
							<div key={item.id}>
								<button
									onClick={() =>
										setActiveTab(item.id === "orders" ? "all-orders" : item.id)
									}
									className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
										isActive
											? "bg-secondary/20 text-secondary"
											: "text-gray-700 hover:bg-gray-50"
									}`}>
									<Icon className="w-5 h-5" />
									<span className="flex-1 text-left text-sm">{item.label}</span>
								</button>
							</div>
						);
					})}
				</nav>
			</div>
		</div>
	);
};

export default ProfileSidebar;
