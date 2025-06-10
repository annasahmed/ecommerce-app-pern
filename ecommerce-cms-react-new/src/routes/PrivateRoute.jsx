// import { AdminContext } from "@/context/AdminContext";

import { Route } from "react-router";

const PrivateRoute = ({ children }) => {
	// const { state } = useContext(AdminContext);
	// const { adminInfo } = state;

	// console.log(adminInfo, "chkking adminInfo");
	return children;
	return (
		<Route
			path="/new"
			element={
				<p className="text-3xl font-bold text-customTeal-100">dashboard new</p>
			}
		/>
	);

	return (
		<Route
			{...rest}
			element={
				({ location }) => children
				// true ? (
				// ) : (
				// 	// adminInfo?.email ? (
				// 	<Navigate
				// 		to={{
				// 			pathname: "/login",
				// 			state: { from: location },
				// 		}}
				// 	/>
				// )
			}
		/>
	);
};

export default PrivateRoute;
