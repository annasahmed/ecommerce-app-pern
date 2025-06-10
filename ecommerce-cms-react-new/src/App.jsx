import PrivateRoute from "@/routes/PrivateRoute";
import { lazy } from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
// import AccessibleNavigationAnnouncer from "@/components/AccessibleNavigationAnnouncer";
// import PrivateRoute from "@/components/login/PrivateRoute";
// import AccessibleNavigationAnnouncer from "@/components/AccessibleNavigationAnnouncer";
// const Layout = lazy(() => import("@/layout/Layout"));
const Login = lazy(() => import("@/pages/login/Login"));
const Layout = lazy(() => import("@/layout/Layout"));

// const SignUp = lazy(() => import("@/pages/SignUp"));
// const ForgetPassword = lazy(() => import("@/pages/ForgotPassword"));
// const ResetPassword = lazy(() => import("@/pages/ResetPassword"));

const App = () => {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route
					index
					element={
						<p className="text-3xl font-bold text-customTeal-100">home</p>
					}
				/>
				{/* <Route
					path="/dashboard"
					element={
						<p className="text-3xl font-bold text-customTeal-100">dashboard</p>
					}
				/> */}
				<Route path="/login" element={<Login />} />
				{}
				<Route
					path="/*"
					element={
						<PrivateRoute>
							<Layout />
						</PrivateRoute>
					}
				/>
				{/* <Redirect exact from="/" to="/login" /> */}
			</Routes>
		</>
	);
};

export default App;
