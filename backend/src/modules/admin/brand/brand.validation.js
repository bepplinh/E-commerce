import { z } from "zod";

export const createBrandSchema = z.object({
    name: z.string().trim().min(1, "Tên brand không được rỗng").max(255, "Tên brand quá dài"),
    slug: z.string().trim().min(1, "Slug không được rỗng").max(255, "Slug quá dài").optional(),
    logoUrl: z.string().url("Logo URL không hợp lệ").optional().nullable(),
});

export const updateBrandSchema = z.object({
    name: z.string().trim().min(1, "Tên brand không được rỗng").max(255, "Tên brand quá dài").optional(),
    slug: z.string().trim().min(1, "Slug không được rỗng").max(255, "Slug quá dài").optional(),
    logoUrl: z.string().url("Logo URL không hợp lệ").optional().nullable(),
});
