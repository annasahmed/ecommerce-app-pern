import React, { useState } from "react";
import { NavLink, Route } from "react-router";
import { useTranslation } from "react-i18next";
import {
	IoChevronDownOutline,
	IoChevronForwardOutline,
	IoRemoveSharp,
} from "react-icons/io5";
import { useLocation } from "react-router";

const SidebarSubMenu = ({ route }) => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const location = useLocation();

	return (
		<>
			<li className="relative px-6 py-3" key={route.name}>
				<button
					className="inline-flex items-center justify-between focus:outline-none w-full text-sm font-semibold transition-colors duration-150 hover:text-customTeal-600 dark:hover:text-customGray-200"
					onClick={() => setOpen(!open)}
					aria-haspopup="true">
					<span className="inline-flex items-center">
						<route.icon className="w-5 h-5" aria-hidden="true" />
						<span className="ml-4 mt-1">{t(`${route.name}`)}</span>
						<span className="pl-4 mt-1">
							{open ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
						</span>
					</span>
					{/* <DropdownIcon className="w-4 h-4" aria-hidden="true" /> */}
				</button>
				{open && (
					<ul
						className="p-2 overflow-hidden text-sm font-medium text-customGray-500 rounded-md dark:text-customGray-400 dark:bg-customGray-900"
						aria-label="submenu">
						{route.routes.map((child, i) => {
							const isActive = location.pathname === child.path;

							return (
								<li key={i + 1} className="relative">
									{child?.outside ? (
										<a
											href={import.meta.env.VITE_APP_STORE_DOMAIN}
											target="_blank"
											rel="noreferrer"
											className="flex items-center font-serif py-1 text-sm text-customGray-600 hover:text-customTeal-600 cursor-pointer">
											<span className="text-xs text-customGray-500 pr-1">
												<IoRemoveSharp />
											</span>
											<span className="text-customGray-500 hover:text-customTeal-600 dark:hover:text-customGray-200">
												{t(`${child.name}`)}
											</span>
										</a>
									) : (
										<NavLink
											to={child.path}
											rel="noreferrer"
											className={({ isActive }) =>
												`flex items-center font-serif py-1 text-sm text-customGray-600 hover:text-customTeal-600 cursor-pointer ${
													isActive ? "text-customTeal-600" : ""
												}`
											}>
											{isActive && (
												<span
													className="absolute inset-y-0 left-0 w-1 bg-customTeal-600 rounded-tr-lg rounded-br-lg"
													aria-hidden="true"></span>
											)}
											<span className="text-xs text-customGray-500 pr-1">
												<IoRemoveSharp />
											</span>
											<span className="text-customGray-500 hover:text-customTeal-600 dark:hover:text-customGray-200">
												{t(`${child.name}`)}
											</span>
										</NavLink>
									)}
								</li>
							);
						})}
					</ul>
				)}
			</li>
		</>
	);
};

export default SidebarSubMenu;
