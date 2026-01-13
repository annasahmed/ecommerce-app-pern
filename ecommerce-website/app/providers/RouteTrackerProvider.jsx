"use client";

import { Suspense } from "react";
import RouteTracker from "../components/RouteTracker";

const RouteTrackerProvider = () => {
	return (
		<Suspense fallback={null}>
			<RouteTracker />
		</Suspense>
	);
};

export default RouteTrackerProvider;
