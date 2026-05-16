import { z } from "zod";

export const createReviewSchema = z.object({
    productId: z.number().int(),
    orderItemId: z.number().int().optional(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional(),
    images: z.array(z.string().url()).optional(),
});

export const updateReviewSchema = z.object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().optional(),
    images: z.array(z.string().url()).optional(),
});
