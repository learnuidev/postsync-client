import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePostInput, PostResponse } from "./post.types";
import { useCreateMediaMutation } from "./create-media-mutation";
import { CreateMediaInput } from "./media.types";

// API function to upload media files
const uploadMediaFiles = async (
	mediaFiles: File[],
	createMediaMutation: ReturnType<typeof useCreateMediaMutation>["mutateAsync"]
): Promise<string[]> => {
	const mediaIds: string[] = [];
	
	for (const file of mediaFiles) {
		const mediaType = file.type.startsWith("image/") ? "image" : 
						 file.type.startsWith("video/") ? "video" : 
						 file.type.startsWith("audio/") ? "audio" : "image";
		
		const mediaData: CreateMediaInput = {
			file,
			type: mediaType,
			generateThumbnail: mediaType === "video",
		};
		
		const mediaResponse = await createMediaMutation(mediaData);
		mediaIds.push(mediaResponse.id);
	}
	
	return mediaIds;
};

// API function to create a post
const createPost = async (
	postData: CreatePostInput,
	createMediaMutation: ReturnType<typeof useCreateMediaMutation>["mutateAsync"]
): Promise<PostResponse[]> => {
	// Upload media files first if they exist
	let mediaIds: string[] = [];
	let coverImageId: string | undefined;
	
	// Upload media files
	if (postData.mediaFiles && postData.mediaFiles.length > 0) {
		mediaIds = await uploadMediaFiles(postData.mediaFiles, createMediaMutation);
	}
	
	// Upload cover image if present (for video posts)
	if (postData.coverImage) {
		const coverImageData: CreateMediaInput = {
			file: postData.coverImage,
			type: "image",
			generateThumbnail: false,
		};
		
		const coverMediaResponse = await createMediaMutation(coverImageData);
		coverImageId = coverMediaResponse.id;
	}
	
	// For each selected account, we'll create a post
	const posts = await Promise.all(
		postData.selectedAccounts.map(async (accountId) => {
			// Create post data object
			const postPayload = {
				content: postData.useCustomCaptions && postData.customCaptions?.[accountId] 
					? postData.customCaptions[accountId] 
					: postData.content,
				postType: postData.postType,
				accountId,
				isScheduled: postData.isScheduled,
				scheduleDate: postData.isScheduled ? postData.scheduleDate : undefined,
				scheduleTime: postData.isScheduled ? postData.scheduleTime : undefined,
				mediaIds: mediaIds.length > 0 ? mediaIds : undefined,
				coverImageId,
			};
			
			// Make API call - adjust the endpoint as needed
			const response = await fetch("/api/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(postPayload),
			});
			
			if (!response.ok) {
				throw new Error(`Failed to create post for account ${accountId}`);
			}
			
			return response.json();
		})
	);
	
	return posts;
};

// Custom hook for creating posts
export const useCreatePostMutation = () => {
	const queryClient = useQueryClient();
	const createMediaMutation = useCreateMediaMutation();
	
	return useMutation({
		mutationFn: (postData: CreatePostInput) => 
			createPost(postData, createMediaMutation.mutateAsync),
		onSuccess: (data) => {
			// Invalidate relevant queries
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			console.log("Posts created successfully:", data);
		},
		onError: (error) => {
			console.error("Error creating posts:", error);
		},
	});
};
