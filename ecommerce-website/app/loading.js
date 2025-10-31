import Loader from "./components/Shared/Loader";

// app/loading.js
export default function Loading() {
	return <Loader />;
	return <div className="p-4 text-center">Loading section...</div>;
	return (
		<div className="min-h-screen flex flex-col">
			{/* Navbar skeleton */}
			<div className="h-16 bg-gray-200 animate-pulse"></div>

			{/* Hero Section skeleton */}
			<div className="flex-1 flex items-center justify-center">
				<div className="w-3/4 h-64 bg-gray-200 animate-pulse rounded-lg"></div>
			</div>

			{/* Footer skeleton */}
			<div className="h-20 bg-gray-200 animate-pulse"></div>
		</div>
	);
}
