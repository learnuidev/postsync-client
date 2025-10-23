import { z } from "zod";

// Platform types
export type Platform =
	| "facebook"
	| "linkedin"
	| "threads"
	| "twitter"
	| "tiktok"
	| "youtube";

// Post types
export type PostType = "text" | "video" | "image";

// Social account interface
export interface SocialAccount {
	id: string;
	name: string;
	platform: Platform;
	avatar?: string;
}

// Account group interface
export interface AccountGroup {
	id: string;
	name: string;
	accountIds: string[];
	createdAt: string;
}

// Base post schema
export const PostSchema = z.object({
	content: z.string().min(1, "Content is required"),
	postType: z.enum(["text", "video", "image"]),
	selectedAccounts: z.array(z.string()).min(1, "At least one account must be selected"),
	customCaptions: z.record(z.string()).optional(),
	useCustomCaptions: z.boolean().default(false),
	isScheduled: z.boolean().default(false),
	scheduleDate: z.string().optional(),
	scheduleTime: z.string().optional(),
	mediaIds: z.array(z.string()).optional(),
	coverImageId: z.string().optional(),
});

// Create post input schema
export const CreatePostInputSchema = PostSchema.extend({
	// Additional fields for creation
	mediaFiles: z.array(z.instanceof(File)).optional(),
	coverImage: z.instanceof(File).optional(),
});

// Post response schema
export const PostResponseSchema = z.object({
	id: z.string(),
	content: z.string(),
	postType: z.enum(["text", "video", "image"]),
	platform: z.enum(["facebook", "linkedin", "threads", "twitter", "tiktok", "youtube"]),
	accountId: z.string(),
	status: z.enum(["draft", "scheduled", "published", "failed"]),
	scheduledAt: z.string().optional(),
	publishedAt: z.string().optional(),
	mediaIds: z.array(z.string()).optional(),
	coverImageId: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

// Type exports
export type Post = z.infer<typeof PostSchema>;
export type CreatePostInput = z.infer<typeof CreatePostInputSchema>;
export type PostResponse = z.infer<typeof PostResponseSchema>;
