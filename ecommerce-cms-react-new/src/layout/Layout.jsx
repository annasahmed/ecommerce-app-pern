import { routes } from "@/routes";
import React, { useContext, useEffect, Suspense, lazy, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";

// import Main from "@/layout/Main";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
// import Sidebar from "@/components/sidebar/Sidebar";
// import { SidebarContext } from "@/context/SidebarContext";
// import ThemeSuspense from "@/components/theme/ThemeSuspense";

// const Page404 = lazy(() => import("@/pages/404"));

const Layout = () => {
	// const { isSidebarOpen, closeSidebar, navBar } = useContext(SidebarContext);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const location = useLocation();
	const isOnline = navigator.onLine;

	// useEffect(() => {
	// 	closeSidebar();
	// }, [location]);

	return (
		<>
			{!isOnline && (
				<div className="flex justify-center bg-customRed-600 text-customWhite">
					You are in offline mode!
				</div>
			)}
			<div
				className={`flex h-screen bg-customGray-50 dark:bg-customGray-900 ${
					isSidebarOpen && "overflow-hidden"
					// ""
				}`}>
				{/* {navBar && <Sidebar />} */}
				<Sidebar />
				<div className="flex flex-col flex-1 w-full">
					<Header />
					{/* <Main> */}
					{/* <Suspense fallback={<ThemeSuspense />}> */}
					<Routes>
						{routes.map((route, i) =>
							route.element ? (
								<Route key={i} path={route.path} element={<route.element />} />
							) : null,
						)}
						<Route path="/" element={<Navigate to="/dashboard" replace />} />
						{/* <Route path="*" element={<Page404 />} /> */}
					</Routes>
					{/* </Suspense> */}
					{/* </Main> */}
				</div>
			</div>
		</>
	);
};

export default Layout;
