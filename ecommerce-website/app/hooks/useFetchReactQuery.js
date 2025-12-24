import { useQuery } from "@tanstack/react-query";

/**
 * Custom React Query fetch hook
 * @param {Function} fetchDataFunction - The async function that fetches data
 * @param {string|Array} queryKey - Unique query key
 * @param {Object} options - Extra options (enabled, retry, staleTime, etc.)
 */

export const useFetchReactQuery = (
	fetctDataFunction,
	queryKey,
	options = {},
) => {
	return useQuery({
		queryKey: [queryKey],
		queryFn: fetctDataFunction,
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
		refetchOnWindowFocus: false,
		retry: false,
		...options,
		// enabled: false,
	});
};
