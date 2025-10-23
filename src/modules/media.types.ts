import { z } from "zod";

// Media types
export type MediaType = "image" | "video" | "audio";

// Media schema
export const MediaSchema = z.object({
	id: z.string(),
	type: z.enum(["image", "video", "audio"]),
	fileName: z.string(),
	fileSize: z.number(),
	mimeType: z.string(),
	url: z.string(),
	thumbnailUrl: z.string().optional(),
	metadata: z.record(z.any()).optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

// Create media input schema
export const CreateMediaInputSchema = z.object({
	file: z.instanceof(File),
	type: z.enum(["image", "video", "audio"]),
	generateThumbnail: z.boolean().default(false),
});

// Media response schema
export const MediaResponseSchema = z.object({
	id: z.string(),
	type: z.enum(["image", "video", "audio"]),
	fileName: z.string(),
	fileSize: z.number(),
	mimeType: z.string(),
	url: z.string(),
	thumbnailUrl: z.string().optional(),
	metadata: z.record(z.any()).optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

// Type exports
export type Media = z.infer<typeof MediaSchema>;
export type CreateMediaInput = z.infer<typeof CreateMediaInputSchema>;
export type MediaResponse = z.infer<typeof MediaResponseSchema>;