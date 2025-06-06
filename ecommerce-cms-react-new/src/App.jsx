import { lazy } from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
// import AccessibleNavigationAnnouncer from "@/components/AccessibleNavigationAnnouncer";
// import PrivateRoute from "@/components/login/PrivateRoute";
// import AccessibleNavigationAnnouncer from "@/components/AccessibleNavigationAnnouncer";
// const Layout = lazy(() => import("@/layout/Layout"));
const Login = lazy(() => import("@/pages/Login"));
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
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	);
};

export default App;
