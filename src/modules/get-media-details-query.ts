import { useQuery } from "@tanstack/react-query";
import { Media } from "./media.types";

// API function to fetch a single media item by ID
const getMediaDetails = async (id: string): Promise<Media> => {
	const response = await fetch(`/api/media/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch media details with ID: ${id}`);
	}

	return response.json();
};

// Custom hook for fetching a single media item
export const useGetMediaDetailsQuery = (id: string) => {
	return useQuery({
		queryKey: ["media", id],
		queryFn: () => getMediaDetails(id),
		enabled: !!id, // Only run query if ID is provided
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};
