import { useQuery } from "@tanstack/react-query";

export const useFetchReactQuery = (fetctDataFunction, queryKey, enabled) => {
	return useQuery({
		queryKey: [queryKey],
		queryFn: fetctDataFunction,
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
		enabled: enabled !== undefined ? enabled : true,
		refetchOnWindowFocus: false,
	});
};
