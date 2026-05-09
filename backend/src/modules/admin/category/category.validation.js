import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().trim().min(1, "Tên category không được rỗng").max(255, "Tên category quá dài"),
    slug: z.string().trim().min(1, "Slug không được rỗng").max(255, "Slug quá dài").optional(),
    parentId: z.number().int().positive("parentId không hợp lệ").optional().nullable(),
    imageUrl: z.string().url("Image URL không hợp lệ").optional().nullable(),
    description: z.string().optional().nullable(),
});

export const updateCategorySchema = z.object({
    name: z.string().trim().min(1, "Tên category không được rỗng").max(255, "Tên category quá dài").optional(),
    slug: z.string().trim().min(1, "Slug không được rỗng").max(255, "Slug quá dài").optional(),
    parentId: z.number().int().positive("parentId không hợp lệ").optional().nullable(),
    imageUrl: z.string().url("Image URL không hợp lệ").optional().nullable(),
    description: z.string().optional().nullable(),
});
