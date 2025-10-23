import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePostInput, PostResponse } from "./post.types";

// API function to create a post
const createPost = async (postData: CreatePostInput): Promise<PostResponse[]> => {
	// For each selected account, we'll create a post
	const posts = await Promise.all(
		postData.selectedAccounts.map(async (accountId) => {
			// Create FormData for file uploads
			const formData = new FormData();
			
			// Add basic post data
			formData.append("content", postData.content);
			formData.append("postType", postData.postType);
			formData.append("accountId", accountId);
			formData.append("isScheduled", postData.isScheduled.toString());
			
			// Add custom caption if enabled for this account
			if (postData.useCustomCaptions && postData.customCaptions?.[accountId]) {
				formData.append("content", postData.customCaptions[accountId]);
			}
			
			// Add schedule date and time if scheduled
			if (postData.isScheduled && postData.scheduleDate && postData.scheduleTime) {
				formData.append("scheduleDate", postData.scheduleDate);
				formData.append("scheduleTime", postData.scheduleTime);
			}
			
			// Add media files if present
			if (postData.mediaFiles && postData.mediaFiles.length > 0) {
				postData.mediaFiles.forEach((file, index) => {
					formData.append(`mediaFile_${index}`, file);
				});
			}
			
			// Add cover image if present (for video posts)
			if (postData.coverImage) {
				formData.append("coverImage", postData.coverImage);
			}
			
			// Make API call - adjust the endpoint as needed
			const response = await fetch("/api/posts", {
				method: "POST",
				body: formData,
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
	
	return useMutation({
		mutationFn: createPost,
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
