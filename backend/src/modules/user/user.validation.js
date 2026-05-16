import { z } from "zod";

export const updateProfileSchema = z.object({
    username: z.string().min(3).max(50).optional(),
    fullName: z.string().min(1).optional(),
    phone: z.string().min(10).optional(),
    avatarUrl: z.string().url().optional(),
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
});
