import { z } from "zod";

export const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(12),
  offset: z.coerce.number().int().min(0).default(0),
});

export const searchSchema = z.object({
  q: z.string().min(1).max(120),
  limit: z.coerce.number().int().min(1).max(30).default(12),
});

export const profileUpdateSchema = z.object({
  name: z.string().min(1).max(80).optional(),
  image: z.string().url().optional().or(z.literal("")),
});

export const createCommentSchema = z.object({
  body: z.string().trim().min(1).max(1000),
});

export const analyticsViewSchema = z.object({
  videoId: z.string().uuid().optional(),
  collectionId: z.string().uuid().optional(),
});

export const adminVideoSchema = z.object({
  youtubeId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().default(""),
  thumbnailUrl: z.string().url().optional(),
  collectionId: z.string().uuid().optional(),
  publishedAt: z.coerce.date().optional(),
});

export const adminCollectionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  description: z.string().default(""),
  thumbnail: z.string().url().optional(),
});
