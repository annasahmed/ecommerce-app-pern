export const formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

// when sending data to backend change "" to null
export const replaceEmptyWithNull = (value) => {
	if (value === "") return null;

	if (Array.isArray(value)) {
		return value.map(replaceEmptyWithNull);
	}

	if (typeof value === "object" && value !== null) {
		return Object.fromEntries(
			Object.entries(value).map(([k, v]) => [k, replaceEmptyWithNull(v)]),
		);
	}

	return value;
};
