import { useQuery } from "@tanstack/react-query";
import { Media } from "./media.types";

// API function to fetch all media items
const listMedias = async (): Promise<Media[]> => {
	const response = await fetch("/api/media", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch media items");
	}

	return response.json();
};

// Custom hook for fetching all media items
export const useListMediasQuery = () => {
	return useQuery({
		queryKey: ["media"],
		queryFn: listMedias,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

// API function to fetch media items with filters
const listMediasWithFilters = async (filters?: {
	type?: string;
	limit?: number;
	offset?: number;
}): Promise<Media[]> => {
	const params = new URLSearchParams();
	
	if (filters?.type) {
		params.append("type", filters.type);
	}
	if (filters?.limit) {
		params.append("limit", filters.limit.toString());
	}
	if (filters?.offset) {
		params.append("offset", filters.offset.toString());
	}

	const response = await fetch(`/api/media?${params.toString()}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch media items");
	}

	return response.json();
};

// Custom hook for fetching media items with filters
export const useListMediasWithFiltersQuery = (filters?: {
	type?: string;
	limit?: number;
	offset?: number;
}) => {
	return useQuery({
		queryKey: ["media", filters],
		queryFn: () => listMediasWithFilters(filters),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};
