import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMediaInput, MediaResponse } from "./media.types";

// API function to upload media
const createMedia = async (mediaData: CreateMediaInput): Promise<MediaResponse> => {
	// Create FormData for file upload
	const formData = new FormData();
	
	// Add file and metadata
	formData.append("file", mediaData.file);
	formData.append("type", mediaData.type);
	formData.append("generateThumbnail", mediaData.generateThumbnail.toString());
	
	// Make API call - adjust the endpoint as needed
	const response = await fetch("/api/media", {
		method: "POST",
		body: formData,
	});
	
	if (!response.ok) {
		throw new Error("Failed to upload media");
	}
	
	return response.json();
};

// Custom hook for uploading media
export const useCreateMediaMutation = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: createMedia,
		onSuccess: (data) => {
			// Invalidate relevant queries
			queryClient.invalidateQueries({ queryKey: ["media"] });
			console.log("Media uploaded successfully:", data);
		},
		onError: (error) => {
			console.error("Error uploading media:", error);
		},
	});
};